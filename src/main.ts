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

    const port = process.env.PORT || 80
    await app.listen(port, '0.0.0.0', () => {
        console.log(`Acces http://localhost:${port}`);
    });
}

bootstrap();
