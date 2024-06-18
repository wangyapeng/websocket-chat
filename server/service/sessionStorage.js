import Redis from 'ioredis'

export default class SessionStorage {
    redis;
    constructor() {
        this.redis = new Redis({
            port: 6379, // redis服务器默认端口号
            host: '127.0.0.1' // redis服务器的IP地址
        })
    }

    async get(key) {
        let result = await this.redis.get(key);
        if (result) {
            return Promise.resolve(JSON.parse(result))
        }

        return Promise.resolve(false);
    }

    async set(key,val) {
        await this.redis.set(key, JSON.stringify(val));
    }

    async destroy(key) {
        await this.redis.del(key);
    }
}