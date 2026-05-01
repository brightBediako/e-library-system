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
exports.UpgradeLegacyAdminPasswordToBcrypt1776690200000 = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const LEGACY_SHA256_ADMIN = '46708f23d682fef9aa996ecbb139bfb6c9ffdc039905ad6ad5c85a88b9411d97';
class UpgradeLegacyAdminPasswordToBcrypt1776690200000 {
    name = 'UpgradeLegacyAdminPasswordToBcrypt1776690200000';
    async up(queryRunner) {
        const bcryptHash = await bcrypt.hash('Pass123!', 10);
        await queryRunner.query(`
      UPDATE users
      SET password_hash = $1, updated_at = now()
      WHERE email = $2 AND password_hash = $3
    `, [bcryptHash, 'admin@institution.edu', LEGACY_SHA256_ADMIN]);
    }
    async down(_queryRunner) {
    }
}
exports.UpgradeLegacyAdminPasswordToBcrypt1776690200000 = UpgradeLegacyAdminPasswordToBcrypt1776690200000;
//# sourceMappingURL=1776690200000-UpgradeLegacyAdminPasswordToBcrypt.js.map