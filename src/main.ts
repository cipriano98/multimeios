import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import hbs = require('hbs');
import { TokenMiddleware } from './middleware/token/token.middleware';
import { UnlessMiddleware } from './middleware/router/unless.middleware';

/**
 * unless Middleware
 */
const unlessMiddleware = new UnlessMiddleware()
/**
 * token Middleware
 */
const tokenMiddleware = new TokenMiddleware()
/**
 * hot reload
 */
declare const module: any;


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);


    app.use(unlessMiddleware.use(
        tokenMiddleware.use,
        `/user/signin`,
        `/health/status`,
    ))

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

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

}

bootstrap();
