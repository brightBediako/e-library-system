import { apiClient } from "@/services/api-client";
import { isMockDataEnabled } from "@/config/mock-mode";
import { mockCatalogBooks } from "@/features/library/mock-books";
import { mockBorrowedBooks } from "@/features/borrow/mock-borrowed-books";

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
  if (isMockDataEnabled) {
    return mockBorrowedBooks.map((borrow, index) => {
      const linkedBook = mockCatalogBooks[index % mockCatalogBooks.length];
      const borrowedAt = new Date(borrow.borrowedOn).toISOString();
      const dueDate = new Date(borrow.dueDate).toISOString();

      return {
        id: borrow.id,
        userId: "mock-user-1",
        bookId: linkedBook.id,
        borrowedAt,
        dueDate,
        returnedAt: null,
        status: "active",
        createdAt: borrowedAt,
        updatedAt: dueDate,
      };
    });
  }

  const response = await apiClient.get<BorrowApiRecord[]>("/borrow");
  return response.data;
};
