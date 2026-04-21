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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./book.entity");
let BooksService = class BooksService {
    booksRepository;
    constructor(booksRepository) {
        this.booksRepository = booksRepository;
    }
    getBooks() {
        return this.booksRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async getBookById(id) {
        const book = await this.booksRepository.findOneBy({ id });
        if (!book) {
            throw new common_1.NotFoundException('Book not found.');
        }
        return book;
    }
    async createBook(payload) {
        try {
            const book = this.booksRepository.create({
                id: (0, crypto_1.randomUUID)(),
                title: payload.title.trim(),
                author: payload.author.trim(),
                isbn: payload.isbn.trim(),
                bookType: payload.bookType,
                storage: payload.storage.trim(),
            });
            return await this.booksRepository.save(book);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.code === '23505') {
                throw new common_1.ConflictException('A book with this ISBN already exists.');
            }
            throw error;
        }
    }
    async updateBook(id, payload) {
        const book = await this.getBookById(id);
        if (payload.title !== undefined) {
            book.title = payload.title.trim();
        }
        if (payload.author !== undefined) {
            book.author = payload.author.trim();
        }
        if (payload.isbn !== undefined) {
            book.isbn = payload.isbn.trim();
        }
        if (payload.bookType !== undefined) {
            book.bookType = payload.bookType;
        }
        if (payload.storage !== undefined) {
            book.storage = payload.storage.trim();
        }
        try {
            return await this.booksRepository.save(book);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.code === '23505') {
                throw new common_1.ConflictException('A book with this ISBN already exists.');
            }
            throw error;
        }
    }
    async deleteBook(id) {
        const book = await this.getBookById(id);
        await this.booksRepository.remove(book);
        return {
            id,
            deleted: true,
        };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.BookEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map