import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(req: any): {
        admin: boolean;
        id: any;
        title: string;
        message: any;
    };
    about(req: any): {
        admin: boolean;
        id: any;
        title: string;
        message: string;
    };
}
