import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createStore } from "zustand";
import { GeneralResponse } from "../../interfaces/GeneralResponse";
import axiosBasic from "../../axios/axiosBasic";
import { handleAxiosError } from "../../utils/errorParsing";
import accountStore from "./accountStore";
import { RegistrationFormData } from "../../interfaces/RegistrationFormData";
import appStateStore from "../CommonStore/appStateStore";
import { LoginResponse } from "../../interfaces/LoginResponse";
import axiosInstance from "../../axios/axiosInstance";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userMail: string;
  isLoggedIn: boolean;
  registerSucceeded: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (user: RegistrationFormData) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
  setLoginStatus: () => void;
}

const authStore = createStore<AuthState & AuthActions>((set) => ({
  registerSucceeded: false,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  userMail: "",

  login: async (email: string, password: string) => {
    try {
      const response: AxiosResponse<GeneralResponse<LoginResponse>> =
        await axiosBasic.post("/Auth/login", { email, password });
      const { data } = response.data;
      if (data?.accessToken && data?.refreshToken) {
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          isLoggedIn: true,
          userMail: email,
        });

        sessionStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      accountStore.getState().getUser(email);
      toast.success("Logged in");
    } catch (error) {
      handleAxiosError(error);
    }
  },

  register: async (registrationData: RegistrationFormData) => {
    try {
      const response = await axiosBasic.post(
        "/Auth/register",
        registrationData
      );
      if (response.data.success) {
        toast.success("User registered!");
        appStateStore.getState().setIsAuthModalOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  },

  refreshAccessToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("Please login again");

      const response = await axiosBasic.post("/Auth/refresh", { refreshToken });
      const { data } = response.data;

      sessionStorage.setItem("accessToken", data?.accessToken);
      localStorage.setItem("refreshToken", data?.refreshToken);
      set({
        isLoggedIn: true,
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
      });
    } catch (error) {
      set({ isLoggedIn: false, accessToken: null, refreshToken: null });
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;

      await axiosInstance.post("/Auth/logout", { refreshToken });

      set({ isLoggedIn: false, accessToken: null, refreshToken: null });
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");

      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  },

  setLoginStatus: () => {
    set({ isLoggedIn: true });
  },
}));

export default authStore;
