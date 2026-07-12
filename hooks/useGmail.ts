import { create } from "zustand";

type GmailState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isComposeOpen: boolean;
  composeTo: string;
  composeSubject: string;
  composeBody: string;
  setComposeOpen: (isOpen: boolean) => void;
  openCompose: (params?: { to?: string; subject?: string; body?: string }) => void;
  closeCompose: () => void;
};

export const useGmailStore = create<GmailState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  isComposeOpen: false,
  composeTo: "",
  composeSubject: "",
  composeBody: "",
  setComposeOpen: (isOpen) => set({ isComposeOpen: isOpen }),
  openCompose: (params) =>
    set({
      isComposeOpen: true,
      composeTo: params?.to ?? "",
      composeSubject: params?.subject ?? "",
      composeBody: params?.body ?? "",
    }),
  closeCompose: () =>
    set({
      isComposeOpen: false,
      composeTo: "",
      composeSubject: "",
      composeBody: "",
    }),
}));
