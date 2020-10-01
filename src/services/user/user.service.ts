import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getUser(id) {
        return await this.prisma.user.findOne({
            where: {
                id: Number(id)
            }
        })

    }
    async getUsers() {
        return await this.prisma.user.findMany()
    }

    async createUser(data) {
        return await this.prisma.user.create({
            ...data
        })
    }

}
