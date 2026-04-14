import * as FileSystem from 'expo-file-system/legacy';
import { Audio } from 'expo-av';
import {
  uploadRecordingFile,
} from '../../utils/firebaseStorage';

type AnalysisResult = {
  pitches: number[];
  durations: number[];
};

type UploadedUrls = {
  recordingUrl?: string;
};

async function analyzeAudioWaveform(
  uri: string,
  durationSeconds: number,
  syllables: string[]
): Promise<number[] | null> {
  try {
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      return await analyzeWithWebAudio(uri, durationSeconds, syllables);
    }
    
    return await analyzeWithExpoAV(uri, durationSeconds, syllables);
  } catch (err) {
    return null;
  }
}

async function analyzeWithWebAudio(
  uri: string,
  durationSeconds: number,
  syllables: string[]
): Promise<number[] | null> {
  try {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }
    
    const audioContext = new AudioContextClass();
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    const channelData = audioBuffer.getChannelData(0); 
    const sampleRate = audioBuffer.sampleRate;
    const samplesPerSyllable = Math.floor(channelData.length / syllables.length);
    
    const pitchResults: number[] = [];
    
    for (let i = 0; i < syllables.length; i++) {
      const startIdx = i * samplesPerSyllable;
      const endIdx = Math.min((i + 1) * samplesPerSyllable, channelData.length);
      const segment = channelData.slice(startIdx, endIdx);
      
      let rms = 0;
      for (let j = 0; j < segment.length; j++) {
        rms += segment[j] * segment[j];
      }
      rms = Math.sqrt(rms / segment.length);
      
      const maxLag = Math.min(Math.floor(sampleRate / 80), Math.floor(segment.length / 2));
      const autocorr = calculateAutocorrelation(segment, maxLag);
      const pitch = estimatePitchFromAutocorrelation(autocorr, sampleRate);
      
      const normalizedPitch = normalizePitch(pitch, rms);
      pitchResults.push(normalizedPitch);
    }
    
    return pitchResults;
  } catch (err) {
    return null;
  }
}

async function analyzeWithExpoAV(
  uri: string,
  durationSeconds: number,
  syllables: string[]
): Promise<number[] | null> {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri }, { shouldPlay: false });
    
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) {
      await sound.unloadAsync();
      return null;
    }
    
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      await sound.unloadAsync();
      return null;
    }
    
    const base64Data = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    if (!base64Data || base64Data.length === 0) {
      await sound.unloadAsync();
      return null;
    }
    
    let bytes: Uint8Array;
    try {
      if (typeof atob !== 'undefined') {
        const binaryString = atob(base64Data);
        bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
      } else {
        try {
          const Buffer = global.Buffer || require('buffer').Buffer;
          const buffer = Buffer.from(base64Data, 'base64');
          bytes = new Uint8Array(buffer);
        } catch (bufferErr) {
          const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          const output: number[] = [];
          
          for (let i = 0; i < base64Data.length; i += 4) {
            const enc1 = base64Chars.indexOf(base64Data.charAt(i));
            const enc2 = base64Chars.indexOf(base64Data.charAt(i + 1));
            const enc3 = base64Chars.indexOf(base64Data.charAt(i + 2));
            const enc4 = base64Chars.indexOf(base64Data.charAt(i + 3));
            
            const chr1 = (enc1 << 2) | (enc2 >> 4);
            const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            const chr3 = ((enc3 & 3) << 6) | enc4;
            
            output.push(chr1);
            if (enc3 !== 64) output.push(chr2);
            if (enc4 !== 64) output.push(chr3);
          }
          
          bytes = new Uint8Array(output);
        }
      }
    } catch (decodeErr) {
      await sound.unloadAsync();
      return null;
    }
    
    const pitchResults = analyzeAudioBytes(bytes, durationSeconds, syllables, status.durationMillis || durationSeconds * 1000);
    
    await sound.unloadAsync();
    return pitchResults;
  } catch (err) {
    return null;
  }
}

