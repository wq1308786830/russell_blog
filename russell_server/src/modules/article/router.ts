import * as article from './controller';

export const baseUrl = '/article';

export default [
    {
        method: 'POST',
        route: '/getAllCategories',
        handlers: [
            article.getAllCategories,
        ],
    },
    {
        method: 'POST',
        route: '/getCategories',
        handlers: [
            article.getCategories,
        ],
    },
    {
        method: 'POST',
        route: '/getArticleList',
        handlers: [
            article.getArticleListByKey,
        ],
    },
    {
        method: 'POST',
        route: '/getArticleDetail',
        handlers: [
            article.getArticleDetail,
        ],
    },
    {
        method: 'POST',
        route: '/getArticleRecommendLinks',
        handlers: [
            article.getArticleRecommendLinks,
        ],
    },
];
