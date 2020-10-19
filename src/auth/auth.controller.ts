import { Body, Controller, Get, HttpStatus, Post, Render, Res } from '@nestjs/common'
import { Employee } from '@prisma/client'

import jwt = require('jsonwebtoken')

import bcrypt = require('bcrypt')
import { EmployeeService } from 'src/employee/employee.service'

@Controller('admin')
export class AuthController {

    constructor(
        private employeeService: EmployeeService,
    ) { }


    @Post('/signup')
    public async signup(@Res() res, @Body() data): Promise<Employee> {
        data.secret = bcrypt.hashSync(data.secret, 10);
        const Employee = await this.employeeService.create(data)
        if (Employee.hasOwnProperty('id')) return res.status(201).json({ Employee })
        return res.status(400).json(Employee)
    }

    @Get('/signin')
    @Render('pages/employee/login')
    async pageSignin() {
        process.env.X_ACCESS_TOKEN = ""
        return {
            title: 'Login',
            login: true
        }
    }

    @Post('/signin')
    public async signin(@Res() res, @Body() data): Promise<any> {
        console.dir(data)
        if (data.email === '' || data.secret === '') {
            return res.status(400).json({ auth: false, message: 'Os campos devem ser preenchidos corretamente' });
        }

        try {

            const existsEmoloyee = await this.employeeService.getByEmail(data.email);
            if (existsEmoloyee && existsEmoloyee.email != null) {
                if (await bcrypt.compare(data.secret, existsEmoloyee.secret)) {
                    delete existsEmoloyee.secret
                    const secret = process.env.SERVER_SECRET_TOKEN || 'Currículo→Único';
                    const token = jwt.sign({
                        id: existsEmoloyee.id,
                        email: existsEmoloyee.email,
                        role: existsEmoloyee.role,
                        name: existsEmoloyee.preferencialname || existsEmoloyee.fullname,
                    }, secret, { expiresIn: '2h' });

                    console.log(`\n${existsEmoloyee.role} ${existsEmoloyee.email} acaba de fazer login no sistema`);
                    console.log("x-access-token:", token, '\n');

                    process.env.X_ACCESS_TOKEN = token
                    console.dir(process.env.X_ACCESS_TOKEN)
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


