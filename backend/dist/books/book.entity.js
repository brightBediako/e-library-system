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
exports.BookEntity = void 0;
const typeorm_1 = require("typeorm");
let BookEntity = class BookEntity {
    id;
    title;
    author;
    isbn;
    bookType;
    storage;
    createdAt;
    updatedAt;
};
exports.BookEntity = BookEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 40 }),
    __metadata("design:type", String)
], BookEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], BookEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], BookEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, unique: true }),
    __metadata("design:type", String)
], BookEntity.prototype, "isbn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'book_type', type: 'varchar', length: 20, default: 'physical' }),
    __metadata("design:type", String)
], BookEntity.prototype, "bookType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BookEntity.prototype, "storage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], BookEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], BookEntity.prototype, "updatedAt", void 0);
exports.BookEntity = BookEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'books' })
], BookEntity);
//# sourceMappingURL=book.entity.js.map