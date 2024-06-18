import fs from 'fs';
import path from 'path';
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import Router from 'koa-router';
import { UserController } from './controller/user.controller.js';
import session from 'koa-session-minimal';
import SessionStorage from './service/sessionStorage.js'


let cookie = {
    maxAge: 86400000, // cookie有效时长
    path: '/', // 写cookie所在的路径
    domain: 'localhost', // 写cookie所在的域名
    sameSite: "Lax",
    httpOnly: true, // 是否只用于http请求中获取
}

const sessionStorage = new SessionStorage();

const CONFIG = {
    key: 'SESSION_ID',
    cookie: cookie,
    store: sessionStorage
};

(async () => {
    const app = new Koa();
    const users = [];
    const messages = [];
    const router = new Router();
   
    app.keys = ['DAQIN'];
    app.use(cors({
        origin: ctx => ctx.header.origin,
        // 指定地址才可以访问
        // origin: 'http://localhost:8080',
        maxAge: 2592000,
        // 必要配置
        credentials: true
    }));
    
    app.use(session({...CONFIG}));

    router.post('/register', UserController.Register);
    router.post('/login', UserController.Login);
    router.post('/getSession', UserController.GetSession);
    router.post('/logout',UserController.Logout);

    app.use(bodyParser());

    // 注册路由
    app.use(router.routes())

    app.use(router.allowedMethods())

    // const server = createServer(app);
    const server = createServer(app.callback())

    const io = new Server(server, {
        cors: true ,//允许跨域
    });

    io.on('connection', (socket) => {

        if (messages.length > 0) {
            socket.emit('getMsg', messages);
            socket.emit('userList', users);
        }

        socket.on('message', data => {
            messages.push(data)
            io.emit('getMsg', messages);
        })

        socket.on('disConnect', (socket) => {
            var dotindex = users.findIndex(v => v.name === socket?.name);
            if(dotindex > -1) {
                users.splice(dotindex, 1)
            }

            io.emit("userList", users);
        });

        socket.on('newUser', user => {
            console.log(user)
            if (!users.some(v => v.name === user.name)) {
                users.push(user);
            }
            io.emit("userList", users);
        })
    })

    server.listen(3000, () => {
        console.log('server is listening in 3000');
    });
})();