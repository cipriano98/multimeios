import {
    Controller, Render,
    Body, Get, Post, Param,
    Res, Req,
    HttpException, HttpStatus, HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(
        private service: UserService
    ) { }

    @Get()
    @Render('pages/user/list')
    async users() {
        const getUsers = await this.service.getMany()
        if (getUsers)
            return {
                title: 'Usuários',
                Users: getUsers
            };
        throw new HttpException('Não há dados', HttpStatus.NO_CONTENT)
    }

    @Post('/profile')
    @HttpCode(200)
    @Render('pages/user/profile')
    async profile(@Body('id') id) {
        const user = await this.service.getOne(id)
        if (user)
            return {
                title: 'Perfil',
                User: user
            };
        throw new HttpException('O usuário com este id não existe', HttpStatus.NOT_FOUND)
    }

    @Get('/add')
    @Render('pages/user/create')
    async add() {
        return {
            title: 'Novo usuário',
        };
    }

    @Post('/')
    @Render('pages/user/list')
    async createUser(@Res() res, @Body() data) {
        const newUser = await this.service.create(data)

        if (newUser) {
            res.status(HttpStatus.PERMANENT_REDIRECT).redirect('/user')
        }
        return {
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
