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

  const updateUserField = async (userId, fieldName, fieldValue) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const updatedUser = await client.service("users").patch(
        userId,
        {
          [fieldName]: fieldValue,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setUser((prevUser) => ({ ...prevUser, [fieldName]: fieldValue }));
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Error updating user field:", error);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    const response = await client.service("users").patch(
      user.user_id,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("Password changed successfully", response);
    await fetchUserData(user.user_id);
  };

  const createPassword = async (newPassword) => {
    try {
      const response = await client.service("users").patch(
        user.user_id,
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Password created successfully", response);
      await fetchUserData(user.user_id);
    } catch (error) {
      console.error("Error creating password:", error);
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
      value={{
        isLoggedIn,
        user,
        login,
        googleLogin,
        logout,
        updateUserField,
        changePassword,
        createPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
