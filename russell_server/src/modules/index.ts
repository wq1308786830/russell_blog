import * as glob from "glob";
import * as Router from "koa-router";

import CONF from "../config";

export default function(app) {
  glob(
    `${__dirname}/*`,
    { ignore: ["**/index.js*", "**/index.ts*"] },
    (err, matches) => {
      if (err) {
        throw err;
      }
      matches.forEach(module => {
        const router = require(`${module}/router`);

        const routes = router.default;
        const baseUrl = router.baseUrl;

        // 增加版本号
        const instance = new Router({ prefix: "/" + CONF.VERSION + baseUrl });

        routes.forEach(config => {
          const { method = "", route = "", handlers = [] } = config;

          const lastHandler = handlers.pop();

          console.log(`routes: ${route}`);

          instance[method.toLowerCase()](route, ...handlers, async ctx => {
            return await lastHandler(ctx);
          });

          app.use(instance.routes());
          app.use(instance.allowedMethods());
        });
      });
    }
  );
}

export function handleResponse(ctx, data, errMsg) {
  if (data || data.length) {
    ctx.body = JSON.stringify({ success: true, data });
  } else {
    ctx.body = JSON.stringify({ success: false, msg: errMsg });
  }
}

export function handleException(ctx, err) {
  if (err.name === "CastError" || err.name === "NotFoundError") {
    ctx.status = 404;
  } else {
    ctx.status = 500;
  }
}
