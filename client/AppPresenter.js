import {
    io
} from "socket.io-client";
import api from "@/api";
export default class AppPresenter {

    socket;
    messageList;
    userStore;
    constructor(store) {
        this.socket = io("ws://localhost:3000/");
        this.socket;
        this.userStore = store;
    }

    async init() {
        await this.autoLogin();
        await this.connectSocket();
        await this.loadUserListFromSocket();
        await this.receiveMessageFromSocket();
    }

    get localUser() {
        return JSON.parse(window.localStorage.getItem("userInfo")) || null;
    }

    connectSocket() {
        this.socket.on("connect", () => {
            if (this.localUser) {
                this.socket.emit("newUser", JSON.stringify(this.localUser));
            }
        });
    }

    loadUserListFromSocket() {
        this.socket.on("userList", (val) => {
            this.userStore.init(val);
        });
    }

    receiveMessageFromSocket() {
        this.socket.on("getMsg", (val) => {
            this.messageList = val;
            this.userStore.initMessages(val);
        });
    }

    disConnect() {
        this.socket.emit("disConnect", JSON.stringify(this.localUser));
    }

    sendMessage(message) {
        this.socket.emit("message", {
            message,
        });
    }


    async autoLogin() {
        const res = await api.post('/getSession');
        localStorage.clear();
        if (res.data.code === 1) {
            var userInfo = res.data.session.userInfo;
            this.userStore.initUserInfo(userInfo);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.userStore.setLoginStatus(true);
        } else {
            this.userStore.initUserInfo(null);
            this.userStore.setLoginStatus(false);
        }
    }
}