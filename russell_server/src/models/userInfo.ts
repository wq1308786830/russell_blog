import knex from '../utils';

export default class UserInfo {
    constructor() {
    }

    async getUser(user_name, password) {
        return await knex('blg_user').where({
            user_name: user_name, password: password
        });
    }

    async getSimpleUser(user_name) {
        return await knex('blg_user').where({
            user_name: user_name
        }).select('user_name', 'first_name', 'last_name', 'email', 'date_joined', 'avatar', 'qq', 'mobile');
    }

    async createUser(data) {
        return await  knex('blg_user').insert({
            password: data.password, user_name: data.user_name, date_joined: data.date_joined
        });
    }

    async updateUser(data) {
        return await  knex('blg_user').where({
            user_name: data.user_name
        }).update({
            first_name: data.first_name, last_name: data.last_name, email: data.email,
            qq: data.qq, mobile: data.mbile
        });
    }
}