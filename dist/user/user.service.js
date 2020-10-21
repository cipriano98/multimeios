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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOne(id) {
        return await this.prisma.user.findOne({
            where: {
                id: Number(id)
            }
        });
    }
    async delete(id) {
        return await this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
    }
    async update(params) {
        const { where, data } = params;
        data.computer === "NONE"
            ? data.online = "OFFLINE"
            : data.online = "ONLINE";
        return await this.prisma.user.update({
            data,
            where
        });
    }
    async getMany() {
        return await this.prisma.user.findMany({
            where: {
                NOT: {
                    role: "ADMIN"
                }
            }
        });
    }
    async create(data) {
        return await this.prisma.user.create({
            data: Object.assign({}, data)
        });
    }
    async getByEmail(email) {
        const getByEmail = await this.prisma.user.findOne({
            where: { email },
        });
        return getByEmail;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map