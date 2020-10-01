import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('home')
    root() {
        return {
            title: 'Home Page initial',
            message: this.appService.getHello()
        };
    }

    @Get('/about')
    @Render('about')
    about() {
        return {
            title: 'About Page',
            message: 'hello About'
        };
    }

    @Get('/user')
    @Render('userList')
    async getUsers() {
        return {
            Users : await this.appService.getUsers()
        };
    }
}
