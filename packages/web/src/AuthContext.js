import React, { createContext, useState, useEffect } from "react";
import client, { axiosInstance } from "./feathersClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function setJwtToken(token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const fetchUserData = async (userId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await client.service("users").get(userId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetchUserData(userId);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userData.user_id);
    setJwtToken(token);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const googleLogin = (token, user_id) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", user_id);
    setJwtToken(token);
    fetchUserData(user_id);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
