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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(service, appService) {
        this.service = service;
        this.appService = appService;
    }
    async users(req) {
        const getUsers = await this.service.getMany();
        if (getUsers)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                title: 'Usuários',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                Users: getUsers
            };
        throw new common_1.HttpException('Não há dados', common_1.HttpStatus.NO_CONTENT);
    }
    async profile(req, id) {
        const user = await this.service.getOne(id);
        if (user)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                title: 'Perfil',
                User: user
            };
        throw new common_1.HttpException('O usuário com este id não existe', common_1.HttpStatus.NOT_FOUND);
    }
    async add(req) {
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            id: this.appService.getCookie(req.headers.cookie, 'id'),
            title: 'Novo usuário',
        };
    }
    async createUser(req, res, data) {
        const newUser = await this.service.create(data);
        if (newUser) {
            res.status(common_1.HttpStatus.PERMANENT_REDIRECT).redirect('/user');
        }
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            cookie: this.appService.getCookie(req.headers.cookie),
            Users: newUser
        };
    }
    async deleteUser(res, id) {
        const deleteUser = await this.service.delete(id);
        if (deleteUser) {
            return res.status(common_1.HttpStatus.PERMANENT_REDIRECT).redirect('/user');
        }
    }
    async alterUser(res, data, id) {
        const altertUser = await this.service.update({
            data: Object.assign({}, data),
            where: { id: Number(id) },
        });
        if (altertUser) {
            res.status(common_1.HttpStatus.PERMANENT_REDIRECT).redirect('/user');
        }
    }
};
__decorate([
    common_1.Get(),
    common_1.Render('pages/user/list'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "users", null);
__decorate([
    common_1.Post('/profile'),
    common_1.HttpCode(200),
    common_1.Render('pages/user/profile'),
    __param(0, common_1.Req()), __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "profile", null);
__decorate([
    common_1.Get('/add'),
    common_1.Render('pages/user/create'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "add", null);
__decorate([
    common_1.Post('/'),
    common_1.Render('pages/user/list'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Post('/delete'),
    common_1.HttpCode(200),
    __param(0, common_1.Res()), __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('/alter/:id'),
    common_1.HttpCode(200),
    __param(0, common_1.Res()), __param(1, common_1.Body()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "alterUser", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        app_service_1.AppService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map