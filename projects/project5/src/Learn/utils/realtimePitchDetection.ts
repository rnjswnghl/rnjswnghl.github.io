import { extractPitchFromFile, normalizePitch as normalizePitchHz, extractEnergyFromFile } from './realtimePitchExtractor';

type RealtimePitchResult = {
  pitches: number[];
  currentSyllableIndex: number;
};

export async function detectRealtimePitch(
  recorderUri: string | null | undefined,
  elapsedSeconds: number,
  syllables: string[],
  expectedDurations: number[]
): Promise<RealtimePitchResult | null> {
  if (!recorderUri || syllables.length === 0) {
    return null;
  }

  

  try {
    
    let currentSyllableIndex = -1;
    const ENERGY_THRESHOLD = 0.03; 
    const ENERGY_WINDOW = 0.3; 
    const LOOK_BACK_TIME = 0.5; 
    
    
    const analysisStart = Math.max(0, elapsedSeconds - LOOK_BACK_TIME);
    const analysisDuration = Math.min(ENERGY_WINDOW, elapsedSeconds - analysisStart);
    
    if (analysisDuration > 0.05) {
      try {
        const recentEnergy = await extractEnergyFromFile(recorderUri, analysisStart, analysisDuration);
        
        if (recentEnergy !== null && recentEnergy > ENERGY_THRESHOLD) {
          
          let accumulatedTime = 0;
          let bestMatchIndex = -1;
          let bestMatchScore = 0;
          
          for (let i = 0; i < syllables.length; i++) {
            const syllableStart = accumulatedTime;
            const syllableEnd = accumulatedTime + expectedDurations[i];
            const syllableCenter = syllableStart + expectedDurations[i] / 2;
            
            
            if (elapsedSeconds >= syllableStart && elapsedSeconds <= syllableEnd) {
              
              const timeScore = 1.0;
              const totalScore = recentEnergy * timeScore;
              
              if (totalScore > bestMatchScore) {
                bestMatchScore = totalScore;
                bestMatchIndex = i;
              }
            } else if (elapsedSeconds >= syllableStart - 0.1 && elapsedSeconds <= syllableEnd + 0.1) {
              
              const timeDiff = Math.abs(elapsedSeconds - syllableCenter);
              const timeScore = Math.max(0, 1 - timeDiff / 0.2);
              const totalScore = recentEnergy * timeScore;
              
              if (totalScore > bestMatchScore) {
                bestMatchScore = totalScore;
                bestMatchIndex = i;
              }
            }
            
            accumulatedTime = syllableEnd;
          }
          
          if (bestMatchIndex >= 0) {
            currentSyllableIndex = bestMatchIndex;
          }
        }
      } catch (err) {
        
      }
    }
    
    
    if (currentSyllableIndex === -1) {
      let accumulatedTime = 0;
      for (let i = 0; i < syllables.length; i++) {
        if (elapsedSeconds >= accumulatedTime && elapsedSeconds < accumulatedTime + expectedDurations[i]) {
          currentSyllableIndex = i;
          break;
        }
        accumulatedTime += expectedDurations[i];
      }
      
      if (currentSyllableIndex === -1 && elapsedSeconds >= accumulatedTime) {
        currentSyllableIndex = syllables.length - 1;
      }
    }

    
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      const webResult = await analyzeRealtimeWithWebAudio(recorderUri, elapsedSeconds, syllables, expectedDurations);
      if (webResult) {
        return webResult;
      }
    } else {
    }
    
    
    
    return await analyzeRealtimeFromFile(recorderUri, elapsedSeconds, syllables, expectedDurations, currentSyllableIndex);
  } catch (err) {
    return null;
  }
}

