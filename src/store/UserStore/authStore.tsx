import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createStore } from "zustand";
import { User } from "../../interfaces/User";
import {
  ErrorResponse,
  GeneralResponse,
} from "../../interfaces/GeneralResponse";
import axiosBasic from "../../axios/axiosBasic";
import { handleAxiosError } from "../../utils/errorParsing";
import accountStore from "./accountStore";

interface AuthState {
  token: string | null;
  userMail: string;
}

interface AuthActions {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (user: User) => Promise<void>;
}

const authStore = createStore<AuthState & AuthActions>((set) => ({
  token: null,
  isLoggedIn: false,
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
  userMail: "",

  login: async (email: string, password: string) => {
    let response: AxiosResponse<GeneralResponse<string>>;
    try {
      response = await axiosBasic.post("/Auth/login", { email, password });
      const { data } = response.data;
      set({ token: data });
      set({ isLoggedIn: true });
      set({ userMail: email });
      accountStore.getState().getUser(email);
      toast.success("Logged in successfull!");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      handleAxiosError(axiosError);
    }
  },

  register: async (user: User) => {
    try {
      const response = await axios.post("/register", { user });
      if (response.data.Succeeded) {
        toast.success("User registered!");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      handleAxiosError(axiosError);
    }
  },
}));

export default authStore;
