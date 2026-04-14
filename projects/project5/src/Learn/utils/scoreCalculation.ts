export function calculateToneScore(userPitches: number[], basePitches: number[]): number {
  const n = Math.max(1, Math.min(userPitches.length, basePitches.length));
  let mae = 0;
  for (let i = 0; i < n; i++) {
    mae += Math.abs((userPitches[i] ?? 0.5) - (basePitches[i] ?? 0.5));
  }
  mae = mae / n;
  return Math.max(0, Math.min(100, Math.round(100 - (mae / 0.6) * 100)));
}

export function calculateRhythmScore(userPitches: number[], basePitches: number[]): number {
  const diff = (arr: number[]) => arr.slice(1).map((v, i) => v - arr[i]);
  const ud = diff(userPitches);
  const bd = diff(basePitches);
  const m = Math.max(1, Math.min(ud.length, bd.length));
  let rhythmDiff = 0;
  for (let i = 0; i < m; i++) {
    rhythmDiff += Math.abs((ud[i] ?? 0) - (bd[i] ?? 0));
  }
  rhythmDiff = rhythmDiff / m;
  return Math.max(0, Math.min(100, Math.round(100 - (rhythmDiff / 0.5) * 100)));
}

export function calculateSpeedScore(): number {
  return 70 + Math.round(Math.random() * 25);
}

export function calculatePronScore(): number {
  return 70 + Math.round(Math.random() * 20);
}

export function calculateTotalScore(
  toneScore: number,
  speedScore: number,
  pronScore: number,
  rhythmScore: number
): number {
  return Math.round((toneScore + speedScore + pronScore + rhythmScore) / 4);
}

export function calculateAllScores(userPitches: number[], basePitches: number[]) {
  const toneScore = calculateToneScore(userPitches, basePitches);
  const rhythmScore = calculateRhythmScore(userPitches, basePitches);
  const speedScore = calculateSpeedScore();
  const pronScore = calculatePronScore();
  const totalScore = calculateTotalScore(toneScore, speedScore, pronScore, rhythmScore);

  return {
    toneScore,
    rhythmScore,
    speedScore,
    pronScore,
    totalScore,
  };
}
