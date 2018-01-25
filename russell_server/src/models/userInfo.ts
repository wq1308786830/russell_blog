import knex from '../utils';

export default class UserInfo {

    public async getUser(userName, password) {
        return await knex('blg_user').where({
            user_name: userName, password,
        });
    }

    public async getSimpleUser(userName) {
        return await knex('blg_user').where({
            userName,
        }).select('user_name', 'first_name', 'last_name', 'email', 'date_joined', 'avatar', 'qq', 'mobile');
    }

    public async createUser(data) {
        return await  knex('blg_user').insert({
            password: data.password, user_name: data.user_name, date_joined: data.date_joined,
        });
    }

    public async updateUser(data) {
        return await  knex('blg_user').where({
            user_name: data.user_name,
        }).update({
            first_name: data.first_name, last_name: data.last_name, email: data.email,
            qq: data.qq, mobile: data.mbile,
        });
    }
}
