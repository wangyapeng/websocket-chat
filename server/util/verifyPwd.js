import argon2 from 'argon2';

const generatePwd = async function (password) {
    return await argon2.hash(password, {
        type: argon2.argon2d,
        memoryCost: 2 ** 16,
        hashLength: 50,
    });
}

const comparePwd = async function (hash, password) {
    try {
        if (await argon2.verify(hash, password)) {
            // password match
            return Promise.resolve(true)
        } else {
            // password did not match
            return Promise.resolve(false)
        }
    } catch (err) {
        // internal failure
        return Promise.resolve(err)
    }
}

export {
    generatePwd,
    comparePwd
}