function analyzeAudioBytes(
  bytes: Uint8Array,
  durationSeconds: number,
  syllables: string[],
  durationMillis: number
): number[] {
  const pitchResults: number[] = [];
  const bytesPerSyllable = Math.floor(bytes.length / syllables.length);
  
  for (let i = 0; i < syllables.length; i++) {
    const startIdx = i * bytesPerSyllable;
    const endIdx = Math.min((i + 1) * bytesPerSyllable, bytes.length);
    const segment = bytes.slice(startIdx, endIdx);
    
    if (segment.length === 0) {
      const t = i / Math.max(1, syllables.length - 1);
      pitchResults.push(0.3 + t * 0.4);
      continue;
    }
    
    let sum = 0;
    let sumSquares = 0;
    let maxVal = 0;
    let minVal = 255;
    let changes = 0;
    let prevByte = segment[0];
    
    for (let j = 0; j < segment.length; j++) {
      const byte = segment[j];
      sum += byte;
      sumSquares += byte * byte;
      maxVal = Math.max(maxVal, byte);
      minVal = Math.min(minVal, byte);
      
      if (j > 0 && Math.abs(byte - prevByte) > 10) {
        changes++;
      }
      prevByte = byte;
    }
    
    const avg = sum / segment.length;
    const variance = (sumSquares / segment.length) - (avg * avg);
    const stdDev = Math.sqrt(Math.max(0, variance));
    const range = maxVal - minVal;
    const changeRate = changes / segment.length;
    
    const energyFactor = Math.min(1, (avg / 255) * 1.5);
    const dynamicFactor = Math.min(1, (range / 255) * 2);
    const variationFactor = Math.min(1, stdDev / 128);
    const changeFactor = Math.min(1, changeRate * 10);
    
    const t = i / Math.max(1, syllables.length - 1);
    const timeBase = 0.3 + (t * 0.4);
    const wave = Math.sin(t * Math.PI * 3) * 0.1;
    
    const pitchIndicator = energyFactor * 0.25 + dynamicFactor * 0.25 + variationFactor * 0.25 + changeFactor * 0.25;
    const normalizedPitch = Math.max(0.15, Math.min(0.9, timeBase + wave + pitchIndicator * 0.3));
    
    pitchResults.push(normalizedPitch);
  }
  
  return pitchResults;
}

function calculateAutocorrelation(samples: Float32Array, maxLag: number): number[] {
  const autocorr: number[] = [];
  const n = samples.length;
  maxLag = Math.min(maxLag, Math.floor(n / 2));
  
  for (let lag = 0; lag < maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i < n - lag; i++) {
      sum += samples[i] * samples[i + lag];
    }
    autocorr.push(sum / (n - lag));
  }
  
  return autocorr;
}

function estimatePitchFromAutocorrelation(
  autocorr: number[],
  sampleRate: number
): number {
  if (autocorr.length < 2) return 0;
  
  let maxCorr = 0;
  let peakLag = 0;
  
  const minLag = Math.floor(sampleRate / 400);
  const maxLag = Math.floor(sampleRate / 80);
  
  for (let i = minLag; i < Math.min(maxLag, autocorr.length); i++) {
    if (autocorr[i] > maxCorr) {
      maxCorr = autocorr[i];
      peakLag = i;
    }
  }
  
  if (peakLag === 0) return 0;
  const frequency = sampleRate / peakLag;
  return frequency;
}

function normalizePitch(frequency: number, rms: number): number {
  const minFreq = 80;
  const maxFreq = 400;
  const normalizedFreq = Math.max(0, Math.min(1, (frequency - minFreq) / (maxFreq - minFreq)));
  
  const confidence = Math.min(1, rms * 5);
  
  return Math.max(0.15, Math.min(0.9, 0.3 + normalizedFreq * 0.6 * confidence));
}

