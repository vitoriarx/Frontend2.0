"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

// Tipos suportados para as roles
type UserRole = "admin" | "secretario";

interface AuthContextData {
  role: UserRole | null;
  token: string | null;
  login: (role: UserRole, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole | null;
    const storedToken = localStorage.getItem("token");
    
    if (storedRole && storedToken) {
      setRole(storedRole);
      setToken(storedToken);
    }
  }, []);

  const login = (newRole: UserRole, newToken: string) => {
    setRole(newRole);
    setToken(newToken);
    localStorage.setItem("userRole", newRole);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ 
      role, 
      token, 
      login, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}