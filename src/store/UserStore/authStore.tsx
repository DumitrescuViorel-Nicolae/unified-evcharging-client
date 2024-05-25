import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createStore } from "zustand";
import { GeneralResponse } from "../../interfaces/GeneralResponse";
import axiosBasic from "../../axios/axiosBasic";
import { handleAxiosError } from "../../utils/errorParsing";
import accountStore from "./accountStore";
import { RegistrationFormData } from "../../interfaces/RegistrationFormData ";
import appStateStore from "../CommonStore/appStateStore";

interface AuthState {
  token: string | null;
  userMail: string;
}

interface AuthActions {
  isLoggedIn: boolean;
  registerSucceeded: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (user: RegistrationFormData) => Promise<void>;
}

const authStore = createStore<AuthState & AuthActions>((set) => ({
  registerSucceeded: false,
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
      handleAxiosError(error);
    }
  },

  register: async (registrationData: RegistrationFormData) => {
    try {
      const response = await axiosBasic.post("/Auth/register", {
        ...registrationData,
      });
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
}));

export default authStore;
