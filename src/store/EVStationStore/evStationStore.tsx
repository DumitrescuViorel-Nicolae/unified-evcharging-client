import { createStore } from "zustand";
import { EVStation } from "../../interfaces/EVStation";
import { handleAxiosError } from "../../utils/errorParsing";
import axiosBasic from "../../axios/axiosBasic";
import PaymentTransaction from "../../interfaces/Transactions";
import axiosInstance from "../../axios/axiosInstance";

export interface EVStationStore {
  evStations: EVStation[];
  getEVStation: () => void;
  transactions: PaymentTransaction[] | [];
  getTransactions: () => void;
}

const evStationStore = createStore<EVStationStore>((set) => ({
  evStations: [],
  getEVStation: async () => {
    try {
      const response = await axiosBasic.get("/EVStation/getEVInfrastructure");
      set({ evStations: response.data });
    } catch (error) {
      handleAxiosError(error);
    }
  },
  transactions: [],
  getTransactions: async () => {
    try {
      const response = await axiosInstance.get("/Payment/transactions");
      set({ transactions: response.data });
    } catch (error) {
      handleAxiosError(error);
    }
  },
}));

export default evStationStore;
