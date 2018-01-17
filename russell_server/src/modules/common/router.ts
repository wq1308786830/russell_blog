import * as common from './controller';

export const baseUrl = '/common';

export default [
    {
        method: "POST",
        route: '/login',
        handlers: [
            common.login
        ]
    },
    {
        method: "GET",
        route: '/register',
        handlers: [
            common.create
        ]
    }
];