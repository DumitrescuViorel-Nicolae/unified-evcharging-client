import { createStore } from "zustand";
import { EVStation } from "../../interfaces/EVStation";
import { handleAxiosError } from "../../utils/errorParsing";
import PaymentTransaction from "../../interfaces/Transactions";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { Coordinates } from "../../interfaces/Coordinates";
import accountStore from "../UserStore/accountStore";
import { Option } from "../../interfaces/OptionsData";
import { AddEVStationDTO } from "../../interfaces/AddEVStation";

export interface EVStationStore {
  evStations: EVStation[];
  transactions: PaymentTransaction[] | [];
  directions: any;
  connectorTypes: Option[];

  getEVStation: () => void;
  addEVStation: (evStationToAdd: AddEVStationDTO) => void;
  getTransactions: () => void;
  getConnectorTypes: () => void;
  deleteEVStation: (stationID: number) => void;
  makePayment: (stripeAccountId: string) => void;
  getDirectionToStation: (start: Coordinates, end: Coordinates) => void;
}

const evStationStore = createStore<EVStationStore>((set) => ({
  evStations: [],
  connectorTypes: [],
  transactions: [],
  directions: null,

  getEVStation: async () => {
    try {
      const response = await axiosInstance.get(
        "/EVStation/getEVInfrastructure",
        {
          params: {
            latitude: accountStore.getState().geolocation?.latitude,
            longitude: accountStore.getState().geolocation?.longitude,
          },
        }
      );
      set({ evStations: response.data });
    } catch (error) {
      handleAxiosError(error);
    }
  },

  addEVStation: async (evStationToAdd: AddEVStationDTO) => {
    try {
      const response = await axiosInstance.post(
        "/EVStation/addEVStation",
        evStationToAdd
      );

      if (response.data.success) {
        toast.success("Station added!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getTransactions: async () => {
    try {
      const response = await axiosInstance.get("/Payment/transactions");
      set({ transactions: response.data });
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getConnectorTypes: async () => {
    try {
      const response = await axiosInstance.get("/EVStation/getEVConnectorType");
      set({ connectorTypes: [...new Set<Option>(response.data)] });
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

  getDirectionToStation: async (start: Coordinates, end: Coordinates) => {
    try {
      const coords = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;
      const params = new URLSearchParams({
        geometries: "geojson",
        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      });
      const response = await fetch(
        `${import.meta.env.VITE_MAPBOX_DIRECTIONS_URL}/${coords}?${params}`
      );
      const data = await response.json();

      if (data.routes) {
        set({ directions: data.routes[0].geometry });
      }
    } catch (error) {
      handleAxiosError(error);
    }
  },
}));

export default evStationStore;
