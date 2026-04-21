"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHashService = void 0;
exports.isBcryptHash = isBcryptHash;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const node_crypto_1 = require("node:crypto");
const BCRYPT_ROUNDS = 10;
function isBcryptHash(stored) {
    return (stored.startsWith('$2a$') ||
        stored.startsWith('$2b$') ||
        stored.startsWith('$2y$'));
}
let PasswordHashService = class PasswordHashService {
    async hashPassword(plain) {
        return bcrypt.hash(plain, BCRYPT_ROUNDS);
    }
    async verifyAndMaybeUpgrade(plain, storedHash) {
        if (isBcryptHash(storedHash)) {
            const valid = await bcrypt.compare(plain, storedHash);
            return { valid };
        }
        const legacyHex = (0, node_crypto_1.createHash)('sha256').update(plain).digest('hex');
        if (legacyHex === storedHash) {
            const upgradedHash = await bcrypt.hash(plain, BCRYPT_ROUNDS);
            return { valid: true, upgradedHash };
        }
        return { valid: false };
    }
};
exports.PasswordHashService = PasswordHashService;
exports.PasswordHashService = PasswordHashService = __decorate([
    (0, common_1.Injectable)()
], PasswordHashService);
//# sourceMappingURL=password-hash.service.js.map