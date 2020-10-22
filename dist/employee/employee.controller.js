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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const bcrypt = require("bcrypt");
const app_service_1 = require("../app.service");
let EmployeeController = class EmployeeController {
    constructor(service, appService) {
        this.service = service;
        this.appService = appService;
    }
    async employees(req) {
        const getEmployees = await this.service.getMany();
        if (getEmployees)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                title: 'Funcionários',
                Employees: getEmployees
            };
        throw new common_1.HttpException('Não há dados', common_1.HttpStatus.NO_CONTENT);
    }
    async profile(req, id) {
        console.dir(id);
        const employee = await this.service.getOne(id);
        if (employee)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                title: 'Perfil',
                Employee: employee
            };
        throw new common_1.HttpException('O funcionário com este id não existe', common_1.HttpStatus.NOT_FOUND);
    }
    async add(req) {
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            id: this.appService.getCookie(req.headers.cookie, 'id'),
            title: 'Novo Funcionário',
        };
    }
    async createEmployee(req, res, data) {
        const secret = Math.random().toString(36).slice(-10);
        data.secret = bcrypt.hashSync(secret, 10);
        const newEmployee = await this.service.create(data, secret);
        if (newEmployee) {
            res.status(common_1.HttpStatus.PERMANENT_REDIRECT).redirect('/employee');
        }
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            id: this.appService.getCookie(req.headers.cookie, 'id'),
            Employees: newEmployee
        };
    }
    async deleteEmployee(res, id) {
        const deleteEmployee = await this.service.delete(id);
        if (deleteEmployee) {
            return res.status(common_1.HttpStatus.PERMANENT_REDIRECT).redirect('/employee');
        }
    }
    async alterEmployee(res, data, id) {
        data.secret = bcrypt.hashSync(data.secret, 10);
        const altertEmployee = await this.service.update(data, id);
        if (altertEmployee) {
            res.status(common_1.HttpStatus.PERMANENT_REDIRECT).redirect('/employee');
        }
    }
};
__decorate([
    common_1.Get(),
    common_1.Render('pages/employee/list'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "employees", null);
__decorate([
    common_1.Post('/profile'),
    common_1.HttpCode(200),
    common_1.Render('pages/employee/profile'),
    __param(0, common_1.Req()), __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "profile", null);
__decorate([
    common_1.Get('/add'),
    common_1.Render('pages/employee/create'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "add", null);
__decorate([
    common_1.Post('/'),
    common_1.Render('pages/employee/list'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    common_1.Post('/delete'),
    common_1.HttpCode(200),
    __param(0, common_1.Res()), __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployee", null);
__decorate([
    common_1.Post('/alter/:id'),
    common_1.HttpCode(200),
    __param(0, common_1.Res()), __param(1, common_1.Body()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "alterEmployee", null);
EmployeeController = __decorate([
    common_1.Controller('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        app_service_1.AppService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map