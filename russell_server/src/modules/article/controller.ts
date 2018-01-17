import {getArticle, createArticle} from '../../models/articles';
import {resp} from '../index';

export async function list(ctx) {
    try {
        resp.data = await getArticle(ctx.query.offset);
    } catch (err) {
        resp.success = false;
        resp.data = `查询出错: ${err}`
    }
    ctx.body = resp;
}

//初始化数据库
export async function create(ctx) {

    let title = ctx.request.body.title || 'not title';
    let content = ctx.request.body.content || 'not content';
    let author = ctx.request.body.author || 'not author';

    let result = await createArticle(title, content, author);

    ctx.body = {
        result: 'success'
    };
}