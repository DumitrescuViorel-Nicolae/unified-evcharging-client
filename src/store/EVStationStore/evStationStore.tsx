import { createStore } from "zustand";
import { EVStation } from "../../interfaces/EVStation";
import { handleAxiosError } from "../../utils/errorParsing";
import axiosBasic from "../../axios/axiosBasic";
import PaymentTransaction from "../../interfaces/Transactions";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";

export interface EVStationStore {
  evStations: EVStation[];
  getEVStation: () => void;
  deleteEVStation: (stationID: number) => void;
  makePayment: (stripeAccountId: string) => void;
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
  makePayment: async (stripeAccountID) => {
    try {
      const response = await axiosInstance.post(
        `/Payment/processEVPayment?stripeAccountID=${stripeAccountID}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  },
  deleteEVStation: async (stationID) => {
    try {
      const response = await axiosInstance.delete(
        `/EVStation/deleteEVStation?evStationID=${stationID}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        evStationStore.getState().getEVStation();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  },
}));

export default evStationStore;
