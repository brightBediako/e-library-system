import { apiClient } from "@/services/api-client";
import { isMockDataEnabled } from "@/config/mock-mode";

export interface CreateLibrarianPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface CreateLibrarianResponse {
  id: string;
  fullName: string;
  email: string;
}

export const createLibrarian = async (
  payload: CreateLibrarianPayload,
): Promise<CreateLibrarianResponse> => {
  if (isMockDataEnabled) {
    return {
      id: `mock-librarian-${Date.now()}`,
      fullName: payload.fullName,
      email: payload.email,
    };
  }

  const response = await apiClient.post<CreateLibrarianResponse>("/users/librarians", payload);
  return response.data;
};
