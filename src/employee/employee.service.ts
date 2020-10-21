import { Injectable } from '@nestjs/common';
import { Employee, EmployeeUpdateInput } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const nodemailer = require('nodemailer');

@Injectable()
export class EmployeeService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getOne(id) {
        return await this.prisma.employee.findOne({
            where: { id }
        })
    }



    sendEmail(email, type: string, value?: string) {
        const sendEmail = {
            from: 'uniquecurriculum@gmail.com',
            to: email,
            subject: '',
            html: ''
        }

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SEND_MAIL_HOST || 'uniquecurriculum@gmail.com',
                pass: process.env.SEND_MAIL_SECRET || 'curriculo@unico'
            },
            debug: true,
            logger: true
        });


        // const template = (type) => {
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
                    </p>`
        }
        // }




        if (sendEmail.subject != '' || sendEmail.html != '')
            return transport.sendMail(sendEmail, (err, info) => {
                if (err) {
                    console.dir(err)
                    throw err
                }
                console.log('Email enviado! Leia as informações adicionais: ', info);
            });

    }

    async delete(id) {
        return await this.prisma.employee.delete({
            where: { id }
        })
    }

    async update(data: EmployeeUpdateInput, id) {
        return await this.prisma.employee.update({
            data,
            where: { id: id }
        })
    }

    async getMany() {
        return await this.prisma.employee.findMany({})
    }

    async create(data: Employee, pass) {
        this.sendEmail(data.email, 'SECRET', pass)
        return await this.prisma.employee.create({
            data: {
                ...data
            }
        })
    }

    async getByEmail(email: string): Promise<Employee> {
        const getByEmail = await this.prisma.employee.findOne({
            where: { email },
        })
        return getByEmail
    }

}
