import {sequelize} from '../utils';

/**
 * select articles by `option` data and page index number.
 * @param option
 * @param pageIndex
 */

export default class BlogManager {

    private sql = '';
    private limit = 10;

    public async listArticlesByCondition(option, pageIndex) {
        let andStatus = false;
        this.sql = 'select * from blg_article';
        if (option.categoryId && !andStatus) {
            this.sql += ` where category_id=${option.categoryId}`;
            andStatus = true;
        } else if (option.categoryId && andStatus) {
        }
        if (option.dateRange.length && !andStatus) {
            this.sql += ` where (unix_timestamp(date_publish) between
                         ${option.dateRange[0]} and ${option.dateRange[1]})`;
            andStatus = true;
        } else if (option.dateRange.length && andStatus) {
            this.sql += ` and (unix_timestamp(date_publish) between ${option.dateRange[0]} and ${option.dateRange[1]})`;
        }
        if (option.text && !andStatus) {
            this.sql += ` where title like '%${option.text}%'`;
            andStatus = true;
        } else if (option.text && andStatus) {
            this.sql += ` and title like '%${option.text}%'`;
        }
        this.sql += ` limit ${this.limit} offset ${this.limit * pageIndex}`;
        return await sequelize.query(this.sql, {type: sequelize.QueryTypes.SELECT});
    }

    /**
     * save article data `body`.
     * @param body
     */
    public async saveArticle(body) {
        // deal apostrophe(') with double apostrophe in content string.
        body.content = body.content.replace(/[']/g, '\'\'');
        this.sql = `insert into blg_article (title, category_id, content, date_publish)
                    values ('${body.title}', ${body.categoryId}, '${body.content}', now());`;
        return await sequelize.query(this.sql);
    }

    /**
     * save article data `body`.
     * @param body
     */
    public async updateArticle(body) {
        this.sql = 'update blg_article set title=:title, category_id=:category_id, content=:content where id=:id;';
        return await sequelize.query(this.sql, {
            replacements:
                {title: body.title, category_id: body.categoryId, content: body.content, id: body.id}
        });
    }

    public async deleteArticleById(body) {
        this.sql = 'delete from blg_article where id=:id;';
        return await sequelize.query(this.sql, {replacements: {id: body.id}});
    }

    public async addCategory(body) {
        this.sql = `insert into blg_category (father_id, level,  name)
                    values (${body.fatherId}, ${body.level}, '${body.categoryName}');`;
        return await sequelize.query(this.sql);
    }

    public async deleteCategoryById(body) {
        this.sql = `delete from blg_category where id=${body.categoryId};`;
        return await sequelize.query(this.sql);
    }
}
