import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 40; 
const CHART_HEIGHT = 200;
const BAR_HEIGHT = 10; 
const BAR_WIDTH = 50; 
const CONTAINER_PADDING = 10; 
const LEFT_PADDING = 20; 
const RIGHT_PADDING = 20; 
const SCROLL_SPEED = 400; 
const UPDATE_INTERVAL = 50; 

type RealtimePitchChartProps = {
  
  syllables: string[];
  
  basePitches: number[];
  
  baseDurations: number[];
  
  userPitches: (number | null)[];
  
  userDurations?: (number | null)[];
  
  currentPitch?: number | null;
  
  currentSyllableIndex?: number | null;
  
  width?: number;
  
  height?: number;
  
  isRecording?: boolean;
  
  isReferencePlaying?: boolean;
  
  playbackCurrentTime?: number | null;
  
  totalAudioDuration?: number | null;
};

function getPitchColor(normalizedPitch: number): string {
  
  const pitch = Math.max(0, Math.min(1, normalizedPitch));
  
  
  
  
  
  
  let r, g, b;
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  
  if (pitch < 0.2) {
    const t = pitch / 0.2;
    r = Math.round(59 + t * (6 - 59));
    g = Math.round(130 + t * (182 - 130));
    b = Math.round(246 + t * (212 - 246));
  } else if (pitch < 0.4) {
    const t = (pitch - 0.2) / 0.2;
    r = Math.round(6 + t * (16 - 6));
    g = Math.round(182 + t * (185 - 182));
    b = Math.round(212 + t * (129 - 212));
  } else if (pitch < 0.6) {
    const t = (pitch - 0.4) / 0.2;
    r = Math.round(16 + t * (251 - 16));
    g = Math.round(185 + t * (191 - 185));
    b = Math.round(129 + t * (36 - 129));
  } else if (pitch < 0.8) {
    const t = (pitch - 0.6) / 0.2;
    r = Math.round(251 + t * (249 - 251));
    g = Math.round(191 + t * (115 - 191));
    b = Math.round(36 + t * (22 - 36));
  } else {
    const t = (pitch - 0.8) / 0.2;
    r = Math.round(249 + t * (239 - 249));
    g = Math.round(115 + t * (68 - 115));
    b = Math.round(22 + t * (68 - 22));
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

type RealtimeBar = {
  id: number;
  x: number; 
  pitch: number; 
  basePitch: number; 
  timestamp: number; 
  hasPassedReferenceLine?: boolean; 
  isActive?: boolean; 
  source?: 'tts' | 'user'; 
  syllableIndex?: number; 
};

export default function RealtimePitchChart({
  syllables,
  basePitches,
  baseDurations,
  userPitches,
  userDurations,
  currentPitch,
  currentSyllableIndex = null,
  width = CHART_WIDTH,
  height = CHART_HEIGHT,
  isRecording = false,
  isReferencePlaying = false,
  playbackCurrentTime = null,
  totalAudioDuration = null,
}: RealtimePitchChartProps) {
  
  const isPunctuation = (ch: string) => /[.,!?。]/g.test(ch);
  const filteredSyllables = useMemo(() => {
    return syllables.filter((syllable) => !isPunctuation(syllable));
  }, [syllables]);
  
  
  const syllableIndexMap = useMemo(() => {
    const map: number[] = [];
    let filteredIndex = 0;
    for (let i = 0; i < syllables.length; i++) {
      if (!isPunctuation(syllables[i])) {
        map.push(i);
        filteredIndex++;
      }
    }
    return map;
  }, [syllables]);
  
  
  const filteredBasePitches = useMemo(() => {
    if (!basePitches || basePitches.length === 0) return [];
    return syllableIndexMap.map((originalIndex) => basePitches[originalIndex] ?? 0.5);
  }, [basePitches, syllableIndexMap]);
  
  const filteredBaseDurations = useMemo(() => {
    if (!baseDurations || baseDurations.length === 0) return [];
    return syllableIndexMap.map((originalIndex) => baseDurations[originalIndex] ?? 1);
  }, [baseDurations, syllableIndexMap]);
  
  const filteredUserPitches = useMemo(() => {
    if (!userPitches || userPitches.length === 0) return [];
    return syllableIndexMap.map((originalIndex) => userPitches[originalIndex] ?? null);
  }, [userPitches, syllableIndexMap]);
  
  const filteredUserDurations = useMemo(() => {
    if (!userDurations || userDurations.length === 0) return [];
    return syllableIndexMap.map((originalIndex) => userDurations?.[originalIndex] ?? null);
  }, [userDurations, syllableIndexMap]);
  
  
  const availableWidth = width - LEFT_PADDING - RIGHT_PADDING;
  const startX = LEFT_PADDING; 
  const endX = width - RIGHT_PADDING; 
  const INITIAL_REFERENCE_LINE_X = width / 2; 
  const BAR_SPACING = BAR_WIDTH + 20; 

  
  const [bars, setBars] = useState<RealtimeBar[]>([]);
  const barIdCounter = useRef(0);
  const barsRef = useRef<RealtimeBar[]>([]); 
  
  const [referenceLineX, setReferenceLineX] = useState<number>(INITIAL_REFERENCE_LINE_X);
  
  const prevSyllablesKeyRef = useRef<string>('');
  const prevBasePitchesKeyRef = useRef<string>('');
  
  
  const mapPitchToY = useCallback((pitch: number): number => {
    const normalizedPitch = Math.max(0, Math.min(1, pitch));
    const bandRatio = 0.7; 
    const bandHeight = Math.max(1, Math.round(height * bandRatio));
    const top = Math.round((height - bandHeight) / 2);
    return top + Math.round((1 - normalizedPitch) * bandHeight); 
  }, [height]);

  
  
  useEffect(() => {
    const syllableCount = filteredSyllables.length;
    
    if (syllableCount === 0) {
      setBars([]);
      prevSyllablesKeyRef.current = '';
      prevBasePitchesKeyRef.current = '';
      return;
    }
    
    
    const syllablesKey = filteredSyllables.join('');
    
    const basePitchesKey = filteredBasePitches ? filteredBasePitches.join(',') : '';
    
    
    const hasChanged = prevSyllablesKeyRef.current !== syllablesKey || prevBasePitchesKeyRef.current !== basePitchesKey;
    
    
    
    setBars((prevBars) => {
      
      
      if (!hasChanged) {
        return prevBars;
      }
      
      
      const newBars: RealtimeBar[] = [];
      
      
      
      const firstBarX = endX - BAR_WIDTH; 
      
      for (let i = 0; i < syllableCount; i++) {
        
        const basePitch = (filteredBasePitches && filteredBasePitches[i] !== undefined) ? filteredBasePitches[i] : 0.5;
        
        
        let initialPitch = basePitch;
        if (filteredUserPitches && filteredUserPitches[i] !== null && filteredUserPitches[i] !== undefined) {
          initialPitch = filteredUserPitches[i]!;
        }
        
        
        
        const barX = firstBarX + (i * BAR_SPACING);
        
        newBars.push({
          id: i,
          x: barX, 
          pitch: initialPitch,
          basePitch: basePitch, 
          timestamp: Date.now(),
          isActive: true, 
          hasPassedReferenceLine: false, 
          source: 'tts', 
          syllableIndex: i, 
        });
      }
      
      
      prevSyllablesKeyRef.current = syllablesKey;
      prevBasePitchesKeyRef.current = basePitchesKey;
      
      return newBars;
    });
  }, [filteredSyllables, filteredBasePitches, filteredUserPitches, endX]); 

  
  useEffect(() => {
        if (filteredUserPitches && filteredUserPitches.length > 0) {
      const nonNullPitches = filteredUserPitches.filter(p => p !== null && p !== undefined);
      
    }
    
    setBars((prevBars) => {
      const updatedBars: RealtimeBar[] = [];
      const userBarsMap = new Map<number, RealtimeBar>(); 
      
      
      const ttsBars: RealtimeBar[] = [];
      for (const bar of prevBars) {
        if (bar.source === 'user') {
          if (bar.syllableIndex !== undefined) {
            userBarsMap.set(bar.syllableIndex, bar);
          }
        } else {
          ttsBars.push(bar);
        }
      }
      
      
      for (const bar of ttsBars) {
        const syllableIndex = bar.syllableIndex ?? bar.id;
        const currentBasePitch = (filteredBasePitches && filteredBasePitches[syllableIndex] !== undefined) 
          ? filteredBasePitches[syllableIndex] 
          : bar.basePitch;
        
        
        const updatedBar: RealtimeBar = {
          ...bar,
          pitch: currentBasePitch,
          basePitch: currentBasePitch,
          source: 'tts',
          syllableIndex: syllableIndex,
        };
        
        updatedBars.push(updatedBar);
        
                const hasUserPitch = filteredUserPitches && filteredUserPitches[syllableIndex] !== null && filteredUserPitches[syllableIndex] !== undefined;
        
        
        
        if (bar.hasPassedReferenceLine && hasUserPitch) {
          const userPitch = filteredUserPitches[syllableIndex]!;
          
                    
          
          const existingUserBar = userBarsMap.get(syllableIndex);
          if (existingUserBar) {
            
            updatedBars.push({
              ...existingUserBar,
              pitch: userPitch,
              x: bar.x, 
              hasPassedReferenceLine: true,
              isActive: true,
            });
          } else {
            
            const userBarId = 10000 + syllableIndex; 
            updatedBars.push({
              id: userBarId,
              x: bar.x, 
              pitch: userPitch,
              basePitch: currentBasePitch,
              timestamp: Date.now(),
              hasPassedReferenceLine: true,
              isActive: true,
              source: 'user',
              syllableIndex: syllableIndex,
            });
          }
        }
      }
      
      
      for (const [syllableIndex, userBar] of userBarsMap.entries()) {
        const ttsBar = ttsBars.find(b => (b.syllableIndex ?? b.id) === syllableIndex);
        if (ttsBar && ttsBar.hasPassedReferenceLine) {
          
          const userPitch = filteredUserPitches?.[syllableIndex];
          if (userPitch !== null && userPitch !== undefined) {
            
            const alreadyAdded = updatedBars.some(b => b.source === 'user' && (b.syllableIndex ?? b.id) === syllableIndex);
            if (!alreadyAdded) {
              updatedBars.push({
                ...userBar,
                pitch: userPitch,
                x: ttsBar.x,
              });
            }
          }
        }
      }
      
      return updatedBars;
    });
  }, [filteredUserPitches, filteredBasePitches, currentPitch, isRecording, referenceLineX]);

  
  
  
  useEffect(() => {
    
    if (isReferencePlaying || isRecording) {
      return;
    }
    
    if (playbackCurrentTime === null || playbackCurrentTime === undefined || !filteredBaseDurations || filteredBaseDurations.length === 0) {
      return;
    }

    
    const totalDuration = totalAudioDuration !== null && totalAudioDuration !== undefined && totalAudioDuration > 0
      ? totalAudioDuration
      : filteredBaseDurations.reduce((sum, d) => sum + d, 0);

    if (totalDuration <= 0) {
      return;
    }

    
    const currentTime = Math.max(0, Math.min(totalDuration, playbackCurrentTime));

    
    let accumulatedTime = 0;
    const syllableTimes = filteredBaseDurations.map((dur) => {
      const startTime = accumulatedTime;
      accumulatedTime += dur;
      return { startTime, endTime: accumulatedTime, duration: dur };
    });

    
    const currentSyllableIndex = syllableTimes.findIndex(
      (s) => currentTime >= s.startTime && currentTime < s.endTime
    );

    setBars((prevBars) => {
      if (prevBars.length === 0) {
        return prevBars;
      }

      
      const availableDistance = endX - referenceLineX;
      
      
      const pixelsPerSecond = availableDistance / totalDuration;

      return prevBars.map((bar, index) => {
        if (index >= syllableTimes.length) {
          return bar;
        }

        const syllable = syllableTimes[index];
        const timeFromStart = currentTime - syllable.startTime;
        
        
        if (timeFromStart < 0) {
          const timeUntilStart = -timeFromStart;
          
          const previewCount = 3; 
          if (index <= (currentSyllableIndex >= 0 ? currentSyllableIndex + previewCount : previewCount)) {
            
            const distanceFromEnd = Math.min(BAR_WIDTH * 2, timeUntilStart * pixelsPerSecond * 0.5);
            return {
              ...bar,
              x: endX - distanceFromEnd,
              isActive: false,
            };
          }
          
          return {
            ...bar,
            x: endX + BAR_WIDTH,
            isActive: false,
          };
        }
        
        
        
        const syllableProgress = Math.min(1, timeFromStart / syllable.duration);
        
        
        let newX: number;
        
        
        
        const timeRatio = currentTime / totalDuration;
        const syllableStartRatio = syllable.startTime / totalDuration;
        const syllableEndRatio = syllable.endTime / totalDuration;
        
        if (currentSyllableIndex >= 0 && index === currentSyllableIndex) {
          
          
          const progress = syllableProgress;
          
          newX = endX - (availableDistance * syllableStartRatio) - (availableDistance * (syllableEndRatio - syllableStartRatio) * progress);
        } else if (index < currentSyllableIndex) {
          
          
          const timeSinceEnd = currentTime - syllable.endTime;
          const pixelOffset = timeSinceEnd * pixelsPerSecond;
          newX = referenceLineX - BAR_WIDTH - pixelOffset;
        } else {
          
          
          const timeUntilStart = syllable.startTime - currentTime;
          if (timeUntilStart <= syllable.duration * 1.5) {
            
            const preShowRatio = 1 - (timeUntilStart / (syllable.duration * 1.5));
            const targetX = endX - (availableDistance * syllableStartRatio);
            const fromX = endX - 20;
            newX = fromX - (fromX - targetX) * Math.max(0, Math.min(1, preShowRatio));
          } else {
            
            newX = endX - 10;
          }
        }
        
        
        newX = Math.max(startX - BAR_WIDTH, Math.min(endX + BAR_WIDTH, newX));

        
        const barRightEdge = newX + BAR_WIDTH;
        const hasPassed = barRightEdge <= referenceLineX;

        return {
          ...bar,
          x: newX,
          isActive: currentTime >= syllable.startTime - 0.05 && currentTime <= syllable.endTime + 0.1, 
          hasPassedReferenceLine: bar.hasPassedReferenceLine || hasPassed,
        };
      });
    });
  }, [isReferencePlaying, playbackCurrentTime, totalAudioDuration, filteredBaseDurations, endX, referenceLineX, startX]);

  
  useEffect(() => {
    
    setReferenceLineX(INITIAL_REFERENCE_LINE_X);
  }, []);

  
  useEffect(() => {
    if (!isRecording || isReferencePlaying) {
      return;
    }

    const interval = setInterval(() => {
      setBars((prevBars) => {
        if (prevBars.length === 0) {
          return prevBars;
        }

        
        const moveDistance = (SCROLL_SPEED * 16) / 1000; 
        
        const updatedBars = prevBars
          .map((bar) => {
            
            const newX = bar.x - moveDistance;
            
            
            const barRightEdge = newX + BAR_WIDTH;
            const hasPassed = barRightEdge <= referenceLineX;
            const newlyPassed = hasPassed && !bar.hasPassedReferenceLine;
            
                        if (newlyPassed) {
              const syllableIndex = bar.syllableIndex ?? bar.id;
            }
            
            return {
              ...bar,
              x: newX,
              hasPassedReferenceLine: bar.hasPassedReferenceLine || hasPassed,
            };
          })
          .filter((bar) => {
            
            
            const barRightEdge = bar.x + BAR_WIDTH;
            
            return barRightEdge >= startX - BAR_WIDTH; 
          });
        
        
        barsRef.current = updatedBars;
        
        return updatedBars;
      });
    }, 16); 

    return () => {
      clearInterval(interval);
    };
  }, [isRecording, isReferencePlaying, startX, referenceLineX]);

  
  useEffect(() => {
    setBars((prevBars) => {
      if (prevBars.length === 0) {
        return prevBars;
      }

      const updatedBars = prevBars.map((bar) => {
        
        
        const barRightEdge = bar.x + BAR_WIDTH;
        const hasPassed = barRightEdge <= referenceLineX;
        const newlyPassed = hasPassed && !bar.hasPassedReferenceLine;

                if (newlyPassed) {
          const syllableIndex = bar.syllableIndex ?? bar.id;
        }

        return {
          ...bar,
          hasPassedReferenceLine: bar.hasPassedReferenceLine || hasPassed,
        };
      });
      
      
      barsRef.current = updatedBars;
      
      return updatedBars;
    });
  }, [referenceLineX]);

  
  useEffect(() => {
    if (isRecording && filteredSyllables.length > 0) {
      
      setBars((prevBars) => {
        
        if (prevBars.length === 0 || prevBars.length !== filteredSyllables.length) {
          const syllableCount = filteredSyllables.length;
          const newBars: RealtimeBar[] = [];
          
          
          const firstBarX = endX - BAR_WIDTH; 
          
          for (let i = 0; i < syllableCount; i++) {
            
            const basePitch = (filteredBasePitches && filteredBasePitches[i] !== undefined) ? filteredBasePitches[i] : 0.5;
            
            
            const initialPitch = basePitch;
            
            
            
            const barX = firstBarX + (i * BAR_SPACING);
            
            newBars.push({
              id: i,
              x: barX, 
              pitch: initialPitch,
              basePitch: basePitch,
              timestamp: Date.now(),
              isActive: true, 
              hasPassedReferenceLine: false, 
              source: 'tts', 
              syllableIndex: i, 
            });
          }
          
          return newBars;
        }
        
        
        return prevBars.map((bar) => ({
          ...bar,
          hasPassedReferenceLine: false, 
        }));
      });
      
      
      setReferenceLineX(INITIAL_REFERENCE_LINE_X);
    }
  }, [isRecording, filteredSyllables, filteredBasePitches, endX]);

  
  useEffect(() => {
    if (!isRecording) {
      
      const timer = setTimeout(() => {
        setBars([]);
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={[styles.chartArea, { width, height }]}>
        {}
        <View
          style={[
            styles.centerLine,
            {
              left: 0,
              top: height / 2,
              width: width,
            },
          ]}
        />
        
        {}
        <View
          style={[
            styles.referenceLine,
            {
              left: referenceLineX,
              top: 0,
              height: 180,
            },
          ]}
        />
        
        {}
        {bars.map((bar) => {
          
          if (!bar.isActive) {
            return null;
          }
          const y = mapPitchToY(bar.pitch);
          const syllableIndex = bar.syllableIndex ?? bar.id;
          
          
          let color = '#9CA3AF'; 
          if (bar.source === 'user') {
            
            color = getPitchColor(bar.pitch);
          }
          
          
          const syllableText = bar.source === 'tts' ? (filteredSyllables[syllableIndex] || '') : '';
          
          return (
            <View key={`${bar.source}-${bar.id}`}>
              {}
              <View
                style={[
                  styles.bar,
                  {
                    left: bar.x,
                    top: y - BAR_HEIGHT / 2,
                    width: BAR_WIDTH,
                    height: BAR_HEIGHT,
                    backgroundColor: color,
                  },
                ]}
              />
              {}
              {syllableText && (
                <Text
                  style={[
                    styles.syllableText,
                    {
                      left: bar.x + BAR_WIDTH / 2,
                      top: y + BAR_HEIGHT / 2 + 5,
                    },
                  ]}
                >
                  {syllableText}
                </Text>
              )}
            </View>
          );
        })}
      </View>
      
      {}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={[styles.colorIndicator, { backgroundColor: getPitchColor(0) }]} />
          <Text style={styles.infoText}>낮은 음</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={[styles.colorIndicator, { backgroundColor: getPitchColor(0.4) }]} />
          <Text style={styles.infoText}>중간 음</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={[styles.colorIndicator, { backgroundColor: getPitchColor(1) }]} />
          <Text style={styles.infoText}>높은 음</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  chartArea: {
    position: 'relative',
    overflow: 'hidden',
  },
  centerLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#E5E7EB',
    opacity: 0.3,
  },
  referenceLine: {
    position: 'absolute',
    width: 3,
    backgroundColor: '#6B7280',
  },
  bar: {
    position: 'absolute',
    borderRadius: 5, 
    opacity: 0.9,
  },
  syllableText: {
    position: 'absolute',
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
    transform: [{ translateX: -10 }], 
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
    flexWrap: 'wrap',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  infoText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
});
