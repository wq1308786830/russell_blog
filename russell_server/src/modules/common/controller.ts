import UserInfo from "../../models/userInfo";
import {resp} from '../index';

export async function login(ctx) {

    let userInfo = new UserInfo();

    let user_name = ctx.request.body.user_name || '';
    let password = ctx.request.body.password || '';

    if (!user_name || !password) {
        resp.data = '请输入账号密码';
        ctx.body = resp;
    } else {
        resp.data = await userInfo.getUser(user_name, password);
        ctx.body = resp;
    }

}

//初始化数据库
export async function create(ctx) {

    let userInfo = new UserInfo();

    let title = ctx.request.body.title || 'not title';
    let content = ctx.request.body.content || 'not content';
    let author = ctx.request.body.author || 'not author';

    // resp.data = await userInfo.createArticle(title, content, author);

    ctx.body = resp;
}