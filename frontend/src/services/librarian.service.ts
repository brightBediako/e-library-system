import { apiClient } from "@/services/api-client";

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
  const response = await apiClient.post<CreateLibrarianResponse>("/users/librarians", payload);
  return response.data;
};
