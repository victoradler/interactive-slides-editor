import { TextElement, ImageElement } from './slide';

export interface TextElementProps {
  element: TextElement;
  isSelected?: boolean;
  onSelect?: () => void;
}

export interface ImageElementProps {
  element: ImageElement;
  isSelected?: boolean;
  onSelect?: () => void;
}

export interface WordCloudCanvasProps {
  question: string;
  words: Record<string, number>;
}

export interface WordPosition {
  word: string;
  count: number;
  x: number;
  y: number;
  fontSize: number;
  color: string;
}

export interface MultipleChoiceCanvasProps {
  question: string;
  options: string[];
  votes: Record<string, number>;
}
