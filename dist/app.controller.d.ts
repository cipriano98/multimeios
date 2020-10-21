import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(req: any): {
        title: string;
        message: any;
    };
    about(): {
        title: string;
        message: string;
    };
}
