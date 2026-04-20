import type { AuthUser, UserRole } from "@/store/auth-store";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

const roleMap: Record<string, UserRole> = {
  admin: "admin",
  librarian: "librarian",
  student: "student",
};

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const deriveRoleFromEmail = (email: string): UserRole => {
  const localPart = email.split("@")[0]?.toLowerCase() ?? "";

  if (localPart in roleMap) {
    return roleMap[localPart];
  }

  return "student";
};

export const mockLogin = async ({ email, password }: LoginPayload): Promise<LoginResponse> => {
  await wait(700);

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const fullName = normalizedEmail.split("@")[0]?.replace(".", " ") ?? "Library User";
  const role = deriveRoleFromEmail(normalizedEmail);

  return {
    token: `mock-jwt-token-${Date.now()}`,
    user: {
      id: "user-001",
      email: normalizedEmail,
      fullName,
      role,
    },
  };
};
