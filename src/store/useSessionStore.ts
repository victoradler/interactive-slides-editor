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
