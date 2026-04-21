export type BookAvailability = "Available" | "On Loan" | "Reserved";

export interface CatalogBook {
  id: string;
  title: string;
  isbn: string;
  author: string;
  department: string;
  classification: string;
  availability: BookAvailability;
  coverUrl: string;
}

export const mockCatalogBooks: CatalogBook[] = [
  {
    id: "book-1",
    title: "The Architecture of Silence",
    isbn: "978-3-16-148410-0",
    author: "Elena Rostova",
    department: "Fine Arts Dept.",
    classification: "Monograph",
    availability: "Available",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPlbb7rCF8tkJ_2RUV_zFZJJeSV9BSX373-MXyPzGWrKbKTK4a8K_FvcrpCpL-78xatxOF8J6Im1g16fYZV4wwZUn8Qzw8seYmb3HN-aXUMh3_PMfh4DdfjR_9cEetUw0AjrRWcP7tF-n2amCPrqTcnGfSMRsZ3ZcNXVtMt7h3pZllLEEbMMXKqiVGB-Sdiq7fRXdnIkg_-ka23ZA7kKFbLK8EHnYA0lix5jleFa6tvFTbZQaxxWVLntTCOQBC7KlvNt7E4DWE5g",
  },
  {
    id: "book-2",
    title: "Quantum Ethics & Paradox",
    isbn: "978-1-40-289462-6",
    author: "Dr. Julian Vance",
    department: "Theoretical Physics",
    classification: "Research",
    availability: "On Loan",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC26QdB5kBQyEDR4WVop8FvJcMV6zfrIb8Ti1tYzxXb5UTyD_CSQ5bXQ0ejJawBvcUuKF_GHSYt7A7CYQcaWWnWSo3oipgT2HHvFcpg0VoZx3dN59vChNyF5tFUz8AS2-O35ljoSqOihStYQmusCGzxpcXW8n9JIJj9mUAy2uJjeFwX_jlO9v_x5PjAvyYb0TuXLvKqRa6BfyOuNRa1Lhxfwrsk5Wlc5A08gqH2zAumui9xKks_1mvjWpg550HpGPO67OxFxLRXjg",
  },
  {
    id: "book-3",
    title: "Visions of the Levant",
    isbn: "978-0-59-324321-3",
    author: "Amira Al-Farsi",
    department: "Archaeology",
    classification: "Archive",
    availability: "Available",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxZvusRqcN1RErFGAX1w3URSdiACkQYPOw5Fjnowc6ed3NAFalGL6SIK2LDLPbWLnB3llMlAe4hwKT4aAtr9ZkVRE8eq-w7Bd1ffonZg-yjpJfBVmpsr4-EpwuK8PD-pRCSWB8BSIizyM1Qg12JrLIM4UeS0Pr3xvUwVgA3ZMc60H7C1xCO4-u-cMlsDqghFGcPfbS1Zh0zox18dEQ4NY-a5Tqbe_3BKgxFp7Sf-6a0mFkWsI17lc_3ScTm2aHpxaRgWK7peOf0w",
  },
  {
    id: "book-4",
    title: "Neuro-Linguistic Patterns",
    isbn: "978-4-02-124610-8",
    author: "S. Takahashi",
    department: "Cognitive Science",
    classification: "Specialist",
    availability: "Reserved",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOfzZ2tbnyl3m1xgxcowL2I_92DtwWKmVTOthvtzv_Irklhlz-eJdv0nBYxULrWmTUdoWAnVjmjX71572EEZ2NrCWZ5viFdYC8z1sxVRb-7b9HmpYVtMJgXhVsC2C7nxQqmJs9_lnEELU5WMQCh0-RUKj0nWWQYdXuL-OBpqviBm4cCPgZnioh0UlfTI2QkxU5t2U-hihUDNOrNaHZNJB2pQ5iNSc62VgFxyB3-RY_1ecLZVjg6leIYbk3UtMIKSu9EF63uommSA",
  },
];

export const getMockBookById = (id: string): CatalogBook | undefined =>
  mockCatalogBooks.find((book) => book.id === id);
