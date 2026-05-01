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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalkInEntity = void 0;
const typeorm_1 = require("typeorm");
let WalkInEntity = class WalkInEntity {
    id;
    studentName;
    indexNo;
    className;
    timeIn;
    timeOut;
    createdAt;
    updatedAt;
};
exports.WalkInEntity = WalkInEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 40 }),
    __metadata("design:type", String)
], WalkInEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_name', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], WalkInEntity.prototype, "studentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'index_no', type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], WalkInEntity.prototype, "indexNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'class_name', type: 'varchar', length: 80 }),
    __metadata("design:type", String)
], WalkInEntity.prototype, "className", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_in', type: 'timestamp' }),
    __metadata("design:type", Date)
], WalkInEntity.prototype, "timeIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_out', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], WalkInEntity.prototype, "timeOut", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WalkInEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], WalkInEntity.prototype, "updatedAt", void 0);
exports.WalkInEntity = WalkInEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'walk_ins' })
], WalkInEntity);
//# sourceMappingURL=walk-in.entity.js.map