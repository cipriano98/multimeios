import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';


@Controller('user')
export class UserController {

    constructor(
        private service: UserService,
    ) { }

    @Get('/user')
    @Render('user/userList')
    async getUsers() {
        return {
            title: 'Usuários',
            Users: await this.service.getUsers()
        };
    }

    @Get('/user/:id')
    @Render('user/userProfile')
    async getUser(@Param('id') id) {
        const user = await this.service.getUser(id)
        console.log(`user → ${JSON.stringify(user)}`)
        return {
            title: 'Profile',
            Users: user
        };
    }

    @Post('/user')
    @Render('user/userList')
    async createUser(@Body() data) {
        return {
            Users: await this.service.createUser(data)
        };
    }

}
