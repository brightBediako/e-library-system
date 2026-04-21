export type UserRole = 'admin' | 'librarian' | 'student';
export declare class UserEntity {
    id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
