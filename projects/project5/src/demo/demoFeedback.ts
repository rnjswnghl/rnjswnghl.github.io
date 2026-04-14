export type DemoVoiceAnalysis = {
  f0: { mean: number; std: number; min: number; max: number; curve: number[] }
  energy: { mean: number; std: number; curve: number[] }
  syllables: { text: string; start_time: number; end_time: number }[]
  pauses: { start_time: number; duration: number }[]
  alignment: {
    dtw_distance: number
    correlation: number
    f0_correlation: number
    f0_rmse: number
  }
}

export type DemoDetailedItem = {
  recording_num: number
  script_id: number
  script: string
  scores: Record<string, number> & { total: number }
  analysis: DemoVoiceAnalysis
  detailed_feedback: string
}

export type DemoSession = {
  session_id: number
  generated_at: string
  overall_score: number
  comprehensive_feedback: string
  overall: {
    average_scores: Record<string, number> & { total: number }
    improvement: { score_change: number; trend: '개선' | '유지' | '악화' }
    summary_feedback: string
  }
  detailed: DemoDetailedItem[]
  suggestions: string[]
  strengths: string[]
  improvement_areas: string[]
}

function linspace(n: number, a: number, b: number) {
  if (n <= 1) return [a]
  const step = (b - a) / (n - 1)
  return Array.from({ length: n }, (_, i) => a + step * i)
}

function wobble(arr: number[], amount: number, freq: number) {
  return arr.map((v, i) => v + Math.sin(i * freq) * amount)
}

const nowIso = new Date().toISOString()

function round1(v: number) {
  return Math.round(v * 10) / 10
}

function round2(v: number) {
  return Math.round(v * 100) / 100
}

function makeAnalysis(seed: number, script: string): DemoVoiceAnalysis {
  const syllableTexts = Array.from(script.replace(/\s+/g, ''))
  const f0Mean = 150 + seed * 6.5
  const f0Std = 18 + seed * 2.2
  const f0Min = 105 + seed * 2
  const f0Max = 220 + seed * 4.5
  const userF0 = wobble(linspace(64, f0Mean - 12, f0Mean + 24), 10 + seed * 1.5, 0.18 + seed * 0.01).map(
    (v, i) => (i > 38 && i < 50 ? v + 10 + seed * 2 : v),
  )

  const eMean = 0.5 + seed * 0.02
  const eStd = 0.12 + seed * 0.01
  const userEnergy = wobble(linspace(64, eMean - 0.18, eMean + 0.22), 0.05 + seed * 0.01, 0.25 + seed * 0.01).map(
    (v, i) => (i % (11 + seed) === 0 ? v - (0.1 - seed * 0.01) : v),
  )

  return {
    f0: {
      mean: round1(f0Mean),
      std: round1(f0Std),
      min: round1(f0Min),
      max: round1(f0Max),
      curve: userF0.map((v) => round1(Math.max(50, Math.min(400, v)))),
    },
    energy: {
      mean: round2(eMean),
      std: round2(eStd),
      curve: userEnergy.map((v) => round2(Math.max(0.05, Math.min(1, v)))),
    },
    syllables: syllableTexts.slice(0, 12).map((t, i) => ({
      text: t,
      start_time: round2(i * 0.16 + seed * 0.01),
      end_time: round2(i * 0.16 + 0.12 + seed * 0.01),
    })),
    pauses: [
      { start_time: round2(0.62 + seed * 0.08), duration: round2(0.22 - seed * 0.01) },
      { start_time: round2(1.58 + seed * 0.06), duration: round2(0.16 + seed * 0.01) },
    ],
    alignment: {
      dtw_distance: round2(0.22 - seed * 0.01),
      correlation: round2(0.68 + seed * 0.02),
      f0_correlation: round2(0.66 + seed * 0.02),
      f0_rmse: round2(0.95 - seed * 0.03),
    },
  }
}

