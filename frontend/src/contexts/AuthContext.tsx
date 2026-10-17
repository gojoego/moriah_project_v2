"use client";

import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { getCurrentUser } from "@/lib/api/users";
import { removeToken } from "@/lib/auth";

import type {
    AuthContextValue,
    CurrentUser,
} from "@/types/auth";

export const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] =
        useState<CurrentUser | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const currentUser = await getCurrentUser();

            setUser(currentUser);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
    }, []);

    useEffect(() => {
        void refreshUser();
    }, [refreshUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: user !== null,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}