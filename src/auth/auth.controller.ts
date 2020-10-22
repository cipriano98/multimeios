import { Body, Controller, Get, HttpStatus, Post, Render, Req, Res } from '@nestjs/common'
import { Employee } from '@prisma/client'

import jwt = require('jsonwebtoken')

import bcrypt = require('bcrypt')
import { EmployeeService } from '../employee/employee.service'
import { AppService } from '../app.service'

@Controller('admin')
export class AuthController {

    constructor(
        private employeeService: EmployeeService,
        private appService: AppService

    ) { }

    @Get('/signin')
    @Render('pages/employee/login')
    async pageSignin(@Req() req, @Res() res) {
        res.cookie('token', '')
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            id: this.appService.getCookie(req.headers.cookie, 'id'),
            title: 'Login',
            login: true
        }
    }

    @Post('/signin')
    public async signin(@Res() res, @Body() data: Employee): Promise<any> {
        if (data.email === '' || data.secret === '') {
            return res.status(400).json({ auth: false, message: 'Os campos devem ser preenchidos corretamente' });
        }

        let existsEmployee = {};
        try {
            if (data.email == process.env.ADMIN_EMAIL && data.secret == process.env.ADMIN_SECRET) {
                existsEmployee['email'] = 'admin@multimeios.com.br'
                existsEmployee['role'] = 'ADMIN'
                existsEmployee['cpf'] = '84753340082'
                existsEmployee['fullname'] = 'ADMIN'
                existsEmployee['preferencialname'] = 'ADMIN'
                existsEmployee['secret'] = bcrypt.hashSync(data.secret, 10);
                existsEmployee['id'] = 'ADMIN';
            } else {
                existsEmployee = await this.employeeService.getByEmail(data.email);
            }
            if (existsEmployee && existsEmployee['email'] != null) {
                if (await bcrypt.compare(data.secret, existsEmployee['secret'])) {
                    delete existsEmployee['secret']
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
                    res.cookie('role', existsEmployee['role'], {
                        expires: new Date(Date.now() + 7200000),
                        httpOnly: true
                    });
                    res.cookie('id', existsEmployee['id'], {
                        expires: new Date(Date.now() + 7200000),
                        httpOnly: true
                    });

                    res.status(200)
                        // .json({
                        //     auth: true,
                        //     _id: data.id,
                        //     email: data.email,
                        //     expiresIn: '2h',
                        //     token: token
                        // })
                        .redirect('/')

                } else {
                    console.log('Senha incorreta')
                    res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
                }

            } else {
                console.log('Email não encontrado')
                res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
            }

            return data


        } catch (err) {
            console.dir(err)
            res.status(500).json({ auth: false, message: err.message });
        }

    }

}


