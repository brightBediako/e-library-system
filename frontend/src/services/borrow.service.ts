import { apiClient } from "@/services/api-client";

export type BorrowStatus = "active" | "returned" | "overdue";

export interface BorrowApiRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt: string | null;
  status: BorrowStatus;
  createdAt: string;
  updatedAt: string;
}

export const fetchBorrows = async (): Promise<BorrowApiRecord[]> => {
  const response = await apiClient.get<BorrowApiRecord[]>("/borrow");
  return response.data;
};
