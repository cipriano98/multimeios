import { AppService } from '../app.service';
import { UserService } from './user.service';
export declare class UserController {
    private service;
    private appService;
    constructor(service: UserService, appService: AppService);
    users(req: any): Promise<{
        admin: boolean;
        title: string;
        id: any;
        Users: import(".prisma/client").User[];
    }>;
    profile(req: any, id: any): Promise<{
        admin: boolean;
        id: any;
        title: string;
        User: import(".prisma/client").User;
    }>;
    add(req: any): Promise<{
        admin: boolean;
        id: any;
        title: string;
    }>;
    createUser(req: any, res: any, data: any): Promise<{
        admin: boolean;
        cookie: any;
        Users: import(".prisma/client").User;
    }>;
    deleteUser(res: any, id: any): Promise<any>;
    alterUser(res: any, data: any, id: any): Promise<void>;
}
