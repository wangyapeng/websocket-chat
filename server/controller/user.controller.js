import { Register,Login, getSession,logout } from '../service/user.js'

export class UserController {

    static async Register(ctx) {
        console.log(ctx.params, ctx.request.body);
        const data = await Register(ctx);
        ctx.body = data;
    }

    static async Login(ctx) {
        const data = await Login(ctx);
        ctx.body = data;
    }

    static async GetSession(ctx) {
        const data = await getSession(ctx);
        if (data.code === 1) {
            ctx.body = data;
        } else {
            ctx.status = 401;
            ctx.body = data;
        }
    }

    static async Logout(ctx) {
        ctx.body = await logout(ctx);
    }
}