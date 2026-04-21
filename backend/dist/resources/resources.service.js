"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_crypto_1 = require("node:crypto");
const typeorm_2 = require("typeorm");
const digital_resource_entity_1 = require("./digital-resource.entity");
let ResourcesService = class ResourcesService {
    digitalResourcesRepository;
    uploadDir = (0, node_path_1.join)(process.cwd(), 'uploads', 'resources');
    constructor(digitalResourcesRepository) {
        this.digitalResourcesRepository = digitalResourcesRepository;
    }
    async ensureUploadDirectory() {
        await node_fs_1.promises.mkdir(this.uploadDir, { recursive: true });
    }
    getUploadDirectory() {
        return this.uploadDir;
    }
    getPublicPath(filename) {
        const safe = this.assertSafeBasename(filename);
        return `/resources/files/${encodeURIComponent(safe)}`;
    }
    assertSafeBasename(filename) {
        const decoded = decodeURIComponent(filename.trim());
        if (!decoded || decoded.includes('..')) {
            throw new common_1.BadRequestException('Invalid filename.');
        }
        if (decoded.includes('/') || decoded.includes('\\')) {
            throw new common_1.BadRequestException('Invalid filename.');
        }
        const base = (0, node_path_1.basename)(decoded);
        if (!base || base !== decoded) {
            throw new common_1.BadRequestException('Invalid filename.');
        }
        return base;
    }
    normalizeAccessTag(raw) {
        const value = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
        if (!value || value === 'standard') {
            return 'standard';
        }
        if (value === 'restricted') {
            return 'restricted';
        }
        throw new common_1.BadRequestException('accessTag must be "standard" or "restricted".');
    }
    async registerUploadedResource(payload) {
        const entity = this.digitalResourcesRepository.create({
            id: (0, node_crypto_1.randomUUID)(),
            storedFilename: payload.storedFilename,
            originalName: payload.originalName.trim() || payload.storedFilename,
            mimetype: payload.mimetype || 'application/octet-stream',
            size: payload.size,
            accessTag: payload.accessTag,
        });
        await this.digitalResourcesRepository.save(entity);
        return entity;
    }
    mimeFromFilename(filename) {
        const ext = (0, node_path_1.extname)(filename).toLowerCase();
        const map = {
            '.pdf': 'application/pdf',
            '.txt': 'text/plain',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.zip': 'application/zip',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        };
        return map[ext] ?? 'application/octet-stream';
    }
    async openReadStream(filename, intent) {
        const safe = this.assertSafeBasename(filename);
        const absolutePath = (0, node_path_1.join)(this.uploadDir, safe);
        try {
            await node_fs_1.promises.access(absolutePath);
        }
        catch {
            throw new common_1.NotFoundException('File not found.');
        }
        const record = await this.digitalResourcesRepository.findOne({
            where: { storedFilename: safe },
        });
        const accessTag = record?.accessTag ?? 'standard';
        if (accessTag === 'restricted' && intent === 'download') {
            throw new common_1.ForbiddenException('This document is restricted: download and copy actions are not permitted.');
        }
        return {
            stream: (0, node_fs_1.createReadStream)(absolutePath),
            mime: record?.mimetype ?? this.mimeFromFilename(safe),
            safeBasename: safe,
            accessTag,
        };
    }
    async getResources() {
        await this.ensureUploadDirectory();
        const records = await this.digitalResourcesRepository.find({
            order: { createdAt: 'DESC' },
        });
        return records.map((row) => ({
            id: row.id,
            filename: row.storedFilename,
            originalName: row.originalName,
            mimetype: row.mimetype,
            size: row.size,
            path: this.getPublicPath(row.storedFilename),
            uploadedAt: row.createdAt.toISOString(),
            accessTag: row.accessTag,
        }));
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(digital_resource_entity_1.DigitalResourceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResourcesService);
//# sourceMappingURL=resources.service.js.map