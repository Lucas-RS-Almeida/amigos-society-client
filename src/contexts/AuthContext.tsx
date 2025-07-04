import { createContext, useState, type ReactNode } from "react";
import type { AxiosResponse } from "axios";

import { api } from "../api";

interface IBodyAuthProps {
  name: string;
  password: string;
}

interface IContextProps {
  username: string;
  isAuthenticated: boolean;
  onLogin: (body: IBodyAuthProps) => Promise<void>;
}

interface IAPProps {
  children: ReactNode;
}

interface IResponseProps {
  user: {
    username: string;
  };
  token: string;
}

export const Context = createContext({} as IContextProps);

export function AuthProvider({ children }: IAPProps) {
  const [username, setUsername] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  async function onLogin(body: IBodyAuthProps) {
    try {
      const response: AxiosResponse<IResponseProps> = await api
        .post("/auth/log-in", body);

      api.defaults.headers
        .common["Authorization"] = `Bearer ${response.data.token}`;

      setUsername(response.data.user.username);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error?.response?.data?.error);
    }
  }

  return (
    <Context.Provider value={{
      username,
      isAuthenticated,
      onLogin,
    }}>
      { children }
    </Context.Provider>
  )
}
