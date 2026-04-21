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
exports.BorrowEntity = void 0;
const typeorm_1 = require("typeorm");
let BorrowEntity = class BorrowEntity {
    id;
    userId;
    bookId;
    borrowedAt;
    dueDate;
    returnedAt;
    status;
    createdAt;
    updatedAt;
};
exports.BorrowEntity = BorrowEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 40 }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'varchar', length: 40 }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'book_id', type: 'varchar', length: 40 }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'borrowed_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "borrowedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'returned_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], BorrowEntity.prototype, "returnedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'active' }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "updatedAt", void 0);
exports.BorrowEntity = BorrowEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'borrows' })
], BorrowEntity);
//# sourceMappingURL=borrow.entity.js.map