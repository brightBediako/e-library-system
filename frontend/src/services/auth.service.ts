import { AxiosError } from "axios";
import { isMockDataEnabled } from "@/config/mock-mode";
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

const mockPresentationUsers: Array<AuthUser & { password: string }> = [
  {
    id: "mock-user-001",
    email: "admin@institution.edu",
    fullName: "Admin User",
    role: "admin",
    password: "Pass123!",
  },
  {
    id: "mock-user-002",
    email: "librarian@institution.edu",
    fullName: "Librarian User",
    role: "librarian",
    password: "Pass123!",
  },
  {
    id: "mock-user-003",
    email: "student@institution.edu",
    fullName: "Student User",
    role: "student",
    password: "Pass123!",
  },
];

export const login = async ({ email, password }: LoginPayload): Promise<LoginResponse> => {
  if (!email.trim()) {
    throw new Error("Email and password are required.");
  }

  if (isMockDataEnabled) {
    const normalizedEmail = email.trim().toLowerCase();
    const resolvedPassword = password.trim() || "Pass123!";
    const mockUser = mockPresentationUsers.find(
      (candidate) => candidate.email === normalizedEmail && candidate.password === resolvedPassword,
    );

    if (!mockUser) {
      throw new Error("Invalid email or password. Use Pass123! for demo accounts.");
    }

    return {
      token: `mock-token-${mockUser.role}-${Date.now()}`,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        fullName: mockUser.fullName,
        role: mockUser.role,
      },
    };
  }

  if (!password.trim()) {
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
