import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUser(id: any): Promise<User>;
    deleteUser(id: any): Promise<User>;
    getUsers(): Promise<User[]>;
    createUser(data: any): Promise<User>;
}