async function analyzeRealtimeWithWebAudio(
  uri: string,
  elapsedSeconds: number,
  syllables: string[],
  expectedDurations: number[]
): Promise<RealtimePitchResult | null> {
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
    const totalSamples = channelData.length;
    const totalDuration = totalSamples / sampleRate;
    const currentSample = Math.floor((elapsedSeconds / totalDuration) * totalSamples);
    
    
    const analysisWindowSize = Math.floor(sampleRate * 0.3); 
    const startSample = Math.max(0, currentSample - analysisWindowSize);
    const endSample = Math.min(totalSamples, currentSample);
    const analysisSegment = channelData.slice(startSample, endSample);

    if (analysisSegment.length < 300) { 
      return null;
    }

    
    const maxLag = Math.min(
      Math.floor(sampleRate / 70), 
      Math.floor(analysisSegment.length / 2)
    );
    const autocorr = calculateAutocorrelation(analysisSegment, maxLag);
    const pitch = estimatePitchFromAutocorrelation(autocorr, sampleRate);
    
    
    let rms = 0;
    for (let i = 0; i < analysisSegment.length; i++) {
      rms += analysisSegment[i] * analysisSegment[i];
    }
    rms = Math.sqrt(rms / analysisSegment.length);
    
    
    let confidence = Math.min(1, Math.max(0, (rms - 0.01) * 20)); 
    
    
    
    if (pitch > 0) {
      const pitchLag = Math.round(sampleRate / pitch);
      if (pitchLag > 0 && pitchLag < autocorr.length) {
        
        const peakStrength = autocorr[pitchLag];
        
        confidence = Math.min(1, confidence * (1 + peakStrength * 0.5));
      }
    }
    
    
    let normalizedPitch = 0.5; 
    if (pitch > 0 && pitch >= 70 && pitch <= 450 && confidence > 0.2) { 
      normalizedPitch = normalizePitchHz(pitch, 80, 400);
      
      normalizedPitch = 0.5 + (normalizedPitch - 0.5) * Math.max(0.4, confidence); 
    } else {
    }

    let accumulatedTime = 0;
    const pitches: number[] = [];
    let currentSyllableIndex = -1;

    for (let i = 0; i < syllables.length; i++) {
      const syllableStart = accumulatedTime;
      const syllableEnd = accumulatedTime + expectedDurations[i];

      if (elapsedSeconds >= syllableStart && elapsedSeconds < syllableEnd) {
        currentSyllableIndex = i;
        pitches.push(normalizedPitch);
      } else if (elapsedSeconds >= syllableEnd) {
        
        pitches.push(normalizedPitch);
      } else {
        
        pitches.push(0.5);
      }

      accumulatedTime += expectedDurations[i];
    }

    return {
      pitches,
      currentSyllableIndex: currentSyllableIndex >= 0 ? currentSyllableIndex : 0,
    };
  } catch (err) {
    return null;
  }
}

async function analyzeRealtimeFromFile(
  uri: string,
  elapsedSeconds: number,
  syllables: string[],
  expectedDurations: number[],
  currentSyllableIndex: number
): Promise<RealtimePitchResult | null> {
  try {
    
    const analysisWindow = 0.3; 
    let pitchHz = await extractPitchFromFile(uri, Math.max(0, elapsedSeconds - analysisWindow), analysisWindow);
    
    
    if (pitchHz === null || pitchHz <= 0) {
      const retryWindow = 0.25; 
      pitchHz = await extractPitchFromFile(uri, Math.max(0, elapsedSeconds - retryWindow - 0.05), retryWindow);
    }
    
    
    if (pitchHz === null || pitchHz <= 0) {
      const retryWindow2 = 0.2;
      pitchHz = await extractPitchFromFile(uri, Math.max(0, elapsedSeconds - retryWindow2), retryWindow2);
    }
    
    let normalizedPitch = 0.5; 
    if (pitchHz !== null && pitchHz > 0 && pitchHz >= 70 && pitchHz <= 450) { 
      normalizedPitch = normalizePitchHz(pitchHz, 80, 400);
    } else {
    }
    
    let accumulatedTime = 0;
    const pitches: number[] = [];

    for (let i = 0; i < syllables.length; i++) {
      const syllableStart = accumulatedTime;
      const syllableEnd = accumulatedTime + expectedDurations[i];

      if (elapsedSeconds >= syllableStart && elapsedSeconds < syllableEnd) {
        
        pitches.push(normalizedPitch);
      } else if (elapsedSeconds >= syllableEnd) {
        
        pitches.push(normalizedPitch);
      } else {
        
        pitches.push(0.5);
      }

      accumulatedTime += expectedDurations[i];
    }

    return {
      pitches,
      currentSyllableIndex: currentSyllableIndex >= 0 ? currentSyllableIndex : 0,
    };
  } catch (err) {
    return null;
  }
}

