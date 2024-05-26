import { createStore } from "zustand";

export interface AppStateStore {
  isLoading: boolean | null;
  setIsLoading: (loading: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;

  updatingUser: boolean;
  setIsUpdatingUser: (updating: boolean) => void;
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

  isPaymentModalOpen: false,
  setIsPaymentModalOpen: (open) => {
    console.log("clicked");
    set({ isPaymentModalOpen: open });
  },

  updatingUser: false,
  setIsUpdatingUser: (updating) => {
    set({ updatingUser: updating });
  },
}));

export default appStateStore;
