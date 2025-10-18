"use client";

import { createContext, useState, useEffect } from "react";
import { loginService, registerService } from "@/services/auth.service";
import { TUser } from "@/utils/types/user";

interface TAuthContext {
    isAuthenticated: boolean,
    user: TUser | null,
    login: (credentials: FormData) => Promise<void>,
    register: (userData: FormData) => Promise<void>,
    logout: () => Promise<void>
}

export const AuthContext = createContext<TAuthContext>({
    isAuthenticated: false,
    user: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<TUser | null>(null);

    const login = async (credentials: FormData) => {
        const data = await loginService(credentials);
        
        if (data) {
            setUser(data);
            setAuthenticated(true);
        }
    };

    const register = async (userData: FormData) => {
        const data = await registerService(userData);
        
        if (data) {
            setUser(data);
            setAuthenticated(true);
        }
    }

    const logout = async () => {
        // ... logout logic ...
        setUser(null);
        setAuthenticated(false);
    };

    useEffect(() => {
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
          {children}
        </AuthContext.Provider>
    );
}