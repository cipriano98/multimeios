import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';


const prisma = new PrismaClient()
@Injectable()
export class AppService {

    constructor() { }

    getCookie(cookies: string, getCookie?: string) {
        const constructCookies = cookies ? cookies.split('; ') : [];
        const newCookie = {};
        constructCookies.forEach(reqCookie => {
            const keyValue = reqCookie.split('=')
            newCookie[keyValue[0]] = keyValue[1]
        });

        console.dir(newCookie)
        if(getCookie) return newCookie[getCookie] || ""
        return newCookie;
    }
}
