import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
 } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";

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

  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const tokenLS = localStorage.getItem("@amigos_society_token");
      const usernameLS = localStorage.getItem("@amigos_society_username");
      const tokenParse = tokenLS ? JSON.parse(tokenLS) : "";
      const usernameParse = usernameLS ? JSON.parse(usernameLS) : "";

      if (tokenParse) {
        try {
          await api.get("/auth/check-user", {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          });

          api.defaults.headers.common["Authorization"] = `Bearer ${tokenParse}`;

          setIsAuthenticated(true);
          setUsername(usernameParse);

          navigate("/matches");
        } catch (error: any) {
          toast.error(error?.response?.data?.error);

          navigate("/authentication");

          localStorage.removeItem("@amigos_society_token");
          localStorage.removeItem("@amigos_society_username");
        }
      }
    }

    checkUser();
  }, []);

  async function onLogin(body: IBodyAuthProps) {
    try {
      const response: AxiosResponse<IResponseProps> = await api
        .post("/auth/log-in", body);

      const { user, token } = response.data;

      localStorage.setItem("@amigos_society_token", JSON.stringify(token));
      localStorage.setItem("@amigos_society_username", JSON.stringify(user.username));

      api.defaults.headers
        .common["Authorization"] = `Bearer ${token}`;

      setUsername(user.username);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || error?.msessage);
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
