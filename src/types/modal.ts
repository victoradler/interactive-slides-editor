import { Slide } from './slide';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string | null;
  startSession: () => void;
  resetSession: () => void;
}

export interface JoinSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface InteractiveSlideTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: 'MULTIPLE_CHOICE' | 'WORD_CLOUD') => void;
}

export interface WordCloudModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSlide: Slide | null;
  updateSlideMeta: ((id: string, meta: Record<string, unknown>) => void) | undefined;
  sessionId: string | null;
  publishWordCloud: (sessionId: string, slide: Slide) => void;
  words: Record<string, number>;
}

export interface MultipleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSlide: Slide | null;
  updateSlideMeta: ((id: string, meta: Record<string, unknown>) => void) | undefined;
  sessionId: string | null;
  publishMultipleChoice: (sessionId: string, slide: Slide) => void;
  votes: Record<string, number>;
}
