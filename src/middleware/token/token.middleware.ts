import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import jwt = require('jsonwebtoken')

const dataUTC = new Date().getUTCFullYear() + '/' + (new Date().getUTCMonth() + 1) + '/' + new Date().getUTCDate();
const horaUTC = new Date().getUTCHours() + ':' + new Date().getUTCMinutes() + ':' + new Date().getUTCSeconds() + ' UTC';
@Injectable()
export class TokenMiddleware implements NestMiddleware {

    use(@Req() req, @Res() res, @Next() next) {

        const authorizedLog = loggedIn => {
            console.log('\nAcesso permitido ao usuário', loggedIn.email)
            console.log("by temAcesso")

            console.log("\n")
            console.log("request:", req.path, "→ Type:", req.method);
            console.log("in:", req.headers.referer);
            console.log("on:", dataUTC, 'at', horaUTC);
            console.log("by AuthMiddleware\n");
        }


        const hasAccess = loggedIn => {

            // TODO: Verificação de acesso aos recursos

            if (loggedIn) {
                authorizedLog(loggedIn)
                return true
            }
            console.log('\nAcesso negado em:', req.headers.referer)
            console.log("request:", req.path, "→ Type:", req.method);
            console.log("by temAcesso");
            return false
        }

        const unauthorizedLog = () => {
            console.log("\nUnauthorized");
            console.log("request:", req.path, "→ Type:", req.method);
            console.log("in:", req.headers.referer);
            console.log("on:", dataUTC, 'at', horaUTC);
            console.log("by TokenMiddleware\n");
        }

        const getToken = () => {
            const cookies = req.headers.cookie ? req.headers.cookie.split('; ') : []

            let token: string = ""
            cookies.forEach(cookie => {
                console.log(`cookie → ${JSON.stringify(cookie)}`)
                token = cookie && cookie.includes('token=')
                    ? cookie.replace('token=', '') : ''
                return token
            });
            return token
        }

        const token = getToken()
        console.log(token);

        if (!token) {
            return res
                .status(403)
                .send({
                    auth: false,
                    message: 'Nenhum token fornecido',
                    warning: 'Realize o login e tente novamente'
                });
        }

        const secret = process.env.SERVER_SECRET_TOKEN || 'Currículo→Único';
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    const tokenError = {
                        name: err.name,
                        message: 'Sua sessão expirou. Efetue o login novamente',
                        expiredAt: err['expiredAt']
                    }
                    unauthorizedLog()

                    return res.status(401).send(tokenError)
                }

                unauthorizedLog()
                // res.setHeader("", token);
                return res.status(403).send({
                    auth: false,
                    // expiredAt: decoded.expiredAt,
                    message: "Falha ao autenticar o token.",
                    warning: 'Token fornecido está incorreto'
                });
            }
            // ! No momento, sempre vai retornar true, TODO à fazer em temAcesso
            if (hasAccess(decoded)) {
                next();
            }
            else
                return res.status(403).json({
                    auth: false,
                    message: "Você não tem acesso à este recurso."
                })
        });

    }
}
