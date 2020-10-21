import { Employee, EmployeeUpdateInput } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class EmployeeService {
    private prisma;
    constructor(prisma: PrismaService);
    getOne(id: any): Promise<Employee>;
    sendEmail(email: any, type: string, value?: string): any;
    delete(id: any): Promise<Employee>;
    update(data: EmployeeUpdateInput, id: any): Promise<Employee>;
    getMany(): Promise<Employee[]>;
    create(data: Employee, pass: any): Promise<Employee>;
    getByEmail(email: string): Promise<Employee>;
}
