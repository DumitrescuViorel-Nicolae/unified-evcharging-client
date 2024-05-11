import { createStore } from "zustand";
import { User, UserState } from "../../interfaces/User";
import axiosInstance from "../../axios/axiosInstance";
import { handleAxiosError } from "../../utils/errorParsing";

export interface AccountStore {
  user: User;
  getUser: (email: string) => void;
  setUser: (user: Partial<UserState>) => void;
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
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  getUser: async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/Account/getAccount?email=${email}`
      );
      const user = response.data;
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
