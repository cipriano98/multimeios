import { UserService } from './user.service';
export declare class UserController {
    private service;
    constructor(service: UserService);
    users(): Promise<{
        title: string;
        Users: import(".prisma/client").User[];
    }>;
    profile(id: any): Promise<{
        title: string;
        User: import(".prisma/client").User;
    }>;
    add(): Promise<{
        title: string;
    }>;
    createUser(res: any, data: any): Promise<{
        Users: import(".prisma/client").User;
    }>;
    deletUser(res: any, id: any): Promise<void>;
}
