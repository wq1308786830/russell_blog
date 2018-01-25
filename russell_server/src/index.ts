import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as cors from 'koa2-cors';

import {apiAUTH} from './middleware/auth';
import {errorMiddleware} from './middleware/error';

import CONFIG from './config';
import module from './modules';

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(errorMiddleware());
app.use(apiAUTH);

module(app);

app.listen(CONFIG.PORT, () => {
    console.log(`Server started on ${CONFIG.PORT}`);
});
