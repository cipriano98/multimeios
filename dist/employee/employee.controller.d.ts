import { EmployeeService } from './employee.service';
import { AppService } from '../app.service';
export declare class EmployeeController {
    private service;
    private appService;
    constructor(service: EmployeeService, appService: AppService);
    employees(req: any): Promise<{
        admin: boolean;
        id: any;
        title: string;
        Employees: import(".prisma/client").Employee[];
    }>;
    profile(req: any, id: any): Promise<{
        admin: boolean;
        id: any;
        title: string;
        Employee: import(".prisma/client").Employee;
    }>;
    add(req: any): Promise<{
        admin: boolean;
        id: any;
        title: string;
    }>;
    createEmployee(req: any, res: any, data: any): Promise<{
        admin: boolean;
        id: any;
        Employees: import(".prisma/client").Employee;
    }>;
    deleteEmployee(res: any, id: any): Promise<any>;
    alterEmployee(res: any, data: any, id: any): Promise<void>;
}
