import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
