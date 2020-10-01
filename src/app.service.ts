import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';


const prisma = new PrismaClient()
@Injectable()
export class AppService {

    constructor(
    ) {

    }

    getHello(): string {
        return 'Hello World!';
    }
    async getUser() {
        return await prisma.user.findOne({
            where: {
                email: 'natancipriano98@gmail.com'
            }
        })

    }
    async getUsers() {
        return await prisma.user.findMany()
    }
}
