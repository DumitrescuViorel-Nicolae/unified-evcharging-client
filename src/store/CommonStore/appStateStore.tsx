import { createStore } from "zustand";

export interface AppStateStore {
  isLoading: boolean | null;
  setIsLoading: (loading: boolean) => void;
}

const appStateStore = createStore<AppStateStore>((set) => ({
  isLoading: null,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
}));

export default appStateStore;
