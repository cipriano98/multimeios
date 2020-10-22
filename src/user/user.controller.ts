import {
    Controller, Render,
    Body, Get, Post, Param,
    Res, Req,
    HttpException, HttpStatus, HttpCode
} from '@nestjs/common';
import { AppService } from '../app.service';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(
        private service: UserService,
        private appService: AppService
    ) { }

    @Get()
    @Render('pages/user/list')
    async users(@Req() req) {
        const getUsers = await this.service.getMany()
        if (getUsers)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                title: 'Usuários',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                Users: getUsers
            };
        throw new HttpException('Não há dados', HttpStatus.NO_CONTENT)
    }

    @Post('/profile')
    @HttpCode(200)
    @Render('pages/user/profile')
    async profile(@Req() req, @Body('id') id) {
        const user = await this.service.getOne(id)
        if (user)
            return {
                admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
                id: this.appService.getCookie(req.headers.cookie, 'id'),
                title: 'Perfil',
                User: user
            };
        throw new HttpException('O usuário com este id não existe', HttpStatus.NOT_FOUND)
    }

    @Get('/add')
    @Render('pages/user/create')
    async add(@Req() req) {
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            id: this.appService.getCookie(req.headers.cookie, 'id'),
            title: 'Novo usuário',
        };
    }

    @Post('/')
    @Render('pages/user/list')
    async createUser(@Req() req, @Res() res, @Body() data) {
        const newUser = await this.service.create(data)

        if (newUser) {
            res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/user')
        }
        return {
            admin: this.appService.getCookie(req.headers.cookie, 'role') === 'ADMIN',
            cookie: this.appService.getCookie(req.headers.cookie),
            Users: newUser
        };
    }

    @Post('/delete')
    @HttpCode(200)
    async deleteUser(@Res() res, @Body('id') id) {
        const deleteUser = await this.service.delete(id)

        if (deleteUser) {
            return res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/user')
        }
    }
    @Post('/alter/:id')
    @HttpCode(200)
    async alterUser(@Res() res, @Body() data, @Param('id') id) {
        const altertUser = await this.service.update({
            data: { ...data },
            where: { id: Number(id) },
        })

        if (altertUser) {
            res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/user')
        }
    }

}
