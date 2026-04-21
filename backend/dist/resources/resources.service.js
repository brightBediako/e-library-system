"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let ResourcesService = class ResourcesService {
    uploadDir = (0, path_1.join)(process.cwd(), 'uploads', 'resources');
    async ensureUploadDirectory() {
        await fs_1.promises.mkdir(this.uploadDir, { recursive: true });
    }
    getUploadDirectory() {
        return this.uploadDir;
    }
    getPublicPath(filename) {
        return `/uploads/resources/${filename}`;
    }
    async getResources() {
        await this.ensureUploadDirectory();
        const files = await fs_1.promises.readdir(this.uploadDir);
        const items = await Promise.all(files.map(async (filename) => {
            const filePath = (0, path_1.join)(this.uploadDir, filename);
            const stats = await fs_1.promises.stat(filePath);
            return {
                id: filename,
                filename,
                originalName: filename,
                mimetype: 'application/octet-stream',
                size: stats.size,
                path: this.getPublicPath(filename),
                uploadedAt: stats.birthtime.toISOString(),
            };
        }));
        return items.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)()
], ResourcesService);
//# sourceMappingURL=resources.service.js.map