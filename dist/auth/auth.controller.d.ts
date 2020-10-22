import { Employee } from '@prisma/client';
import { EmployeeService } from '../employee/employee.service';
import { AppService } from '../app.service';
export declare class AuthController {
    private employeeService;
    private appService;
    constructor(employeeService: EmployeeService, appService: AppService);
    pageSignin(req: any, res: any): Promise<{
        admin: boolean;
        id: any;
        title: string;
        login: boolean;
    }>;
    signin(res: any, data: Employee): Promise<any>;
}
