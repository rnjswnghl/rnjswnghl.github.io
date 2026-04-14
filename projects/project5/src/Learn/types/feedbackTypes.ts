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
