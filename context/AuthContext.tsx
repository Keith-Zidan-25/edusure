"use client";

import { createContext, useState, useEffect } from "react";
import { loginService, registerService } from "@/services/auth.service";
import { TUser } from "@/utils/types/user";
import { SignUpFormData, TAuthContext } from "@/utils/types/auth";

export const AuthContext = createContext<TAuthContext>({
    isAuthenticated: false,
    user: null,
    loading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<TUser | null>(null);

    const login = async (credentials: SignUpFormData) => {
        const data = await loginService(credentials);
        
        if (data) {
            setUser(data);
            setAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(data));
        }
    };

    const register = async (userData: SignUpFormData) => {
        const data = await registerService(userData);
        
        if (data) {
            setUser(data);
            setAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(data));
        }
    }

    const logout = async () => {
        setUser(null);
        setAuthenticated(false);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
          {children}
        </AuthContext.Provider>
    );
}