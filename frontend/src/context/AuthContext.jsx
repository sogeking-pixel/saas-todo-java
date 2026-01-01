import React, { createContext, useContext, useState, useEffect } from "react";
import { getRoute } from "../routes/routesConfig";
import 
{
  saveTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken
} from "../utils/jwt";
import {getMe, postLogin, postLogout, postRegister} from "../api/apiAuth";

export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
   
    try {
      const res = await postLogin(credentials);
      const { accessToken, refreshToken } = res.data;
      saveTokens(accessToken, refreshToken);
      getMe()
        .then((res) => {
          setUser(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
      return { success: true };
    }
    catch (error) {
      console.error("Error al iniciar sesión:", error);
      clearTokens();
      return { success: false, message: error.response?.data?.detail || "Error al iniciar sesión." };
    }
  };

  const logout = async () => {

    setLoading(true);
    try {
      await postLogout({ refresh: getRefreshToken() });
    }
    catch(err) {
      console.error('error'+err)
    }
    finally {
      clearTokens();
      setUser(null);
      setLoading(false);
      window.location.href = getRoute("login").path;
    }    
    
  };

  const register = async (userData) => {
    try {
      const res = await postRegister(userData);
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Error al registrar:", error);
      return { success: false, message: error.response?.data?.detail || "Error al registrar." };
    } 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout , register }}>
      {children}
    </AuthContext.Provider>
  );
}