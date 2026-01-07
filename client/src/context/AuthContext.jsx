import { useState } from "react";
import api from "../utils/axios";
import { createContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const register = async ({ name, email, password }) => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(res.data.user);
      navigate("/chat");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      // localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/chat");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      navigate("/login");
      setUser(null);
    } catch (error) {
      console.log("logout failed", error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user]);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
