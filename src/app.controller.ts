import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('pages/home')
    root(@Req() req) {
        return {
            title: 'Home',
            message: this.appService.getCookie(req.headers.cookie)
        };
    }

    @Get('/about')
    @Render('pages/about')
    about() {
        return {
            title: 'About',
            message: 'hello About'
        };
    }
}
