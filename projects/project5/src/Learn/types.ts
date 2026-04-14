export type CategoryKey =
  | 'deliver'
  | 'persuade'
  | 'empathy'
  | 'emotion'
  | 'directive'
  | 'interrogative';

export type Category = {
  key: CategoryKey;
  id?: number;
  title: string;
  subtitle: string;
};

export type LessonMode = 'sentence' | 'paragraph';
