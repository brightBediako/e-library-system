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
exports.BorrowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("../books/book.entity");
const user_entity_1 = require("../users/user.entity");
const borrow_entity_1 = require("./borrow.entity");
let BorrowService = class BorrowService {
    borrowRepository;
    usersRepository;
    booksRepository;
    constructor(borrowRepository, usersRepository, booksRepository) {
        this.borrowRepository = borrowRepository;
        this.usersRepository = usersRepository;
        this.booksRepository = booksRepository;
    }
    getBorrows() {
        return this.borrowRepository.find({
            order: { borrowedAt: 'DESC' },
        });
    }
    async issueBorrow(payload) {
        const user = await this.usersRepository.findOneBy({ id: payload.userId });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const book = await this.booksRepository.findOneBy({ id: payload.bookId });
        if (!book) {
            throw new common_1.NotFoundException('Book not found.');
        }
        const dueDate = new Date(payload.dueDate);
        if (Number.isNaN(dueDate.getTime())) {
            throw new common_1.BadRequestException('Invalid due date.');
        }
        const existingActiveBorrow = await this.borrowRepository.findOneBy({
            bookId: payload.bookId,
            status: 'active',
        });
        if (existingActiveBorrow) {
            throw new common_1.BadRequestException('Book is already borrowed.');
        }
        const borrow = this.borrowRepository.create({
            id: (0, crypto_1.randomUUID)(),
            userId: payload.userId,
            bookId: payload.bookId,
            borrowedAt: new Date(),
            dueDate,
            returnedAt: null,
            status: 'active',
        });
        return this.borrowRepository.save(borrow);
    }
    async returnBorrow(id) {
        const borrow = await this.borrowRepository.findOneBy({ id });
        if (!borrow) {
            throw new common_1.NotFoundException('Borrow record not found.');
        }
        if (borrow.status === 'returned') {
            throw new common_1.BadRequestException('Book is already returned.');
        }
        borrow.status = 'returned';
        borrow.returnedAt = new Date();
        return this.borrowRepository.save(borrow);
    }
};
exports.BorrowService = BorrowService;
exports.BorrowService = BorrowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(borrow_entity_1.BorrowEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.BookEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BorrowService);
//# sourceMappingURL=borrow.service.js.map