import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { EmployeeController } from './controllers/employee/employee.controller';
import { PrismaService } from './prisma/prisma.service';
import { EmployeeService } from './services/employee/employee.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, EmployeeController],
  providers: [AppService, PrismaService, EmployeeService, UserService],
})
export class AppModule {}
