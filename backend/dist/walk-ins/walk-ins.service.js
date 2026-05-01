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
exports.WalkInsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_crypto_1 = require("node:crypto");
const typeorm_2 = require("typeorm");
const walk_in_entity_1 = require("./walk-in.entity");
let WalkInsService = class WalkInsService {
    walkInsRepository;
    constructor(walkInsRepository) {
        this.walkInsRepository = walkInsRepository;
    }
    getWalkIns() {
        return this.walkInsRepository.find({
            order: { timeIn: 'DESC' },
        });
    }
    async checkIn(payload) {
        const studentName = payload.studentName.trim();
        const indexNo = payload.indexNo.trim().toUpperCase();
        const className = payload.className.trim();
        if (!studentName || !indexNo || !className) {
            throw new common_1.BadRequestException('studentName, indexNo and className are required.');
        }
        const existingActiveEntry = await this.walkInsRepository.findOne({
            where: {
                indexNo,
                timeOut: (0, typeorm_2.IsNull)(),
            },
        });
        if (existingActiveEntry) {
            throw new common_1.BadRequestException('Student already has an active walk-in session.');
        }
        const walkIn = this.walkInsRepository.create({
            id: (0, node_crypto_1.randomUUID)(),
            studentName,
            indexNo,
            className,
            timeIn: new Date(),
            timeOut: null,
        });
        return this.walkInsRepository.save(walkIn);
    }
    async checkOut(id) {
        const walkIn = await this.walkInsRepository.findOneBy({ id });
        if (!walkIn) {
            throw new common_1.NotFoundException('Walk-in record not found.');
        }
        if (walkIn.timeOut) {
            throw new common_1.BadRequestException('Student already checked out.');
        }
        walkIn.timeOut = new Date();
        return this.walkInsRepository.save(walkIn);
    }
};
exports.WalkInsService = WalkInsService;
exports.WalkInsService = WalkInsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(walk_in_entity_1.WalkInEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WalkInsService);
//# sourceMappingURL=walk-ins.service.js.map