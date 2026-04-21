import { AxiosError } from "axios";
import { apiClient } from "@/services/api-client";
import type { AuthUser, UserRole } from "@/store/auth-store";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

interface LoginApiResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
  };
}

export const login = async ({ email, password }: LoginPayload): Promise<LoginResponse> => {
  if (!email.trim() || !password.trim()) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await apiClient.post<LoginApiResponse>("/auth/login", {
      email: email.trim().toLowerCase(),
      password,
    });

    return {
      token: response.data.access_token,
      user: response.data.user,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = (error.response?.data as { message?: string } | undefined)?.message;
      throw new Error(message ?? "Login request failed.");
    }

    throw error;
  }
};
