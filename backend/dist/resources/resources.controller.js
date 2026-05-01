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
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const node_fs_1 = require("node:fs");
const multer_1 = require("multer");
const node_path_1 = require("node:path");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const resources_service_1 = require("./resources.service");
const RESOURCE_UPLOAD_DIR = (0, node_path_1.join)(process.cwd(), 'uploads', 'resources');
let ResourcesController = class ResourcesController {
    resourcesService;
    constructor(resourcesService) {
        this.resourcesService = resourcesService;
    }
    getResources() {
        return this.resourcesService.getResources();
    }
    async downloadFile(filename, intentRaw, res) {
        const intent = intentRaw?.toLowerCase() === 'download' ? 'download' : 'view';
        const { stream, mime, safeBasename, accessTag } = await this.resourcesService.openReadStream(filename, intent);
        if (accessTag === 'restricted') {
            res.setHeader('Cache-Control', 'private, no-store');
            res.setHeader('X-Resource-Access', 'restricted');
        }
        return new common_1.StreamableFile(stream, {
            type: mime,
            disposition: `inline; filename="${safeBasename.replaceAll('"', '')}"`,
        });
    }
    async uploadResource(file, accessTagRaw) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded. Use multipart/form-data with field "file".');
        }
        const accessTag = this.resourcesService.normalizeAccessTag(accessTagRaw ?? 'standard');
        await this.resourcesService.registerUploadedResource({
            storedFilename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            accessTag,
        });
        return {
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            accessTag,
            path: this.resourcesService.getPublicPath(file.filename),
        };
    }
};
exports.ResourcesController = ResourcesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "getResources", null);
__decorate([
    (0, common_1.Get)('files/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Query)('intent')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'librarian'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, callback) => {
                try {
                    (0, node_fs_1.mkdirSync)(RESOURCE_UPLOAD_DIR, { recursive: true });
                    callback(null, RESOURCE_UPLOAD_DIR);
                }
                catch (error) {
                    callback(error, '');
                }
            },
            filename: (_req, file, callback) => {
                const extension = (0, node_path_1.extname)(file.originalname || '');
                const safeExtension = extension ? extension.toLowerCase() : '.pdf';
                callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`);
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('accessTag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "uploadResource", null);
exports.ResourcesController = ResourcesController = __decorate([
    (0, common_1.Controller)('resources'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [resources_service_1.ResourcesService])
], ResourcesController);
//# sourceMappingURL=resources.controller.js.map