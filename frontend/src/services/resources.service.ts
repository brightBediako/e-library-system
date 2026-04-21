import { apiClient } from "@/services/api-client";
import { isMockDataEnabled } from "@/config/mock-mode";
import { mockResources } from "@/features/resources/mock-resources";

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
  if (isMockDataEnabled) {
    return mockResources.map((resource, index) => ({
      id: resource.id,
      filename: resource.title,
      originalName: resource.title,
      mimetype: resource.label.toLowerCase().includes("pdf") ? "application/pdf" : "application/octet-stream",
      size: 100000 + index * 1000,
      path: `/mock/resources/${resource.id}`,
      uploadedAt: new Date(Date.now() - index * 86400000).toISOString(),
    }));
  }

  const response = await apiClient.get<ResourceApiRecord[]>("/resources");
  return response.data;
};
