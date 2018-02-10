import UserInfo from '../../models/userInfo';

/**
 * 登陆查询
 * @param ctx
 * @returns {Promise<void>}
 */
export async function login(ctx) {

    let user = '';

    const userInfo = new UserInfo();

    const userName = ctx.request.body.user_name || '';
    const password = ctx.request.body.password || '';

    if (!userName || !password) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '请输入账号密码'});
    } else {
        try {
            user = await userInfo.getUser(userName, password);
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        if (user.length) {
            ctx.body = JSON.stringify({success: true, data: user[0]});
        } else {
            ctx.body = JSON.stringify({success: false, msg: '账号或密码错误！'});
        }
    }

}

// 初始化数据库
export async function create(ctx) {

    const userInfo = new UserInfo();

    const title = ctx.request.body.title || 'not title';
    const content = ctx.request.body.content || 'not content';
    const author = ctx.request.body.author || 'not author';

    // resp.data = await userInfo.createArticle(title, content, author);
}
