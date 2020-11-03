import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Render, Req, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import bcrypt = require('bcrypt')
import { AppService } from '../app.service';
@Controller('employee')
export class EmployeeController {
    constructor(
        private service: EmployeeService,
        private appService: AppService
    ) { }

    @Get()
    @Render('pages/employee/list')
    async employees(@Req() req) {
        const getEmployees = await this.service.getMany()
        if (getEmployees)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                title: 'Funcionários',
                Employees: getEmployees
            };
        throw new HttpException('Não há dados', HttpStatus.NO_CONTENT)
    }

    @Post('/profile')
    @HttpCode(200)
    @Render('pages/employee/profile')
    async profile(@Req() req, @Body('id') id) {
        console.dir(id)
        const employee = await this.service.getOne(id)
        if (employee)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                title: 'Perfil',
                Employee: employee
            };
        throw new HttpException('O funcionário com este id não existe', HttpStatus.NOT_FOUND)
    }

    @Get('/add')
    @Render('pages/employee/create')
    async add(@Req() req) {
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            id: this.appService.getCookie(req.headers.cookie, 'id'),
            title: 'Novo Funcionário',
        };
    }

    @Post('/')
    @Render('pages/employee/list')
    async createEmployee(@Req() req, @Res() res, @Body() data) {
        const secret = Math.random().toString(36).slice(-10)
        data.secret = bcrypt.hashSync(secret, 10);
        const newEmployee = await this.service.create(data, secret)

        if (newEmployee) {
            res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/employee')
        }

        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            id: this.appService.getCookie(req.headers.cookie, 'id'),
            Employees: newEmployee
        };
    }

    @Post('/delete')
    @HttpCode(200)
    async deleteEmployee(@Res() res, @Body('id') id) {
        const deleteEmployee = await this.service.delete(id)

        if (deleteEmployee) {
            return res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/employee')
        }
    }
    @Post('/alter/:id')
    @HttpCode(200)
    async alterEmployee(@Res() res, @Body() data, @Param('id') id) {
        data.secret = bcrypt.hashSync(data.secret, 10);
        const altertEmployee = await this.service.update(data, id)

        if (altertEmployee) {
            res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/employee')
        }
    }

}
