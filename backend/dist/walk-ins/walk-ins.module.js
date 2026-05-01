"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalkInsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const walk_in_entity_1 = require("./walk-in.entity");
const walk_ins_controller_1 = require("./walk-ins.controller");
const walk_ins_service_1 = require("./walk-ins.service");
let WalkInsModule = class WalkInsModule {
};
exports.WalkInsModule = WalkInsModule;
exports.WalkInsModule = WalkInsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([walk_in_entity_1.WalkInEntity]), auth_module_1.AuthModule],
        controllers: [walk_ins_controller_1.WalkInsController],
        providers: [walk_ins_service_1.WalkInsService],
    })
], WalkInsModule);
//# sourceMappingURL=walk-ins.module.js.map