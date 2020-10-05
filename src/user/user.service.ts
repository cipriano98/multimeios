import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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

    async deleteUser(id) {
        return await this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
    }

    async getUsers() {
        return await this.prisma.user.findMany({
            where: {
                NOT: {
                    role: "ADMIN"
                }
            }
        })
    }

    async createUser(data) {
        return await this.prisma.user.create({
            data: {
                ...data
            }
        })
    }

}
