import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
    imports: [
        UserModule,
        EmployeeModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        ScheduleModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