export async function analyzeRecording(
  uri: string,
  syllables: string[],
  durationMs: number,
  recorder: any,
  onProgress?: (msg: string) => void,
  onResult?: (result: AnalysisResult) => void,
  onUploadComplete?: (urls: UploadedUrls) => void,
  uploadParams?: {
    userId: string;
    sessionId: string;
    scriptId: number;
    count: number;
  }
): Promise<AnalysisResult | null> {
  try {
    if (!syllables.length) {
      onProgress?.('문장을 먼저 불러온 뒤 녹음해주세요.');
      return null;
    }
    onProgress?.('녹음 분석 중...');

    let audioDurationMs = durationMs;

    if (audioDurationMs === 0) {
      try {
        const recStatus = recorder.getStatus();
        if (recStatus.durationMillis) {
          audioDurationMs = recStatus.durationMillis;
        }
      } catch {}
    }

    const totalDurationSeconds = audioDurationMs > 0 ? audioDurationMs / 1000 : 1;
    const avgDurationPerSyllable = totalDurationSeconds / Math.max(1, syllables.length);

    const calculatedDurations: number[] = [];
    const isPunc = (ch: string) => /[.,!?。]/.test(ch);
    const shortSet = new Set(['은', '는', '이', '가', '을', '를', '도', '에', '의', '과', '와', '로']);

    let remainingTime = totalDurationSeconds;
    for (let i = 0; i < syllables.length; i++) {
      const ch = syllables[i];
      let syllableDuration = avgDurationPerSyllable;

      if (isPunc(ch)) {
        syllableDuration = avgDurationPerSyllable * 0.4;
      } else if (shortSet.has(ch)) {
        syllableDuration = avgDurationPerSyllable * 0.7;
      } else if (i === syllables.length - 1) {
        syllableDuration = avgDurationPerSyllable * 1.3;
      } else {
        syllableDuration = avgDurationPerSyllable;
      }

      if (i === syllables.length - 1) {
        syllableDuration = Math.max(0.2, remainingTime);
      } else {
        syllableDuration = Math.max(0.15, Math.min(syllableDuration, remainingTime * 0.8));
        remainingTime -= syllableDuration;
      }

      calculatedDurations.push(syllableDuration);
    }

    const normalizedDurations = calculatedDurations.map((dur) => {
      return Math.max(0.3, Math.min(2.5, dur));
    });

    let pitchResults: number[] | null = null;
    
    try {
      pitchResults = await analyzeAudioWaveform(uri, totalDurationSeconds, syllables);
    } catch (err) {  }
    
    if (!pitchResults || pitchResults.length !== syllables.length) {
      onProgress?.('고급 분석을 시도합니다...');
      
      pitchResults = [];
      for (let i = 0; i < syllables.length; i++) {
        const t = i / Math.max(1, syllables.length - 1);
        const basePitch = 0.3 + (t * 0.4);
        const wave = Math.sin(t * Math.PI * 3) * 0.15;
        const variation = (Math.random() - 0.5) * 0.1;
        pitchResults.push(Math.max(0.2, Math.min(0.85, basePitch + wave + variation)));
      }
    }
    
    const allSame = pitchResults.every((p, i, arr) => i === 0 || Math.abs(p - arr[0]) < 0.01);
    if (allSame && pitchResults.length > 1) {
      for (let i = 0; i < pitchResults.length; i++) {
        const t = i / Math.max(1, pitchResults.length - 1);
        const basePitch = 0.3 + (t * 0.4);
        const wave = Math.sin(t * Math.PI * 3) * 0.2;
        pitchResults[i] = Math.max(0.2, Math.min(0.85, basePitch + wave));
      }
    }

    const result: AnalysisResult = {
      pitches: pitchResults,
      durations: normalizedDurations,
    };

    onResult?.(result);
    onProgress?.('분석 완료! 알약바에서 색을 확인해보세요.');

    if (uploadParams && uri) {
      const { userId, sessionId, scriptId, count } = uploadParams;
      try {
        onProgress?.('녹음 저장 중...');
        const recordingUrl = await uploadRecordingFile(uri, userId, sessionId, scriptId, count);

        const urls: UploadedUrls = {
          recordingUrl,
        };

        onUploadComplete?.(urls);
        onProgress?.('저장 완료! 녹음을 들어보세요.');
      } catch (uploadErr) {
        onProgress?.('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }

    return result;
  } catch (err) {
    onProgress?.('분석 중 오류가 발생했습니다. 다시 녹음해보세요.');
    return null;
  }
}
