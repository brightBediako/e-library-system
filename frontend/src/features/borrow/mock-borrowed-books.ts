export interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  borrowedOn: string;
  dueDate: string;
  coverUrl: string;
}

export const mockBorrowedBooks: BorrowedBook[] = [
  {
    id: "borrow-1",
    title: "The Interpretation of Dreams",
    author: "Sigmund Freud",
    borrowedOn: "Mar 12, 2026",
    dueDate: "Apr 12, 2026",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAF1y9NSB7GqSfuZdWet-090JejCJc-GM9kGDRrHfeYbbctV9tnmWluSz6tU42yS3ZIm7K1QAQsw-1YslWP1_Xvx4GM3sNR4C5dR2nv8Qx-8LI51gPdoI7iIKmOyAEopNOCD-8t-toUEKtDbip34Vf-6r6LxTFckSvIPswQlqL3sG-lB1ytztXCVcMZOT_HvXpBwXZRgGiE9U75aQSmc6LGH7No6FJrDxvZ5o2PFcj32YViWbQGgnxgSh9DBbEtsajLLu8icgrcMA",
  },
  {
    id: "borrow-2",
    title: "Capital in the Twenty-First Century",
    author: "Thomas Piketty",
    borrowedOn: "Apr 01, 2026",
    dueDate: "May 01, 2026",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBD7SqMwsfPhdNRyXEYTuHy7g3WOE--0g2ZcdZGgfaXNVt-g28KH6nEMgmaEQsQoginUT0QTKLQJ-ossx3feFwvpk58X5Vct8VcKbE1c8tDr75y-GN0JoprBgHtSvmOy40Xk9HMHCmnziRUIEQfTD2qxi7X_WNbJi5KfLYoELn8ie09ENhvvVvYB4ymzxcI3q5orOGx1KFF8ePTgv6PFHm4aprW5nZ2ilm14Jr5wjIOj4jNVskUXW15f_02adEpEoBbVSPWYCw8uA",
  },
  {
    id: "borrow-3",
    title: "Orientalism",
    author: "Edward Said",
    borrowedOn: "Feb 20, 2026",
    dueDate: "Apr 08, 2026",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQyJdFrw1vWXulPyk8V0-8pSWmNIV65Tl68vC4L9rcOJTPXL_QxPfknM7dikeNUfqBJmjIho-L_bIluuoJutgSVPop_CaLow1Aq2hfjLj7T3-lFnbiBhdMjOQRoc86EBOOZX9FOZlVrJVmKArerupNcrny2oOIrrYkvioM4dfpxmWwnPpdi6u_6hSH149ME7vggLmnKwJOGVAThwOMdZKLqJMzzRBgwvMmp7voGPoZ1ELJDMYGefDlw03XqkCiIZszyW2-7KwkKg",
  },
  {
    id: "borrow-4",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    borrowedOn: "Apr 10, 2026",
    dueDate: "May 10, 2026",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACIeEqVCCdgi4DFaa819dlpNYpGaQl8ttv2wY-0SLdQGZjYLbdpNk_dVviMvXtSgOrS87QgZAP0GBR4MuOOS1_RU0KxQxsGjeEoprnm5-11lUJS1Zt61GKT4SOwJXYovNSk0zfFQ5WbQqgXAffFjnaHwawwzaUwA3YySWRzokLl1UhCzjtrJfhA_C4KZKpMI6jBWnDA7w-oGZmFOfIMsfMQ-IQ9EzzXqp5HHQMG7b3gdv88IhVo2jNFeu9WP6DsSPfW45kEyKIsw",
  },
];
