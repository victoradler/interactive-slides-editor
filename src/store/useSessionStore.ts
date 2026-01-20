import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

type SessionStore = {
  sessionId: string | null;
  startSession: () => void;
  resetSession: () => void;
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      sessionId: null,
      startSession: () => set({ sessionId: nanoid(6) }),
      resetSession: () => set({ sessionId: null }),
    }),
    {
      name: "teachy-session-storage",
    }
  )
);


export function getActiveKey(sessionId: string) {
  return `teachy:session:${sessionId}:active`;
}

export function getVotesKey(sessionId: string, slideId?: string) {
  if (slideId) {
    return `teachy:session:${sessionId}:slide:${slideId}:votes`;
  }
  return `teachy:session:${sessionId}:votes`;
}

export function publishMultipleChoice(sessionId: string, slide: { id: string; question?: string; options?: string[] }) {
  const payload = {
    slideId: slide.id,
    question: slide.question ?? "",
    options: slide.options ?? [],
  };

  localStorage.setItem(getActiveKey(sessionId), JSON.stringify(payload));

  // Usar chave específica do slide para não misturar votos de slides diferentes
  const votesKey = getVotesKey(sessionId, slide.id);
  const existingVotes = localStorage.getItem(votesKey);
  if (!existingVotes) {
    localStorage.setItem(votesKey, JSON.stringify({}));
  }
} 