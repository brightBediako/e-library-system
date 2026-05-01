import { apiClient } from "@/services/api-client";

/** Mirrors backend: restricted resources reject download intent on the API. */
export type ResourceAccessTag = "standard" | "restricted";

export interface ResourceApiRecord {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: string;
  accessTag: ResourceAccessTag;
}

export interface UploadResourceResponse {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  accessTag: ResourceAccessTag;
  path: string;
}

export const fetchResources = async (): Promise<ResourceApiRecord[]> => {
  const response = await apiClient.get<ResourceApiRecord[]>("/resources");
  return response.data;
};

/**
 * Fetches file bytes with Bearer auth. Use intent `view` for in-app viewing; `download` may return 403 for restricted tags.
 */
export const fetchResourceBlob = async (
  resourcePath: string,
  intent: "view" | "download" = "view",
): Promise<Blob> => {
  const sep = resourcePath.includes("?") ? "&" : "?";
  const url = `${resourcePath}${sep}intent=${encodeURIComponent(intent)}`;
  const response = await apiClient.get(url, { responseType: "blob" });
  return response.data as Blob;
};

export const uploadResource = async (
  file: File,
  accessTag: ResourceAccessTag,
): Promise<UploadResourceResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("accessTag", accessTag);

  const response = await apiClient.post<UploadResourceResponse>("/resources/upload", formData);
  return response.data;
};
