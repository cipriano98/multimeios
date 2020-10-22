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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const nodemailer = require('nodemailer');
let EmployeeService = class EmployeeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOne(id) {
        return await this.prisma.employee.findOne({
            where: { id }
        });
    }
    sendEmail(email, type, value) {
        const sendEmail = {
            from: 'uniquecurriculum@gmail.com',
            to: email,
            subject: '',
            html: ''
        };
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SEND_MAIL_HOST || 'uniquecurriculum@gmail.com',
                pass: process.env.SEND_MAIL_SECRET || 'curriculo@unico'
            },
            debug: true,
            logger: true
        });
        if (type === 'SECRET') {
            sendEmail.subject = 'Sua senha para acesso ao nosso sistema',
                sendEmail.html = `
                    <p>
                        Seu acesso ao multimeios fui liberado! <br>
                        email: ${email} <br>
                        password: ${value} <br>
                        <a href="https://multi-meios.herokuapp.com/admin/signin">Acesse nosso sistema</a> <br>
                        ou <br>
                        <a href="http://localhost:3333/admin/signin">Localhost</a>
                    </p>`;
        }
        if (sendEmail.subject != '' || sendEmail.html != '')
            return transport.sendMail(sendEmail, (err, info) => {
                if (err) {
                    console.dir(err);
                }
                console.log('Email enviado! Leia as informações adicionais: ', info);
            });
    }
    async delete(id) {
        return await this.prisma.employee.delete({
            where: { id }
        });
    }
    async update(data, id) {
        return await this.prisma.employee.update({
            data,
            where: { id: id }
        });
    }
    async getMany() {
        return await this.prisma.employee.findMany({});
    }
    async create(data, pass) {
        if (data.email.includes('@'))
            this.sendEmail(data.email, 'SECRET', pass);
        return await this.prisma.employee.create({
            data: Object.assign({}, data)
        });
    }
    async getByEmail(email) {
        const getByEmail = await this.prisma.employee.findOne({
            where: { email },
        });
        return getByEmail;
    }
};
EmployeeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map