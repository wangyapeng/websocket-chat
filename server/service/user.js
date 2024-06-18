import UserModel from '../model/user.js';
import { generatePwd, comparePwd } from "../util/verifyPwd.js"

export async function Register(ctx) {
    const {email, username, password} = ctx.request.body;
    if (!email) {
        ctx.status = 500;
        return {message: "请输入正确邮箱"}
    }
    const egzist = await UserModel.findOne({
        where: {
            email,
        }
    })

    if (egzist !== null) {
        ctx.status = 500;
        return {message: "用户已存在！"};
    } else {

        const pwd = await generatePwd(password);
        const res = await UserModel.create({
            email,
            username,
            password: pwd
        })
        return {message: "注册成功！", id: res.id};
    }
}


export async function Login(ctx) {
    const { email, password } = ctx.request.body;
    if (!email) {
        ctx.status = 500;
        return {message: "请输入正确邮箱"}
    }
    const egzist = await UserModel.findOne({
        where: {
            email,
        }
    })

    if (!egzist) {
        ctx.status = 500;
        return {message: "用户不存在！"}
    } else {
        const res = await comparePwd(egzist.password, password);
        if (res === true) {
            let n = ctx.session.views || 0;
            ctx.session.userInfo = {
                name: egzist.username,
                email: egzist.email,
            }
            ctx.session.views = ++n;
            return {
                message: "登录成功！",
                session: ctx.session
            }
        } else {
            return {
                message: "登录失败！"
            }
        }
    }
}


export async function getSession(ctx) {
    try {
        if (ctx.session.userInfo) {
            ctx.set('Cache-Control','max-age=8640000, must-revalidate');
            return {
                code: 1,
                session: ctx.session
            }
        } else {
            return {
                code: 0,
                message: "登录状态已失效",
            }
        }
    } catch(err) {
        return err;
    }
}

export async function logout(ctx) {
    try {
        ctx.session = null;
        return {
            code: 1,
            message: "登出成功！",
        }
    } catch(err) {
        return err;
    }
}