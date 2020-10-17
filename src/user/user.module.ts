import { Module } from "@nestjs/common";
import { AuthController } from "src/auth/auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [],
    controllers: [
        UserController,
        AuthController
    ],
    providers: [
        UserService,
        PrismaService
    ],
})
export class UserModule { }
