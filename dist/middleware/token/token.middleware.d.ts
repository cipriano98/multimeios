import { NestMiddleware } from '@nestjs/common';
export declare class TokenMiddleware implements NestMiddleware {
    use(req: any, res: any, next: any): any;
}
