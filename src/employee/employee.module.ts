import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from 'src/auth/auth.controller';

@Module({
    imports: [],
    controllers: [
        EmployeeController,
        AuthController
    ],
    providers: [
        EmployeeService,
        PrismaService
    ]
})
export class EmployeeModule {}
