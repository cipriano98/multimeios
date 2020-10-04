import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('pages/home')
    root() {
        return {
            title: 'Home',
            message: this.appService.getHello()
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
