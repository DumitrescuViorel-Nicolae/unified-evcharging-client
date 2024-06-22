import { createStore } from "zustand";
import accountStore from "../UserStore/accountStore";

export interface AppStateStore {
  isLoading: boolean | null;
  setIsLoading: (loading: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;

  updatingUser: boolean;
  setIsUpdatingUser: (updating: boolean) => void;

  isAddStationModalOpen: boolean;
  setIsAddStationModalOpen: (open: boolean) => void;
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
    if (open === false) {
      accountStore.getState().setPaymentSum(0);
    }
    set({ isPaymentModalOpen: open });
  },

  updatingUser: false,
  setIsUpdatingUser: (updating) => {
    set({ updatingUser: updating });
  },

  isAddStationModalOpen: false,
  setIsAddStationModalOpen(isOpen) {
    set({ isAddStationModalOpen: isOpen });
  },
}));

export default appStateStore;