function makeDetailedStructuredFeedback(params: {
  recordingNum: number
  script: string
  scores: Record<string, number> & { total: number }
  analysis: DemoVoiceAnalysis
}) {
  const { recordingNum, script, scores, analysis } = params
  const f0 = analysis.f0
  const en = analysis.energy
  const al = analysis.alignment
  const pauses = analysis.pauses

  return {
    summary: {
      paragraphs: [
        `총점 ${scores.total.toFixed(1)}점. 분절(발음 정확도·규칙·명료도) 축은 안정적이고, 운율(피치·강세·종결·휴지·리듬) 축은 일부 구간에서 변동성이 관찰됩니다.`,
        `근거 수치: F0 평균 ${f0.mean}Hz(표준편차 ${f0.std}Hz, ${f0.min}–${f0.max}Hz), 에너지 평균 ${en.mean}(표준편차 ${en.std}), DTW ${al.dtw_distance}, Corr ${al.correlation}, F0 Corr ${al.f0_correlation}, RMSE ${al.f0_rmse}.`,
      ],
      bullets: [
        `9가지 세부 기준: ①음소/음절 ②명료도 ③규칙 ④피치 ⑤강세 ⑥종결 ⑦속도 ⑧휴지 ⑨리듬`,
        `휴지 ${pauses.length}회(예: ${pauses[0].start_time}s/${pauses[0].duration}s, ${pauses[1].start_time}s/${pauses[1].duration}s) → “의미 단위 경계”로 재배치 권장`,
      ],
    },
    sections: [
      {
        title: '조음음성학적 분석',
        paragraphs: [
          `자음의 폐쇄-방출 타이밍은 대체로 안정적이며(명료도 ${scores['2_clarity'].toFixed(1)}/100), 어절 경계에서 조음 전이가 급해지는 구간이 관찰됩니다.`,
          `음소/음절 점수(${scores['1_wer_per'].toFixed(1)}/100)가 상대적으로 낮게 나오는 경우는 “경계에서의 약화” 또는 “자모 단위 전이 불안정”이 원인일 가능성이 큽니다.`,
        ],
        bullets: [
          '교정 포인트: 자음은 “짧고 선명”, 모음은 “길이로 유창성” 확보',
          '2~3음절 단위로 먼저 정확도 확보 → 문장으로 확장',
        ],
      },
      {
        title: '음향음성학적 분석',
        paragraphs: [
          `F0는 평균 ${f0.mean}Hz, 표준편차 ${f0.std}Hz로 자연 범위이나, 특정 구간에서 급상승/급하강이 나타나 운율 점수(피치 ${scores['4_pitch'].toFixed(1)}, 종결 ${scores['6_ending'].toFixed(1)})에 영향을 줍니다.`,
          `에너지 평균 ${en.mean}, 표준편차 ${en.std}로 강도 분산이 존재하며(강세 ${scores['5_stress'].toFixed(1)}/100), 핵심 어절 이외 구간의 강도 정리가 필요합니다.`,
        ],
        bullets: [
          `정렬/유사도: DTW ${al.dtw_distance}, F0 Corr ${al.f0_correlation}, RMSE ${al.f0_rmse} → 윤곽(상승/하강)만 분리 모사 후 문장에 재적용`,
          '강조는 “피치 높이”보다 “길이+에너지”로 먼저 만들고, F0 상승은 최소화',
        ],
      },
      {
        title: '음운론적 분석',
        paragraphs: [
          `음절말 자음 제한/연음 등 규칙 적용(규칙 ${scores['3_rules'].toFixed(1)}/100)은 전반적으로 안정적입니다.`,
          `다만 휴지의 위치가 의미 단위보다 “계획 재정렬”처럼 들리는 지점에 생기면(휴지 ${scores['8_pause'].toFixed(1)}/100), 청자 체감 유창성이 저하됩니다.`,
        ],
        bullets: [
          '받침 뒤 연결 구간에서 과도한 끊김(휴지)을 피하고 연결 유지',
          '연음이 필요한 위치에서는 모음 시작을 세게 치지 말고 받침 잔향을 유지',
        ],
      },
      {
        title: '초분절음소 분석',
        paragraphs: [
          `리듬(${scores['9_rhythm'].toFixed(1)}/100)은 강세·휴지의 변동이 누적될 때 흔들립니다. 속도(${scores['7_speech_rate'].toFixed(1)}/100)는 과도하지 않으나, 휴지 삽입으로 체감 속도가 흔들릴 수 있습니다.`,
          `종결부는 2~3음절에 걸친 완만한 하강을 만들면(종결 ${scores['6_ending'].toFixed(1)}/100) 문장 마무리 안정감이 커집니다.`,
        ],
        bullets: [
          '메트로놈 90bpm 기준: 2박=1어절로 리듬 단위 고정',
          '종결부: 마지막 2~3음절에 걸쳐 “계단식 하강” + 마지막 음절 에너지 70~80% 유지',
        ],
      },
      {
        title: '가장 잘한 점',
        paragraphs: [
          `분절 축(음소/음절·명료도·규칙)의 기반이 잡혀 있어, 조금만 운율을 정리하면 총점 상승 폭이 큽니다.`,
        ],
        bullets: [
          `명료도 ${scores['2_clarity'].toFixed(1)}/100: 자음 경계가 비교적 선명`,
          `규칙 ${scores['3_rules'].toFixed(1)}/100: 발음 규칙 적용 안정`,
        ],
      },
      {
        title: '가장 개선이 필요한 부분',
        paragraphs: [
          `운율 축(피치·강세·종결·휴지·리듬)의 “분배”를 정리하는 것이 최우선입니다.`,
        ],
        bullets: [
          `종결 ${scores['6_ending'].toFixed(1)}/100: 종결 하강 형태를 완만하게 설계`,
          `강세 ${scores['5_stress'].toFixed(1)}/100: 강세를 1곳으로 제한해 대비 강화`,
          `휴지 ${scores['8_pause'].toFixed(1)}/100: 의미 단위 경계 외 휴지 최소화`,
        ],
      },
      {
        title: '구체적인 개선 방법',
        paragraphs: [
          '아래 루틴은 “9가지 기준”을 한 번에 개선하는 가장 비용 대비 효율이 높은 순서로 설계했습니다.',
        ],
        bullets: [
          '1) 강세 1곳만 선택: 핵심 어절 1개에만 에너지/길이 집중(나머지는 10~15% 낮춤)',
          '2) 종결 하강 2~3음절로 분산: 마지막 음절에서 급락 금지(에너지 70~80% 유지)',
          `3) 휴지 재배치: 의미 단위 경계에서만 150–250ms(현재 예: ${pauses[0].duration}s, ${pauses[1].duration}s)`,
          '4) 3단 변속: (2초) 천천히 → (1.5초) 보통 → (1초) 자연 속도 반복',
        ],
      },
    ],
  }
}

