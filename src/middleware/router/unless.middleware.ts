import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UnlessMiddleware implements NestMiddleware {

    use(middleware, ...paths) {
        return (req, res, next) => {
            const pathCheck = paths.some(path => path === req.path)
            pathCheck ? next() : middleware(req, res, next)
        }
    }

}
