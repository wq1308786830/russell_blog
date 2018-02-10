import * as manage from './controller';

export const baseUrl = '/manage';

export default [
    {
        method: 'POST',
        route: '/getArticles',
        handlers: [
            manage.getArticlesByCondition,
        ],
    },
    {
        method: 'POST',
        route: '/publishArticle',
        handlers: [
            manage.publishArticle,
        ],
    },
    {
        method: 'POST',
        route: '/changeArticle',
        handlers: [
            manage.changeArticle,
        ],
    },
    {
        method: 'POST',
        route: '/deleteArticle',
        handlers: [
            manage.deleteArticle,
        ],
    },
    // {
    //     method: 'POST',
    //     route: '/uploadBlgImg',
    //     handlers: [
    //         manage.uploadBlgImg,
    //     ],
    // },
];
