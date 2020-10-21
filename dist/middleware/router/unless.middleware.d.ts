import { NestMiddleware } from '@nestjs/common';
export declare class UnlessMiddleware implements NestMiddleware {
    use(middleware: any, ...paths: any[]): (req: any, res: any, next: any) => void;
}
