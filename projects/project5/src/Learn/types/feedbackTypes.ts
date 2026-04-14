export type AverageScores = {
  [key: string]: number; 
  total: number;
};

export type OverallData = {
  average_scores: AverageScores;
  improvement: {
    score_change: number;
    trend: '개선' | '유지' | '저하';
  };
  summary_feedback: string;
};

export type DetailedItem = {
  recording_num: number;
  script: string;
  scores: AverageScores;
  detailed_feedback: string;
  analysis?: {
    f0?: { mean?: number; std?: number; min?: number; max?: number; curve?: number[] };
    energy?: { mean?: number; std?: number; curve?: number[] };
    syllables?: { text?: string; start_time?: number; end_time?: number }[];
    pauses?: { start_time?: number; duration?: number }[];
    alignment?: {
      dtw_distance?: number;
      correlation?: number;
      f0_correlation?: number;
      f0_rmse?: number;
    };
  };
  reference_audio?: string | {
    url?: string;
    download_url?: string;
  };
  user_recording?: string | {
    url?: string;
    download_url?: string;
  };
};

export type FeedbackData = {
  overall: OverallData;
  detailed: DetailedItem[];
};

export type ParsedFeedback = {
  syllableAnalysis: string[]; 
  overallAnalysis: {
    best: string[]; 
    needsImprovement: string[]; 
  };
  improvementMethods: string[]; 
  encouragement: string; 
};
