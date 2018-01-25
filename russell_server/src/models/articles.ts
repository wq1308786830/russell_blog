import knex from '../utils';

export async function getArticle(offset) {
    return await knex.select().table('blg_article');
}

export async function createArticle(title, content, author) {
    return await  knex('blg_article').insert({
        a_title: title, a_content: content, a_author: author,
        createdAt: new Date(), updatedAt: new Date(),
    });
}

export async function listAllCategories() {
    return await knex.select().table('blg_category');
}

export async function listCategories(fatherId) {
    return await knex('blg_category').where({father_id: fatherId});
}

export async function listArticleListById(id) {
    return await knex('blg_article').where({category_id: id});
}

export async function selectArticleById(articleId) {
    return await knex('blg_article').where({id: articleId}).first();
}
