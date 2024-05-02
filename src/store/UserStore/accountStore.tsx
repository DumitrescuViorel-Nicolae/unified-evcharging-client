import { createStore } from "zustand";
import { UserState } from "../../interfaces/User";

export interface AccountStore {
  user: UserState;
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
