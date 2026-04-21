import { apiClient } from "@/services/api-client";

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
  const response = await apiClient.get<BookApiRecord[]>("/books");
  return response.data;
};

export const createBook = async (payload: CreateBookPayload): Promise<CreateBookResponse> => {
  const response = await apiClient.post<CreateBookResponse>("/books", payload);
  return response.data;
};
