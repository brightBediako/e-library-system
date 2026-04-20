import { create } from "zustand";

export type UserRole = "admin" | "librarian" | "student";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (payload: { user: AuthUser; token: string }) => void;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: ({ user, token }) => {
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },
  setUser: (user) => {
    set((state) => ({
      user,
      isAuthenticated: Boolean(user && state.token),
    }));
  },
  setToken: (token) => {
    set((state) => ({
      token,
      isAuthenticated: Boolean(state.user && token),
    }));
  },
  clearAuth: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
