import {sequelize} from '../utils';

export default class ArticlesManager {

    private sql = '';

    public async getArticle(offset) {
        this.sql = 'select * from blg_article;';
        return await sequelize.query(this.sql, {type: sequelize.QueryTypes.SELECT});
    }

    public async listAllCategories() {
        this.sql = 'select * from blg_category;';
        return await sequelize.query(this.sql, {type: sequelize.QueryTypes.SELECT});
    }

    public async listCategories(fatherId) {
        this.sql = 'select * from blg_article where father_id=:fatherId;';
        return await sequelize.query(this.sql, {replacements: {fatherId}, type: sequelize.QueryTypes.SELECT});
    }

    public async listArticleListById(id) {
        this.sql = 'select * from blg_article where category_id=:categoryId;';
        return await sequelize.query(this.sql, {replacements: {categoryId: id}, type: sequelize.QueryTypes.SELECT});
    }

    public async selectArticleById(articleId) {
        this.sql = 'select * from blg_article where id=:articleId;';
        return await sequelize.query(this.sql, {replacements: {articleId}, type: sequelize.QueryTypes.SELECT});
    }

    public async getArticleRecommendLinksByArticleId(articleId) {
        this.sql = 'select * from blg_links where article_id=:articleId;';
        return await sequelize.query(this.sql, {replacements: {articleId}, type: sequelize.QueryTypes.SELECT});
    }
}
