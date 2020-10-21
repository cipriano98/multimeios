import { User, UserUpdateInput, UserWhereUniqueInput } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getOne(id: any): Promise<User>;
    delete(id: any): Promise<User>;
    update(params: {
        data: UserUpdateInput;
        where: UserWhereUniqueInput;
    }): Promise<User>;
    getMany(): Promise<User[]>;
    create(data: any): Promise<User>;
    getByEmail(email: string): Promise<User>;
}
