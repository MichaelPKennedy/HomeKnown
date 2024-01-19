import React, { createContext, useState, useEffect } from "react";
import client from "./feathersClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await client.service("users").get(userId);
        setUser(response);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        logout();
      }
    };

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetchUserData(userId);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userData.user_id);
    setIsLoggedIn(true);
    setUser(userData);
    console.log("logged in");
    console.log("userData", userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
