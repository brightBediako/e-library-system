import { apiClient } from "@/services/api-client";

export interface PingResponse {
  message: string;
}

export const testPingRequest = async (): Promise<PingResponse> => {
  const response = await apiClient.get<PingResponse>("/ping");
  return response.data;
};
