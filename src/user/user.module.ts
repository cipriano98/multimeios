import { Module } from "@nestjs/common";
import { AppService } from "../app.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        PrismaService,
        AppService
    ],
})
export class UserModule { }
