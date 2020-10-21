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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const employee_service_1 = require("../employee/employee.service");
let AuthController = class AuthController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async signup(res, data) {
        data.secret = bcrypt.hashSync(data.secret, 10);
        const Employee = await this.employeeService.create(data);
        if (Employee.hasOwnProperty('id'))
            return res.status(201).json({ Employee });
        return res.status(400).json(Employee);
    }
    async pageSignin(res) {
        res.cookie('token', '');
        return {
            title: 'Login',
            login: true
        };
    }
    async signin(res, data) {
        if (data.email === '' || data.secret === '') {
            return res.status(400).json({ auth: false, message: 'Os campos devem ser preenchidos corretamente' });
        }
        let existsEmployee = {};
        try {
            if (data.email == process.env.ADMIN_EMAIL && data.secret == process.env.ADMIN_SECRET) {
                existsEmployee['email'] = 'admin@multimeios.com.br';
                existsEmployee['role'] = 'ADMIN';
                existsEmployee['cpf'] = '84753340082';
                existsEmployee['fullname'] = 'ADMIN';
                existsEmployee['preferencialname'] = 'ADMIN';
                existsEmployee['secret'] = bcrypt.hashSync(data.secret, 10);
                existsEmployee['id'] = 'ADMIN';
            }
            else {
                existsEmployee = await this.employeeService.getByEmail(data.email);
            }
            if (existsEmployee && existsEmployee['email'] != null) {
                if (await bcrypt.compare(data.secret, existsEmployee['secret'])) {
                    delete existsEmployee['secret'];
                    const secret = process.env.SERVER_SECRET_TOKEN || 'multi→Meios';
                    const token = jwt.sign({
                        id: existsEmployee['id'],
                        email: existsEmployee['email'],
                        role: existsEmployee['role'],
                        name: existsEmployee['preferencialname'] || existsEmployee['fullname'],
                    }, secret, { expiresIn: '2h' });
                    console.log(`\n${existsEmployee['role']} ${existsEmployee['email']} acaba de fazer login no sistema`);
                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 7200000),
                        httpOnly: true
                    });
                    res.cookie('name', existsEmployee['preferencialname'] || existsEmployee['fullname'], {
                        expires: new Date(Date.now() + 7200000),
                        httpOnly: true
                    });
                    res.status(200)
                        .redirect('/');
                }
                else {
                    console.log('Senha incorreta');
                    res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
                }
            }
            else {
                console.log('Email não encontrado');
                res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
            }
            return data;
        }
        catch (err) {
            console.dir(err);
            res.status(500).json({ auth: false, message: err.message });
        }
    }
};
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    common_1.Get('/signin'),
    common_1.Render('pages/employee/login'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "pageSignin", null);
__decorate([
    common_1.Post('/signin'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
AuthController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map