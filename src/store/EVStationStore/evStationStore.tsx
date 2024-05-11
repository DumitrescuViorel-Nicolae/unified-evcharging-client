import { createStore } from "zustand";
import { EVStation } from "../../interfaces/EVStation";
import axiosInstance from "../../axios/axiosInstance";
import { handleAxiosError } from "../../utils/errorParsing";

export interface EVStationStore {
  evStations: EVStation[];
  getEVStation: () => void;
}

const evStationStore = createStore<EVStationStore>((set) => ({
  evStations: [],
  getEVStation: async () => {
    try {
      const response = await axiosInstance.get(
        "/EVStation/getEVInfrastructure"
      );
      console.log(response);
      set({ evStations: response.data });
    } catch (error) {
      handleAxiosError(error);
    }
  },
}));

export default evStationStore;
