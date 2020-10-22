import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from '../auth/auth.controller';
import { AppService } from '../app.service';

@Module({
    imports: [],
    controllers: [
        EmployeeController,
        AuthController
    ],
    providers: [
        EmployeeService,
        PrismaService,
        AppService
    ]
})
export class EmployeeModule {}
