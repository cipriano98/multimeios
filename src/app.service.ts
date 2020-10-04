import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';


const prisma = new PrismaClient()
@Injectable()
export class AppService {

    constructor() {  }

    getHello(): string {
        return 'Hello World!';
    }
}
