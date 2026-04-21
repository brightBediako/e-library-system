import { apiClient } from "@/services/api-client";

export interface ResourceApiRecord {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: string;
}

export const fetchResources = async (): Promise<ResourceApiRecord[]> => {
  const response = await apiClient.get<ResourceApiRecord[]>("/resources");
  return response.data;
};
