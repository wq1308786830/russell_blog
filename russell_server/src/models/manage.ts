import { sequelize } from '../utils';

/**
 * select articles by `option` data and page index number.
 * @param option  
 * @param pageIndex 
 */
export async function listArticlesByCondition(option, pageIndex) {
    let limit = 2;
    let andStatus = false;
    let _sql = "select * from blg_article";
    if (option.categoryId && !andStatus) {
        _sql += ` where category_id=${option.categoryId}`;
        andStatus = true;
    } else if (option.categoryId && andStatus) { }
    if (option.dateRange.length && !andStatus) {
        _sql += ` where (unix_timestamp(date_publish) between ${option.dateRange[0]} and ${option.dateRange[1]})`;
        andStatus = true;
    } else if (option.dateRange.length && andStatus) {
        _sql += ` and (unix_timestamp(date_publish) between ${option.dateRange[0]} and ${option.dateRange[1]})`;
    }
    if (option.text && !andStatus) {
        _sql += ` where title like '%${option.text}%'`;
        andStatus = true;
    } else if (option.text && andStatus) {
        _sql += ` and title like '%${option.text}%'`;
    }
    _sql += ` limit ${limit} offset ${limit * pageIndex}`;
    return await sequelize.query(_sql, { type: sequelize.QueryTypes.SELECT });
}

/**
 * save article data `body`.
 * @param body 
 */
export async function saveArticle(body) {
    return await sequelize.query(`insert into blg_article (title, category_id, content, date_publish)
     values ('${body.title}', ${body.categoryId}, '${body.content}', now());`);
}

/**
 * save article data `body`.
 * @param body 
 */
export async function updateArticle(body) {
    return await sequelize.query('update blg_article set title=:title, category_id=:category_id, content=:content where id=:id;', {
        replacements:
            { title: body.title, category_id: body.categoryId, content: body.content, id: body.id }
    });
}

export async function deleteArticleById(body) {
    return await sequelize.query('delete from blg_article where id=:id;', { replacements: { id: body.id } });
}
