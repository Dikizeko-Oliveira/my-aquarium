import React, { createContext, useCallback, useState, useContext } from "react";
import { AsyncStorageSaveItem, AsyncStorageGetItem, AsyncStorageRemoveItem, AsyncStorageRemoveAll } from "../../utils/asyncStorage";

import api from "../api/index";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    
    let user;
    let token;
    
    const GetDatas = async () =>{
      user = await AsyncStorageGetItem("@Guita:user");
      token = await AsyncStorageGetItem("@Guita:token");
    }
    
    GetDatas();
    
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(async () => {
    await AsyncStorageRemoveAll()
    setData({} as AuthState);
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorageSaveItem("@Guita:user", JSON.stringify(user));
    await AsyncStorageSaveItem("@Guita:token", token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
    
  };

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorageSaveItem("@Guita:user", JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an authProvider");
  }

  return context;
}
