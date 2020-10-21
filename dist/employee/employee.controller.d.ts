import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private service;
    constructor(service: EmployeeService);
    employees(): Promise<{
        title: string;
        Employees: import(".prisma/client").Employee[];
    }>;
    profile(id: any): Promise<{
        title: string;
        Employee: import(".prisma/client").Employee;
    }>;
    add(): Promise<{
        title: string;
    }>;
    createEmployee(res: any, data: any): Promise<{
        Employees: import(".prisma/client").Employee;
    }>;
    deleteEmployee(res: any, id: any): Promise<any>;
    alterEmployee(res: any, data: any, id: any): Promise<void>;
}
