import { apiClient } from "@/services/api-client";
import { isMockDataEnabled } from "@/config/mock-mode";
import { mockCatalogBooks } from "@/features/library/mock-books";

export type BookType = "physical" | "digital";

export interface CreateBookPayload {
  title: string;
  author: string;
  isbn: string;
  bookType: BookType;
  storage: string;
}

export interface CreateBookResponse {
  id: string;
  title: string;
  author: string;
  isbn: string;
  bookType: BookType;
  storage: string;
}

export interface BookApiRecord {
  id: string;
  title: string;
  author: string;
  isbn: string;
  bookType: BookType;
  storage: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchBooks = async (): Promise<BookApiRecord[]> => {
  if (isMockDataEnabled) {
    return mockCatalogBooks.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      bookType: book.classification.toLowerCase().includes("digital") ? "digital" : "physical",
      storage: "Presentation Shelf",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  const response = await apiClient.get<BookApiRecord[]>("/books");
  return response.data;
};

export const createBook = async (payload: CreateBookPayload): Promise<CreateBookResponse> => {
  if (isMockDataEnabled) {
    return {
      id: `mock-book-${Date.now()}`,
      title: payload.title,
      author: payload.author,
      isbn: payload.isbn,
      bookType: payload.bookType,
      storage: payload.storage,
    };
  }

  const response = await apiClient.post<CreateBookResponse>("/books", payload);
  return response.data;
};
