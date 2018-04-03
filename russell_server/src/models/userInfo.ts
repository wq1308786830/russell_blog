import {sequelize} from '../utils';

export default class UserInfo {

    private sql = '';

    // get user data by username and password.
    public async getUser(userName, password) {
        this.sql = 'select * from blg_user where user_name=:userName and password=:password;';
        return await sequelize.query(this.sql, {replacements: {userName, password}, type: sequelize.QueryTypes.SELECT});
    }
}
