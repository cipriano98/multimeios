import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(
        private service: UserService,
    ) { }

    @Get()
    @Render('pages/user/list')
    async users() {
        return {
            title: 'Usuários',
            Users: await this.service.getUsers()
        };
    }

    @Get('/add')
    @Render('pages/user/create')
    async add() {
        console.dir('Método add')
        return {
            title: 'Novo usuário',
        };
    }

    @Post('/profile')
    @Render('pages/user/profile')
    async profile(@Body('id') id) {
        const user = await this.service.getUser(id)
        return {
            title: 'Perfil',
            User : user
        };
    }


    @Post('/')
    @Render('pages/user/create')
    async createUser(@Body() data) {
        return {
            Users: await this.service.createUser(data)
        };
    }

}
