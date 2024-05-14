import { createStore } from "zustand";
import { EVStation } from "../../interfaces/EVStation";
import { handleAxiosError } from "../../utils/errorParsing";
import axiosBasic from "../../axios/axiosBasic";

export interface EVStationStore {
  evStations: EVStation[];
  getEVStation: () => void;
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
}));

export default evStationStore;
