"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../books/book.entity");
const borrow_entity_1 = require("../borrow/borrow.entity");
const digital_resource_entity_1 = require("../resources/digital-resource.entity");
const user_entity_1 = require("../users/user.entity");
const walk_in_entity_1 = require("../walk-ins/walk-in.entity");
(0, dotenv_1.config)();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'elibraryDB',
    entities: [
        user_entity_1.UserEntity,
        book_entity_1.BookEntity,
        borrow_entity_1.BorrowEntity,
        digital_resource_entity_1.DigitalResourceEntity,
        walk_in_entity_1.WalkInEntity,
    ],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
});
//# sourceMappingURL=typeorm.config.js.map