const scripts5 = [
  { script_id: 101, text: '안녕하세요. Daltoori 데모 문장입니다.' },
  { script_id: 201, text: '이 제안은 사용자 경험을 더 좋게 만듭니다.' },
  { script_id: 301, text: '괜찮아요. 천천히 다시 해봐도 돼요.' },
  { script_id: 401, text: '오늘은 정말 기분이 좋아요!' },
  { script_id: 601, text: '오늘 면접은 몇 시에 시작하나요?' },
]

function makeScores(seed: number) {
  // seed가 커질수록 “개선”되는 형태
  const clamp = (v: number) => Math.max(0, Math.min(100, v))
  const base = 74 + seed * 2
  const scores = {
    '1_wer_per': clamp(base + 12 - seed * 0.8),
    '2_clarity': clamp(base + 8 - seed * 0.5),
    '3_rules': clamp(base + 6 - seed * 0.4),
    '4_pitch': clamp(base + 1 + seed * 0.3),
    '5_stress': clamp(base - 1 + seed * 0.5),
    '6_ending': clamp(base - 3 + seed * 0.6),
    '7_speech_rate': clamp(base + 5 - seed * 0.2),
    '8_pause': clamp(base + 3 + seed * 0.3),
    '9_rhythm': clamp(base + 2 + seed * 0.2),
  } as Record<string, number>
  const total =
    0.2 * scores['1_wer_per'] +
    0.12 * scores['2_clarity'] +
    0.08 * scores['3_rules'] +
    0.16 * scores['4_pitch'] +
    0.12 * scores['5_stress'] +
    0.12 * scores['6_ending'] +
    0.1 * scores['7_speech_rate'] +
    0.07 * scores['8_pause'] +
    0.03 * scores['9_rhythm']
  return { ...scores, total: round1(total) }
}

