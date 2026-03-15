import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser  = localStorage.getItem("user");

    if (savedToken && savedUser) {
      // Load from localStorage instantly
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setLoading(false);
    } else if (savedToken) {
      // Fetch user from API
      api.get("/auth/me")
        .then(res => {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token: tk, user: u } = res.data;

    // Save both token and user to localStorage
    localStorage.setItem("token", tk);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(tk);
    setUser(u);
    return u;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post("/auth/register", { name, email, password, role });
    const { token: tk, user: u } = res.data;

    // Save both token and user to localStorage
    localStorage.setItem("token", tk);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(tk);
    setUser(u);
    return u;
  };

  const logout = () => {
    // Clear everything from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);