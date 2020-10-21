import { Employee } from '@prisma/client';
import { EmployeeService } from '../employee/employee.service';
export declare class AuthController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    pageSignin(res: any): Promise<{
        title: string;
        login: boolean;
    }>;
    signin(res: any, data: Employee): Promise<any>;
}
