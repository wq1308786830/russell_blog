import { sequelize } from '../utils';

export async function getArticle(offset) {
    return await sequelize.query('select * from blg_article', {type: sequelize.QueryTypes.SELECT});
}

export async function listAllCategories() {
    return await sequelize.query('select * from blg_category', {type: sequelize.QueryTypes.SELECT});
}

export async function listCategories(fatherId) {
    return await sequelize.query('select * from blg_article where father_id=:fatherId',
        { replacements: { fatherId: fatherId }, type: sequelize.QueryTypes.SELECT });
}

export async function listArticleListById(id) {
    return await sequelize.query('select * from blg_article where category_id=:categoryId',
        { replacements: { categoryId: id }, type: sequelize.QueryTypes.SELECT });
}

export async function selectArticleById(articleId) {
    return await sequelize.query('select * from blg_article where id=:articleId',
        { replacements: { articleId: articleId }, type: sequelize.QueryTypes.SELECT });
}

export async function getArticleRecommendLinksByArticleId(articleId) {
    return await sequelize.query('select * from blg_links where article_id=:articleId',
        { replacements: { articleId: articleId }, type: sequelize.QueryTypes.SELECT });
}
