import { apiClient } from "@/services/api-client";

export interface WalkInRecord {
  id: string;
  studentName: string;
  indexNo: string;
  className: string;
  timeIn: string;
  timeOut: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CheckInPayload {
  studentName: string;
  indexNo: string;
  className: string;
}

export const fetchWalkIns = async (): Promise<WalkInRecord[]> => {
  const response = await apiClient.get<WalkInRecord[]>("/walk-ins");
  return response.data;
};

export const checkInWalkIn = async (payload: CheckInPayload): Promise<WalkInRecord> => {
  const response = await apiClient.post<WalkInRecord>("/walk-ins/check-in", payload);
  return response.data;
};

export const checkOutWalkIn = async (id: string): Promise<WalkInRecord> => {
  const response = await apiClient.patch<WalkInRecord>(`/walk-ins/${encodeURIComponent(id)}/check-out`);
  return response.data;
};
