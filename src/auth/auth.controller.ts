import { Body, Controller, Post, Res } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '@prisma/client'

import jwt = require('jsonwebtoken')

import bcrypt = require('bcrypt')

@Controller('user')
export class AuthController {

    constructor(
        private userService: UserService,
    ) { }


    @Post('/signup')
    public async signup(@Res() res, @Body() data): Promise<User> {
        // data.secret = bcrypt.hashSync(data.secret, 10);
        const newUser = await this.userService.create(data)

        if (newUser.hasOwnProperty('id')) return res.status(201).json({ newUser })
        return res.status(400).json(newUser)
    }


    @Post('/signin')
    public async signin(@Res() res, @Body() data): Promise<any> {
        if (data.email === '' || data.secret === '') {
            return res.status(400).json({ auth: false, message: 'Os campos devem ser preenchidos corretamente' });
        }

        try {

            const existsUser = await this.userService.getByEmail(data.email);
            if (existsUser && existsUser.email != null) {
                if (await bcrypt.compare(data.secret, existsUser.secret)) {
                    delete existsUser.secret
                    const secret = process.env.SERVER_SECRET_TOKEN || 'Currículo→Único';
                    const token = jwt.sign({
                        id: existsUser.id,
                        email: existsUser.email,
                        role: existsUser.role,
                        name: existsUser.preferencialname || existsUser.nickname || existsUser.fullname,
                    }, secret, { expiresIn: '2h' });

                    console.log(`\n${existsUser.role} ${existsUser.email} acaba de fazer login no sistema`);
                    console.log("x-access-token:", token, '\n');

                    res.status(200).json({
                        auth: true,
                        _id: data.id,
                        email: data.email,
                        expiresIn: '2h',
                        token: token
                    });

                } else {
                    console.log('Senha incorreta')
                    res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
                }

            } else {
                console.log('Email não encontrado')
                res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
            }

            return data;

        } catch (err) {
            res.status(500).json({ auth: false, message: err });
        }
    }

}


