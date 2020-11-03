import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { User, UserUpdateInput, UserWhereUniqueInput } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import schedule = require('node-schedule');
const chalk = require('chalk')


@Injectable()
export class UserService {
    private users: User[] = [];
    private readonly logger = new Logger(UserService.name);

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

    public async logoutUser(userId: number) {
        console.log('agendando logout do usuário:', userId)
        // console.dir(this.users)
        if (userId && userId !== null && userId > 0) {
            const user = await this.getOne(userId);
            this.users.push(user);
        }

        // console.log(`this.users`)
        this.users.forEach(user => {

            if (user && user.online === 'ONLINE') {
                const date = new Date()
                const hour = date.getHours()
                const minute = date.getMinutes() + 1
                const second = date.getSeconds()
                const agenda_para = `${hour}:${minute}:${second}`
                // this.logger.log('Timeout second is 10')
                console.log(`${chalk.magenta(user.nickname.toUpperCase())} → Logout agendado para: ${chalk.green(agenda_para)}`);
                schedule.scheduleJob("user_" + user.id, { hour, minute, second }, async job => {
                    console.log(`${chalk.magenta(user.nickname.toUpperCase())} → Logout executado em: ${chalk.green(agenda_para)}`);
                    await this.update({
                        params: {
                            data: {
                                computer: 'NONE'
                            },
                            where: { id: userId }
                        }
                    });
                });

            }

        });

    }

    // @Cron(CronExpression.EVERY_10_SECONDS, {
    //     name: 'notifications',
    //     timeZone: 'America/Sao_Paulo'
    // })
    // @Interval('notifications', 10000)
    // @Timeout('notifications', 10000)
    // logoutUser(userKey) {

    //     this.logger.log('Timeout second is 10');
    // }


    async delete(id) {
        return await this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
    }

    async update({ params }: {
        params: {
            data: UserUpdateInput;
            where: UserWhereUniqueInput;
        }
    }) {
        const { where, data } = params;
        data.computer === "NONE"
            ? data.online = "OFFLINE"
            : data.online = "ONLINE"

        // if (data.online = "ONLINE") this.logoutUser(where.id)
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
