export declare function isBcryptHash(stored: string): boolean;
export declare class PasswordHashService {
    hashPassword(plain: string): Promise<string>;
    verifyAndMaybeUpgrade(plain: string, storedHash: string): Promise<{
        valid: boolean;
        upgradedHash?: string;
    }>;
}
