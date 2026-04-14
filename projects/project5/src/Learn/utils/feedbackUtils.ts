import { ParsedFeedback } from '../types/feedbackTypes';

type MarkdownSection = {
  title: string;
  level?: number;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: MarkdownSection[];
};

export type StructuredMarkdownFeedback = {
  summary?: string;
  sections?: MarkdownSection[];
};

export function getGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'C+';
  if (score >= 65) return 'C';
  return 'D';
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#10B981';
  if (score >= 80) return '#3B82F6';
  if (score >= 70) return '#F59E0B';
  return '#EF4444';
}

export function getScoreLabel(key: string): string {
  const labelMap: Record<string, string> = {
    '1_wer_per': '음소/음절',
    '2_clarity': '명료성',
    '3_pronunciation_rules': '발음 규칙',
    '4_tone': '톤',
    '5_speed': '속도',
    '6_rhythm': '리듬',
    '7_intonation': '억양',
    '8_fluency': '유창성',
    '9_articulation': '조음',
  };
  return labelMap[key] || key;
}

export function parseDetailedFeedback(feedback: string): ParsedFeedback {
  const result: ParsedFeedback = {
    syllableAnalysis: [],
    overallAnalysis: {
      best: [],
      needsImprovement: [],
    },
    improvementMethods: [],
    encouragement: '',
  };

  const sections = feedback.split(/\n(?=\[)/);
  
  for (const section of sections) {
    if (section.includes('[음절별 분석]')) {
      const content = section.replace(/\[음절별 분석\]\s*/g, '').trim();
      const lines = content.split('\n').filter(line => line.trim().startsWith('-'));
      result.syllableAnalysis = lines.map(line => line.replace(/^-\s*/, '').trim());
    } else if (section.includes('[종합 분석]')) {
      const content = section.replace(/\[종합 분석\]\s*/g, '').trim();
      const bestMatch = content.match(/- 가장 잘한 부분[:\s]*([^\n]+)/);
      const needsMatch = content.match(/- 가장 개선이 필요한 부분[:\s]*([^\n]+)/);
      
      if (bestMatch) {
        result.overallAnalysis.best = bestMatch[1].split(/[,\n]/).map(s => s.trim()).filter(s => s);
      }
      if (needsMatch) {
        result.overallAnalysis.needsImprovement = needsMatch[1].split(/[,\n]/).map(s => s.trim()).filter(s => s);
      }
    } else if (section.includes('[구체적 개선 방법]')) {
      const content = section.replace(/\[구체적 개선 방법\]\s*/g, '').trim();
      const lines = content.split('\n').filter(line => /^\d+\.\s/.test(line.trim()));
      result.improvementMethods = lines.map(line => line.replace(/^\d+\.\s*/, '').trim());
    } else if (section.includes('[격려 메시지]')) {
      result.encouragement = section.replace(/\[격려 메시지\]\s*/g, '').trim();
    }
  }

  return result;
}

const headingRegex = /^(#{2,6})\s*(.+)$/;
const boldHeadingRegex = /^\*\*\s*([^*]+?)\s*\*\*\s*:?\s*(.*)$/;
const bulletRegex = /^[-•]\s+(.*)$/;
const numberedBulletRegex = /^\d+\.\s+(.*)$/;

function cleanHeading(text: string): string {
  const trimmed = text.replace(/^\[(.+)\]$/, '$1').trim();
  const withoutNumber = trimmed.replace(/^\d+\.\s*/, '').trim();
  
  return withoutNumber
    .replace(/\(\s*\d+\s*번\s*녹음\s*\)/g, '')
    .replace(/-\s*\d+\s*번\s*녹음/g, '')
    .trim();
}

function pushParagraph(target: MarkdownSection | null, buffer: string[], intro: string[]) {
  if (buffer.length === 0) return;
  const paragraph = buffer.join(' ').replace(/\s+/g, ' ').trim();
  buffer.length = 0;
  if (!paragraph) return;
  if (target) {
    if (!target.paragraphs) target.paragraphs = [];
    target.paragraphs.push(paragraph);
  } else {
    intro.push(paragraph);
  }
}

export function parseMarkdownFeedbackStructure(feedback: string): StructuredMarkdownFeedback | null {
  const lines = feedback.split(/\r?\n/);
  const introParagraphs: string[] = [];
  const sections: MarkdownSection[] = [];
  let currentSection: MarkdownSection | null = null;
  let currentParentSection: MarkdownSection | null = null;
  let paragraphBuffer: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      pushParagraph(currentSection, paragraphBuffer, introParagraphs);
      continue;
    }

    const headingMatch = line.match(headingRegex);
    if (headingMatch) {
      pushParagraph(currentSection, paragraphBuffer, introParagraphs);
      const level = headingMatch[1].length;
      const title = cleanHeading(headingMatch[2]);
      
      
      if (level === 2) {
        
        const isSubSection = title.includes('종합 평가') || title.includes('개선 방안');
        
        if (isSubSection && currentParentSection) {
          
          currentSection = { title, level: 3 }; 
          if (!currentParentSection.subsections) {
            currentParentSection.subsections = [];
          }
          currentParentSection.subsections.push(currentSection);
        } else {
          
          currentParentSection = null;
          currentSection = null;
          
          currentParentSection = { title, level };
          sections.push(currentParentSection);
        }
      } else {
        
        currentSection = { title, level };
        if (currentParentSection) {
          
          if (!currentParentSection.subsections) {
            currentParentSection.subsections = [];
          }
          currentParentSection.subsections.push(currentSection);
        } else {
          sections.push(currentSection);
        }
      }
      continue;
    }

    const boldMatch = line.match(boldHeadingRegex);
    if (boldMatch) {
      pushParagraph(currentSection, paragraphBuffer, introParagraphs);
      const title = cleanHeading(boldMatch[1]);
      currentSection = { title, level: 3 };
      
      
      if (currentParentSection) {
        if (!currentParentSection.subsections) {
          currentParentSection.subsections = [];
        }
        currentParentSection.subsections.push(currentSection);
      } else {
        sections.push(currentSection);
      }
      
      const rest = boldMatch[2]?.trim();
      if (rest) {
        paragraphBuffer.push(rest);
        pushParagraph(currentSection, paragraphBuffer, introParagraphs);
      }
      continue;
    }

    const bulletMatch = line.match(bulletRegex) || line.match(numberedBulletRegex);
    if (bulletMatch) {
      pushParagraph(currentSection, paragraphBuffer, introParagraphs);
      const bulletText = bulletMatch[1].trim();
      if (!currentSection) {
        currentSection = { title: '세부 내용', level: 3 };
        if (currentParentSection) {
          if (!currentParentSection.subsections) {
            currentParentSection.subsections = [];
          }
          currentParentSection.subsections.push(currentSection);
        } else {
          sections.push(currentSection);
        }
      }
      if (!currentSection.bullets) currentSection.bullets = [];
      currentSection.bullets.push(bulletText);
      continue;
    }

    paragraphBuffer.push(line);
  }

  pushParagraph(currentSection, paragraphBuffer, introParagraphs);

  const structured: StructuredMarkdownFeedback = {};
  if (introParagraphs.length > 0) {
    structured.summary = introParagraphs.join('\n\n');
  }
  if (sections.length > 0) {
    structured.sections = sections;
  }

  if (structured.summary || structured.sections) {
    return structured;
  }

  return null;
}