function calculateAutocorrelation(samples: Float32Array, maxLag: number): number[] {
  const autocorr: number[] = [];
  const n = samples.length;
  maxLag = Math.min(maxLag, Math.floor(n / 2));

  
  let mean = 0;
  for (let i = 0; i < n; i++) {
    mean += samples[i];
  }
  mean /= n;
  
  const centeredSamples = new Float32Array(n);
  let variance = 0;
  for (let i = 0; i < n; i++) {
    centeredSamples[i] = samples[i] - mean;
    variance += centeredSamples[i] * centeredSamples[i];
  }
  variance /= n;
  const stdDev = Math.sqrt(variance);

  
  const normalized = stdDev > 1e-10;
  if (normalized) {
    for (let i = 0; i < n; i++) {
      centeredSamples[i] /= stdDev;
    }
  }

  
  for (let lag = 0; lag < maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i < n - lag; i++) {
      sum += centeredSamples[i] * centeredSamples[i + lag];
    }
    
    const normalization = n - lag;
    autocorr.push(sum / normalization);
  }

  return autocorr;
}

function estimatePitchFromAutocorrelation(
  autocorr: number[],
  sampleRate: number
): number {
  if (autocorr.length < 2) return 0;

  const minLag = Math.floor(sampleRate / 450); 
  const maxLag = Math.floor(sampleRate / 70); 

  
  const peaks: { lag: number; value: number; prominence: number }[] = [];
  
  
  
  for (let i = Math.max(1, minLag); i < Math.min(maxLag, autocorr.length - 1); i++) {
    
    if (autocorr[i] > autocorr[i - 1] && autocorr[i] > autocorr[i + 1]) {
      
      let leftMin = autocorr[i];
      let rightMin = autocorr[i];
      
      
      for (let j = Math.max(0, i - 5); j < i; j++) {
        if (autocorr[j] < leftMin) leftMin = autocorr[j];
      }
      
      
      for (let j = i + 1; j < Math.min(autocorr.length, i + 6); j++) {
        if (autocorr[j] < rightMin) rightMin = autocorr[j];
      }
      
      const prominence = autocorr[i] - Math.max(leftMin, rightMin);
      
      
      if (prominence > 0.1) {
        peaks.push({ lag: i, value: autocorr[i], prominence });
      }
    }
  }

  if (peaks.length === 0) return 0;

  
  let bestPeak = peaks[0];
  for (const peak of peaks) {
    if (peak.prominence > bestPeak.prominence) {
      bestPeak = peak;
    }
  }

  
  const lag = bestPeak.lag;
  let refinedLag = lag;
  
  if (lag > 0 && lag < autocorr.length - 1) {
    
    const a = autocorr[lag - 1];
    const b = autocorr[lag];
    const c = autocorr[lag + 1];
    
    
    const denominator = 2 * (a - 2 * b + c);
    if (Math.abs(denominator) > 1e-10) {
      const offset = (a - c) / denominator;
      refinedLag = lag - offset;
    }
  }

  if (refinedLag <= 0) return 0;
  
  const frequency = sampleRate / refinedLag;
  
  
  if (frequency >= 70 && frequency <= 450) {
    return frequency;
  }
  
  return 0;
}
