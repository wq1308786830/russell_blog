import * as admin from './controller';

export const baseUrl = '/admin';

export default [
    {
        method: 'POST',
        route: '/login',
        handlers: [
            admin.login,
        ],
    },
    {
        method: 'GET',
        route: '/register',
        handlers: [
            admin.create,
        ],
    },
    {
        method: 'POST',
        route: '/register',
        handlers: [
            admin.create,
        ],
    },
];
