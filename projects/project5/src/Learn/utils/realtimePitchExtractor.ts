import PitchFinder from 'pitchfinder';

const detectPitch = PitchFinder.YIN({
  sampleRate: 44100, 
  threshold: 0.03,    
});

export function extractPitchFromBuffer(
  audioBuffer: Float32Array,
  sampleRate: number = 44100
): number | null {
  try {
    
    const pitch = detectPitch(audioBuffer);
    
    
    
    if (pitch !== null && pitch > 0 && pitch >= 70 && pitch <= 450) {
      return pitch;
    }
    
    
    return null;
  } catch (error) {
    return null;
  }
}

export function normalizePitch(
  pitchHz: number | null,
  minHz: number = 80,
  maxHz: number = 400
): number {
  if (pitchHz === null || pitchHz <= 0) {
    return 0.5; 
  }
  
  
  const normalized = (pitchHz - minHz) / (maxHz - minHz);
  
  
  return Math.max(0, Math.min(1, normalized));
}

export function calculateAudioEnergy(samples: Float32Array): number {
  if (samples.length === 0) {
    return 0;
  }
  
  
  let sumSquares = 0;
  for (let i = 0; i < samples.length; i++) {
    sumSquares += samples[i] * samples[i];
  }
  const rms = Math.sqrt(sumSquares / samples.length);
  
  
  return Math.min(1, rms * 2); 
}

export async function extractEnergyFromFile(
  audioFileUri: string,
  startTime: number = 0,
  duration: number = 0.2
): Promise<number | null> {
  try {
    
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass({ sampleRate: 44100 });

        
        const response = await fetch(audioFileUri);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        
        const sampleRate = audioBuffer.sampleRate;
        const startSample = Math.floor(startTime * sampleRate);
        const endSample = Math.min(
          audioBuffer.length,
          Math.floor((startTime + duration) * sampleRate)
        );

        if (endSample <= startSample || endSample - startSample < 100) {
          return null;
        }

        const channelData = audioBuffer.getChannelData(0);
        const segment = channelData.slice(startSample, endSample);

        
        return calculateAudioEnergy(segment);
      } catch (webError) {
        
      }
    }

    
    try {
      const response = await fetch(audioFileUri);
      const arrayBuffer = await response.arrayBuffer();
      
      
      const parsed = parseWavFile(arrayBuffer);
      if (!parsed) {
        return null;
      }
      
      const { samples, sampleRate } = parsed;
      
      
      const startSample = Math.floor(startTime * sampleRate);
      const endSample = Math.min(
        samples.length,
        Math.floor((startTime + duration) * sampleRate)
      );
      
      if (endSample <= startSample || endSample - startSample < 100) {
        return null;
      }
      
      const segment = samples.slice(startSample, endSample);
      
      
      return calculateAudioEnergy(segment);
    } catch (fetchError) {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export function parseWavFile(arrayBuffer: ArrayBuffer): { samples: Float32Array; sampleRate: number } | null {
  try {
    
    const view = new DataView(arrayBuffer);
    
    
    const riffHeader = view.getUint32(0, true);
    if (riffHeader !== 0x46464952) { 
      
      return null;
    }
    
    
    const waveHeader = view.getUint32(8, true);
    if (waveHeader !== 0x45564157) { 
      return null;
    }
    
    let offset = 12;
    let sampleRate = 44100;
    let channels = 1;
    let bitsPerSample = 16;
    let dataOffset = 0;
    let dataLength = 0;
    
    
    while (offset < arrayBuffer.byteLength - 8) {
      const chunkId = view.getUint32(offset, true);
      const chunkSize = view.getUint32(offset + 4, true);
      
      if (chunkId === 0x20746d66) { 
        sampleRate = view.getUint32(offset + 12, true);
        channels = view.getUint16(offset + 10, true);
        bitsPerSample = view.getUint16(offset + 22, true);
      } else if (chunkId === 0x61746164) { 
        dataOffset = offset + 8;
        dataLength = chunkSize;
        break;
      }
      
      offset += 8 + chunkSize;
    }
    
    if (dataOffset === 0 || dataLength === 0) {
      return null;
    }
    
    
    
    const samples = new Float32Array(dataLength / (bitsPerSample / 8) / channels);
    const dataView = new DataView(arrayBuffer, dataOffset, dataLength);
    
    if (bitsPerSample === 16) {
      for (let i = 0; i < samples.length; i++) {
        const sample = dataView.getInt16(i * channels * 2, true);
        samples[i] = sample / 32768.0; 
      }
    } else if (bitsPerSample === 32) {
      for (let i = 0; i < samples.length; i++) {
        const sample = dataView.getInt32(i * channels * 4, true);
        samples[i] = sample / 2147483648.0; 
      }
    } else {
      return null; 
    }
    
    return { samples, sampleRate };
  } catch (error) {
    return null;
  }
}

export async function extractPitchFromFile(
  audioFileUri: string,
  startTime: number = 0,
  duration: number = 0.1
): Promise<number | null> {
  try {
    
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass({ sampleRate: 44100 });

        
        const response = await fetch(audioFileUri);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        
        const sampleRate = audioBuffer.sampleRate;
        const startSample = Math.floor(startTime * sampleRate);
        const endSample = Math.min(
          audioBuffer.length,
          Math.floor((startTime + duration) * sampleRate)
        );

        if (endSample <= startSample) {
          return null;
        }

        
        const channelData = audioBuffer.getChannelData(0);
        const segment = channelData.slice(startSample, endSample);

        if (segment.length < 300) { 
          return null; 
        }

        
        return extractPitchFromBuffer(segment, sampleRate);
      } catch (webError) {
        
      }
    }

    
    try {
      const response = await fetch(audioFileUri);
      const arrayBuffer = await response.arrayBuffer();
      
      
      const parsed = parseWavFile(arrayBuffer);
      if (!parsed) {
        return null;
      }
      
      const { samples, sampleRate } = parsed;
      
      
      const startSample = Math.floor(startTime * sampleRate);
      const endSample = Math.min(
        samples.length,
        Math.floor((startTime + duration) * sampleRate)
      );
      
      if (endSample <= startSample || endSample - startSample < 300) { 
        return null;
      }
      
      const segment = samples.slice(startSample, endSample);
      
      
      return extractPitchFromBuffer(segment, sampleRate);
    } catch (fetchError) {
      return null;
    }
  } catch (error) {
    return null;
  }
}
