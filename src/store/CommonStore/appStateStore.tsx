import { createStore } from "zustand";

export interface AppStateStore {
  isLoading: boolean | null;
  setIsLoading: (loading: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const appStateStore = createStore<AppStateStore>((set) => ({
  isLoading: null,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
  isAuthModalOpen: false,
  setIsAuthModalOpen: (open) => {
    set({ isAuthModalOpen: open });
  },
}));

export default appStateStore;
