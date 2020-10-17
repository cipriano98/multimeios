import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [EmployeeController],
    providers: [
        EmployeeService,
        PrismaService
    ]
})
export class EmployeeModule {}
