import axios from "axios";
import { toast } from "react-toastify";
import { createStore } from "zustand";
import { User } from "../../interfaces/User";
import { GeneralResponse } from "../../interfaces/GeneralResponse";
import axiosBasic from "../../axios/axiosBasic";

interface AuthState {
  token: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (user: User) => Promise<void>;
}

const authStore = createStore<AuthState & AuthActions>((set) => ({
  token: null,

  login: async (email: string, password: string) => {
    let response: GeneralResponse<string> = {
      Success: false,
      Message: "",
      Data: null,
    };
    try {
      response = await axiosBasic.post("/Auth/login", { email, password });
      //the if block has no sense
      //need to catch the axios error
      if (response.Success) {
        const token = response.Data;
        set({ token });
      } else {
        console.log(response);
        toast.error(`Login failed - ${response.Message}`);
      }
    } catch (error) {
      const errorData = error.response.data.errors;
      // Check if the error response contains specific keys (e.g., "Email")
      Object.keys(errorData).forEach((key) => {
        const errorMessage = errorData[key].join(" "); // Combine multiple error messages into one string
        console.error(`${key} Error:`, errorMessage);
        // Display the error message to the user
        toast.error(errorMessage);
      });
    }
  },

  register: async (user: User) => {
    try {
      const response = await axios.post("/register", { user });
      if (response.data.Succeeded) {
        toast.success("User registered!");
      }
    } catch (error) {
      toast.error("Registering failed!");
    }
  },
}));

export default authStore;
