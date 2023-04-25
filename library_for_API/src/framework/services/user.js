import supertest from "supertest";
import config from '../config/config.js';
const baseUrl = config.baseUrl;

const account = {
    //отправляем данные на сайт
    user: (payload) => {
        return supertest(baseUrl)
            .post('/account/v1/user')
            .set('Accept', 'application/json')
            .send(payload)
    },
    //получаем информацию о пользователе
    userInfo: (uuid, token) => {
        return supertest(baseUrl)
            .get(`/account/v1/user/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
    },
    //удаляем пользователя
    deleteUser: (uuid, token) => {
        return supertest(baseUrl)
            .del(`/account/v1/user/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
    },
    //проверяем авторизацию
    authorized: (payload) => {
        return supertest(baseUrl)
            .post('/account/v1/authorized')
            .set('Accept', 'application/json')
            .send(payload)
    },
    //генерируем токен
    generateToken: (payload) => {
        return supertest(baseUrl)
            .post('/account/v1/generatetoken')
            .set('Accept', 'application/json')
            .send(payload)
    },
    // получаем токен
    async getAuthToken(payload) {
        const res = await this.generateToken(payload);
        return res.body.token;
    },
    // создаём нового юзера
    async createUserWithToken(credentials) {
        const userId = (await account.user(credentials)).body.userID;
        const authToken = await account.getAuthToken(credentials);
        const userData = { uuid: userId, token: authToken };
        console.log(userData);
        return userData;
    },
}

export default account