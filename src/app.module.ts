import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';

@Global()
@Module({
    imports: [
        UserModule,
        EmployeeModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
