import { defineStore } from "pinia";

export const userListStore = defineStore('users', {
    state: () => {
        return {
            isLogin: false,
            userInfo: null,
            data: [],
            messages: [],
        }
    },

    actions: {
        init(val) {
            let data = JSON.parse(val)
            this.data = data instanceof Object ? [data]: [].concat(data);
        },

        initUserInfo(val) {
            this.userInfo = val;
        },

        setLoginStatus(val) {
            this.isLogin = val;
        },

        initMessages(val) {
            this.messages = val;
        }
    }
})