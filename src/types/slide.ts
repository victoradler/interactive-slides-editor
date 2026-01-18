// Slide Types

export type SlideType =
  | 'STATIC'
  | 'MULTIPLE_CHOICE'
  | 'WORD_CLOUD'
  | 'BAR_CHART';

export interface SlideElementBase {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
}

export interface TextElement extends SlideElementBase {
  type: 'TEXT';
  text: string;
  fontSize: number;
}

export interface ImageElement extends SlideElementBase {
  type: 'IMAGE';
  src: string;
}

export type SlideElement = TextElement | ImageElement;

export interface Slide {
  id: string;
  type: SlideType;
  elements: SlideElement[];
  question?: string;
  options?: string[];
}
