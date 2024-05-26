import { createStore } from "zustand";
import { User, UserState } from "../../interfaces/User";
import axiosInstance from "../../axios/axiosInstance";
import { handleAxiosError } from "../../utils/errorParsing";
import appStateStore from "../CommonStore/appStateStore";
import { toast } from "react-toastify";

export interface AccountStore {
  user: User;
  getUser: (email: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
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
  setUser: async (user) => {
    try {
      const currentUser = accountStore.getState().user;
      appStateStore.getState().setIsUpdatingUser(true);
      const response = await axiosInstance.put("/Account/updateAccount", {
        ...currentUser,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: "",
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      set({ user: user });
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
      set({ user: user });
    } catch (error) {
      handleAxiosError(error);
    }
  },
  clearUser: () =>
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
    })),
}));

export default accountStore;
