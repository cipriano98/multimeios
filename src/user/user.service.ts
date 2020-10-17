import { Injectable } from '@nestjs/common';
import { User, UserUpdateInput, UserWhereUniqueInput } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getOne(id) {
        return await this.prisma.user.findOne({
            where: {
                id: Number(id)
            }
        })
    }

    async delete(id) {
        return await this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
    }

    async update(params: {
        data: UserUpdateInput;
        where: UserWhereUniqueInput;
    }) {
        const { where, data } = params;
        return await this.prisma.user.update({
            data,
            where
        })
    }

    async getMany() {
        return await this.prisma.user.findMany({
            where: {
                NOT: {
                    role: "ADMIN"
                }
            }
        })
    }

    async create(data) {
        return await this.prisma.user.create({
            data: {
                ...data
            }
        })
    }

    async getByEmail(email: string): Promise<User> {
        const getByEmail = await this.prisma.user.findOne({
            where: { email },
        })
        return getByEmail
    }

}
