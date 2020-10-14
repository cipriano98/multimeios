import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import hbs = require('hbs');

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.set('view options', {
        layout: 'layouts/index'
    })

    hbs.registerPartials(join(__dirname, '..', 'views/partials'));

    const port = process.env.PORT || 3000
    await app.listen(port, '0.0.0.0', () => {
        console.clear()
        console.log(`
            ##     ## ##     ## ##       ######## #### ##     ## ######## ####  #######   ######
            ###   ### ##     ## ##          ##     ##  ###   ### ##        ##  ##     ## ##    ##
            #### #### ##     ## ##          ##     ##  #### #### ##        ##  ##     ## ##
            ## ### ## ##     ## ##          ##     ##  ## ### ## ######    ##  ##     ##  ######
            ##     ## ##     ## ##          ##     ##  ##     ## ##        ##  ##     ##       ##
            ##     ## ##     ## ##          ##     ##  ##     ## ##        ##  ##     ## ##    ##
            ##     ##  #######  ########    ##    #### ##     ## ######## ####  #######   ######
        `)
        console.log(`\n${process.env.npm_package_NAME} is running in http://localhost:${port}`)
        console.log(process.env.npm_package_DESCRIPTION)
        console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
    });
}

bootstrap();
