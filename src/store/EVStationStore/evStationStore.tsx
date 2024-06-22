import { createStore } from "zustand";
import { ConnectorDetail, EVStation } from "../../interfaces/EVStation";
import { handleAxiosError } from "../../utils/errorParsing";
import PaymentTransaction from "../../interfaces/Transactions";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { Coordinates } from "../../interfaces/Coordinates";
import accountStore from "../UserStore/accountStore";
import { Option } from "../../interfaces/OptionsData";
import { AddEVStationDTO } from "../../interfaces/AddEVStation";
import { stations } from "../../utils/mock";
import { FilterValues } from "../../interfaces/FilterValues";

export interface EVStationStore {
  evStations: EVStation[];
  evStationsToView: EVStation[];
  selectedConnector: ConnectorDetail | null;
  transactions: PaymentTransaction[] | [];
  directions: any;
  connectorTypes: Option[];
  brands: Option[];

  getEVStation: () => void;
  setSelectedConnector: (selectedConnector: ConnectorDetail) => void;
  addEVStation: (evStationToAdd: AddEVStationDTO) => void;
  getTransactions: () => void;
  getConnectorTypes: () => void;
  getBrands: () => void;
  deleteEVStation: (stationID: number) => void;
  makePayment: (stripeAccountId: string) => void;
  getDirectionToStation: (start: Coordinates, end: Coordinates) => void;
  clearFilters: () => void;
  filterEVStations: (values: FilterValues | null) => void;
}

const evStationStore = createStore<EVStationStore>((set) => ({
  evStations: [],
  evStationsToView: [],
  selectedConnector: null,
  connectorTypes: [],
  brands: [],
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
      set({ evStationsToView: response.data });
      evStationStore.getState().getBrands();
    } catch (error) {
      //handleAxiosError(error);
      const mockStations = stations as EVStation[];
      set({ evStations: mockStations });
      set({ evStationsToView: mockStations });
    }
  },

  setSelectedConnector: (selectedConnector: ConnectorDetail) => {
    set({ selectedConnector: selectedConnector });
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

  filterEVStations: (values: FilterValues | null) => {
    const applyFilters = (station: EVStation, filters: FilterValues | null) => {
      if (filters?.connectorType) {
        const hasConnectorType = station.connectorDetails.some(
          (detail: ConnectorDetail) =>
            detail.connectorType === filters.connectorType
        );
        if (!hasConnectorType) return false;
      }

      if (filters?.brand) {
        if (station.brand !== filters.brand) return false;
      }

      if (filters?.distance) {
        console.log(filters?.distance);
        if (station.distance > parseFloat(filters.distance)) return false;
      }

      if (filters?.showNearMe) {
        const nearMeDistanceThreshold = 4;

        if (station.distance > nearMeDistanceThreshold) {
          return false;
        }
      }

      return true;
    };

    console.log(values);

    const filteredStations = evStationStore
      .getState()
      .evStations.filter((station) => applyFilters(station, values));

    set({ evStationsToView: filteredStations });
  },

  clearFilters: () => {
    const evStationsInitialState = evStationStore.getState().evStations;
    set({ evStationsToView: evStationsInitialState });
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

  getBrands: () => {
    const availableBrands = evStationStore
      .getState()
      .evStations.map((station) => station.brand);

    const uniqueBrands = Array.from(new Set(availableBrands));

    const brands: Option[] = uniqueBrands.map((brand, index) => ({
      id: index + 1, // Assuming id starts from 1
      description: brand,
    }));

    set({ brands: brands });
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
