import { Injectable } from '@nestjs/common';
import { Employee, EmployeeUpdateInput } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getOne(id) {
        return await this.prisma.employee.findOne({
            where: { id }
        })
    }

    async delete(id) {
        return await this.prisma.employee.delete({
            where: { id }
        })
    }

    async update(data: EmployeeUpdateInput,  id) {
        return await this.prisma.employee.update({
            data,
            where: { id: id }
        })
    }

    async getMany() {
        return await this.prisma.employee.findMany({ })
    }

    async create(data) {
        return await this.prisma.employee.create({
            data: {
                ...data
            }
        })
    }

    async getByEmail(email: string): Promise<Employee> {
        const getByEmail = await this.prisma.employee.findOne({
            where: { email },
        })
        return getByEmail
    }

}
