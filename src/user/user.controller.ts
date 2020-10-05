import { Body, Controller, Get, Post, Delete, Put, Param, Render } from '@nestjs/common';
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

    @Post('/profile')
    @Render('pages/user/profile')
    async profile(@Body('id') id) {
        const user = await this.service.getUser(id)
        return {
            title: 'Perfil',
            User: user
        };
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
    async createUser(@Body() data) {
        const newUser = await this.service.createUser(data)
        return {
            Users: newUser
        };
    }

    @Post('/delete')
    @Render('pages/user/list')
    async deletUser(@Body('id') id) {
        const deletUser = await this.service.deleteUser(id)
        console.dir(deletUser)
        return {
            User: deletUser
        }
    }

}