const detailed5: DemoDetailedItem[] = scripts5.map((s, idx) => {
  const seed = idx + 1
  const analysis = makeAnalysis(seed, s.text)
  const scores = makeScores(seed)
  const structured = makeDetailedStructuredFeedback({
    recordingNum: seed,
    script: s.text,
    scores,
    analysis,
  })
  return {
    recording_num: seed,
    script_id: s.script_id,
    script: s.text,
    scores,
    analysis,
    detailed_feedback: JSON.stringify(structured),
  }
})

function averageOf(key: string) {
  const vals = detailed5.map((d) => Number((d.scores as any)[key] ?? 0))
  return round1(vals.reduce((a, b) => a + b, 0) / Math.max(1, vals.length))
}

const overallAvgScores = {
  '1_wer_per': averageOf('1_wer_per'),
  '2_clarity': averageOf('2_clarity'),
  '3_rules': averageOf('3_rules'),
  '4_pitch': averageOf('4_pitch'),
  '5_stress': averageOf('5_stress'),
  '6_ending': averageOf('6_ending'),
  '7_speech_rate': averageOf('7_speech_rate'),
  '8_pause': averageOf('8_pause'),
  '9_rhythm': averageOf('9_rhythm'),
  total: averageOf('total'),
}

export const demoSession: DemoSession = {
  session_id: 1001,
  generated_at: nowIso,
  overall_score: overallAvgScores.total,
  comprehensive_feedback:
    '5회 녹음을 종합하면 분절적 정확성(음소/음절·명료도)은 비교적 안정적으로 유지되며, 연습 회차가 진행될수록 운율(피치·강세·종결) 항목이 점진적으로 개선되는 경향이 관찰됩니다. 휴지의 위치를 의미 단위 경계로 제한하고, 종결부 F0 하강을 2~3음절에 걸쳐 완만하게 설계하면 자연스러움이 크게 향상됩니다.',
  overall: {
    average_scores: {
      ...overallAvgScores,
    },
    improvement: { score_change: round1(detailed5.at(-1)!.scores.total - detailed5[0].scores.total), trend: '개선' },
    summary_feedback:
      '음소/음절 정확도는 유지되며, 회차가 진행될수록 휴지·리듬·종결 억양이 안정화됩니다. 강세를 한 위치에만 주고 종결 하강을 완만하게 만드는 훈련이 효율적입니다.',
  },
  detailed: detailed5,
  suggestions: [
    '종결부 F0를 2–3음절에 걸쳐 완만하게 하강',
    '강세를 한 음절/어절에만 주고 나머지는 강도를 낮춰 대비 강화',
    '휴지를 의미 단위 경계에서만 150–250ms로 제한',
  ],
  strengths: ['음소/음절 일치율이 안정적', '명료도(자음 폐쇄/방출)가 비교적 선명함', '발화 속도가 과도하게 빠르지 않음'],
  improvement_areas: ['문장 종결 하강 패턴', '강세 분배', '휴지 위치의 일관성', '피치 윤곽의 미세 오차(RMSE)'],
}

