import React, { createContext, useContext, useMemo, useReducer } from "react";

interface AuthState {
  token: string | null;
}

interface AuthContextType extends AuthState {
  setToken: (newToken: string) => void;
  clearToken: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACTIONS = {
  setToken: "setToken",
  clearToken: "clearToken",
};

const authReducer = (
  state: AuthState,
  action: { type: string; payload?: string }
) => {
  switch (action.type) {
    case ACTIONS.setToken:
      localStorage.setItem("token", action.payload || "");
      return { ...state, token: action.payload || "" };

    case ACTIONS.clearToken:
      localStorage.removeItem("token");
      return { ...state, token: null };

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      );
      return state;
  }
};

const initialData: AuthState = {
  token: localStorage.getItem("token"),
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialData);

  const setToken = (newToken: string) => {
    dispatch({ type: ACTIONS.setToken, payload: newToken });
  };

  const clearToken = () => {
    dispatch({ type: ACTIONS.clearToken });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      setToken,
      clearToken,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
