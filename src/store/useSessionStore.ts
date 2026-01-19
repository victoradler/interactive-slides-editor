import { create } from "zustand";
import { nanoid } from "nanoid";

type SessionStore = {
  sessionId: string | null;
  startSession: () => void;
  resetSession: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  sessionId: null,
  startSession: () => set({ sessionId: nanoid(6) }),
  resetSession: () => set({ sessionId: null }),
}));


export function getActiveKey(sessionId: string) {
  return `teachy:session:${sessionId}:active`;
}

export function getVotesKey(sessionId: string) {
  return `teachy:session:${sessionId}:votes`;
}

export function publishMultipleChoice(sessionId: string, slide: { id: string; question?: string; options?: string[] }) {
  const payload = {
    slideId: slide.id,
    question: slide.question ?? "",
    options: slide.options ?? [],
  };

  localStorage.setItem(getActiveKey(sessionId), JSON.stringify(payload));

  localStorage.setItem(getVotesKey(sessionId), JSON.stringify({}));
}