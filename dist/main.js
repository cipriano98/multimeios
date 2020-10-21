"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const hbs = require("hbs");
const token_middleware_1 = require("./middleware/token/token.middleware");
const unless_middleware_1 = require("./middleware/router/unless.middleware");
const unlessMiddleware = new unless_middleware_1.UnlessMiddleware();
const tokenMiddleware = new token_middleware_1.TokenMiddleware();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(unlessMiddleware.use(tokenMiddleware.use, `/user/signin`, `/health/status`));
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.set('view options', {
        layout: 'layouts/index'
    });
    hbs.registerPartials(path_1.join(__dirname, '..', 'views/partials'));
    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0', () => {
        console.clear();
        console.log(`
            ##     ## ##     ## ##       ######## #### ##     ## ######## ####  #######   ######
            ###   ### ##     ## ##          ##     ##  ###   ### ##        ##  ##     ## ##    ##
            #### #### ##     ## ##          ##     ##  #### #### ##        ##  ##     ## ##
            ## ### ## ##     ## ##          ##     ##  ## ### ## ######    ##  ##     ##  ######
            ##     ## ##     ## ##          ##     ##  ##     ## ##        ##  ##     ##       ##
            ##     ## ##     ## ##          ##     ##  ##     ## ##        ##  ##     ## ##    ##
            ##     ##  #######  ########    ##    #### ##     ## ######## ####  #######   ######
        `);
        console.log(`\n${process.env.npm_package_NAME} is running in http://localhost:${port}`);
        console.log(process.env.npm_package_DESCRIPTION);
        console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
    });
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map