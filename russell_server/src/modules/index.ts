import * as glob from 'glob';
import * as Router from 'koa-router';

import CONF from '../config';
// import {initArticle} from "../models/articles";

export default function(app) {
    // console.log(initArticle());  //create table s_article
    glob(`${__dirname}/*`, {ignore: '**/index.js*'}, (err, matches) => {
        if (err) {
            throw err;
        }

        matches.forEach((module) => {
            const router = require(`${module}/router`);

            const routes = router.default;
            const baseUrl = router.baseUrl;

            // 增加版本号
            const instance = new Router({prefix: '/' + CONF.VERSION + baseUrl});

            routes.forEach((config) => {
                const {
                    method = '',
                    route = '',
                    handlers = [],
                } = config;

                const lastHandler = handlers.pop();

                console.log(`routes: ${route}`);

                instance[method.toLowerCase()](route, ...handlers, async (ctx) => {
                    return await lastHandler(ctx);
                });

                app.use(instance.routes());
                app.use(instance.allowedMethods());
            });
        });
    });
}