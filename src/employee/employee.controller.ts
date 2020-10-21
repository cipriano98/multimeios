import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Render, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import bcrypt = require('bcrypt')
@Controller('employee')
export class EmployeeController {
    constructor(
        private service: EmployeeService
    ) { }

    @Get()
    @Render('pages/employee/list')
    async employees() {
        const getEmployees = await this.service.getMany()
        if (getEmployees)
            return {
                title: 'Funcionários',
                Employees: getEmployees
            };
        throw new HttpException('Não há dados', HttpStatus.NO_CONTENT)
    }

    @Post('/profile')
    @HttpCode(200)
    @Render('pages/employee/profile')
    async profile(@Body('id') id) {
        const employee = await this.service.getOne(id)
        if (employee)
            return {
                title: 'Perfil',
                Employee: employee
            };
        throw new HttpException('O funcionário com este id não existe', HttpStatus.NOT_FOUND)
    }

    @Get('/add')
    @Render('pages/employee/create')
    async add() {
        return {
            title: 'Novo Funcionário',
        };
    }

    @Post('/')
    @Render('pages/employee/list')
    async createEmployee(@Res() res, @Body() data) {
        const secret = Math.random().toString(36).slice(-10)
        data.secret =bcrypt.hashSync(secret, 10);
        const newEmployee = await this.service.create(data, secret)

        if (newEmployee) {
            res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/employee')
        }
        return {
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
        const altertEmployee = await this.service.update(data, id)

        if (altertEmployee) {
            res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/employee')
        }
    }

}
