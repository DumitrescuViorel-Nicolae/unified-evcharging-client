import { createStore } from "zustand";
import { User } from "../../interfaces/User";
import axiosInstance from "../../axios/axiosInstance";
import { handleAxiosError } from "../../utils/errorParsing";
import appStateStore from "../CommonStore/appStateStore";
import { toast } from "react-toastify";
import { Coordinates } from "../../interfaces/Coordinates";
import { CompanyDetails } from "../../interfaces/RegistrationFormData";

export interface AccountStore {
  user: User;
  wallet: number;
  getUser: (email: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  geolocation: Coordinates | null;
  getGeolocation: () => void;
  company: CompanyDetails | null;
  getCompany: () => void;
  getUserFromLocalStorage: () => User;
}

const accountStore = createStore<AccountStore>((set) => ({
  user: {
    id: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
    loading: false,
    error: null,
  },
  wallet: 0,
  company: null,
  geolocation: null,
  setUser: async (user) => {
    try {
      const currentUser = accountStore.getState().user;
      appStateStore.getState().setIsUpdatingUser(true);
      const updatedUser = {
        ...currentUser,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      console.log(updatedUser);

      const response = await axiosInstance.put("/Account/updateAccount", {
        ...updatedUser,
        password: "",
      });

      if (response.data.success) {
        toast.success(response.data.message);
        set({ user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        toast.error(response.data.message);
      }

      set({
        user: {
          ...currentUser,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      });
    } catch (error) {
      handleAxiosError(error);
    }
  },
  getUser: async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/Account/getAccount?email=${email}`
      );
      const user = response.data.data;

      if (user.id) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      set({ user: user });
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getUserFromLocalStorage: () => {
    if (sessionStorage.getItem("accessToken")) {
      const user = JSON.parse(localStorage.getItem("user") as string);
      set({ user: user });
      return user;
    } else {
      toast.error("Please login again");
    }
  },

  getCompany: async () => {
    try {
      const currentUser = accountStore.getState().user;
      let response;

      if (!currentUser.id) {
        const user = accountStore.getState().getUserFromLocalStorage();
        response = await axiosInstance.get(
          `/EVStation/getCompanyByUserId?id=${user.id}`
        );
      } else {
        response = await axiosInstance.get(
          `/EVStation/getCompanyByUserId?id=${currentUser.id}`
        );
      }
      const companyDetails = response.data.data;
      set({ company: companyDetails });
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getGeolocation: () => {
    const handleLocationSuccess = (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      set({
        geolocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    };

    const handleLocationError = (error: GeolocationPositionError) => {
      toast.error(`Error getting user location: ${error.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Browser does not support geolocation :(");
    }
  },

  clearUser: () => {
    set(() => ({
      user: {
        id: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        role: "",
        loading: false,
        error: null,
      },
    }));
    localStorage.removeItem("user");
  },
}));

export default accountStore;
