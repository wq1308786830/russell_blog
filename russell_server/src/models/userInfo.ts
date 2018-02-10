import { sequelize } from '../utils';

export default class UserInfo {

    public async getUser(userName, password) {
        return await sequelize.query('select * from blg_user where user_name=:userName and password=:password',
            { replacements: { userName: userName, password: password }, type: sequelize.QueryTypes.SELECT });
    }
}
