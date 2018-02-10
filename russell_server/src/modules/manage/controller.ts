import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
const Busboy = require('busboy')
import { listArticlesByCondition, saveArticle, updateArticle, deleteArticleById } from '../../models/manage';

export async function getArticlesByCondition(ctx) {
    let data = null;
    try {
        data = await listArticlesByCondition(ctx.request.body.option, ctx.request.body.pageIndex);
    } catch (err) {
        if (err.name === 'CastError' || err.name === 'NotFoundError') {
            ctx.status = 404;
        }
        ctx.status = 500;
    }
    if (data.length) {
        ctx.body = JSON.stringify({ success: true, data: data });
    } else {
        ctx.body = JSON.stringify({ success: false, msg: '少侠莫急，子类目还没空添加' });
    }
}

export async function publishArticle(ctx) {
    let data = null;
    let { categoryId, title, content } = ctx.request.body.body;
    try {
        data = await saveArticle({ categoryId, title, content });
    } catch (err) {
        console.log(`${err.name}：${err.message}`);
        if (err.name === 'CastError' || err.name === 'NotFoundError') {
            ctx.status = 404;
        }
        ctx.status = 500;
    }
    if (data) {
        ctx.body = JSON.stringify({ success: true, data: data });
    } else {
        ctx.body = JSON.stringify({ success: false, msg: '不知道为啥反正是装逼失败了！' });
    }
}


// 更新blog
export async function changeArticle(ctx) {
    let data = null;
    if (ctx.request.body.article_id < 0) {
        ctx.status = 404;
        ctx.body = JSON.stringify({ success: false, msg: '缺少参数' });
    } else {
        try {
            data = await updateArticle(ctx.request.body.body);
        } catch (err) {
            console.log(err.message);
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({ success: true, data: data });
    }
}

// 删除blog
export async function deleteArticle(ctx) {
    let data = null;
    if (ctx.request.body.article_id < 0) {
        ctx.status = 404;
        ctx.body = JSON.stringify({ success: false, msg: '缺少参数' });
    } else {
        try {
            data = await deleteArticleById(ctx.request.body);
        } catch (err) {
            console.log(err.message);
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({ success: true, data: data });
    }
}

// export async function uploadBlgImg(ctx) {
//     let data = [];
//     const req = ctx.req;
//     const res = ctx.res;
//     try {
//         let stream = fs.createWriteStream('cute_colorful_vector_illustration_I_need_a_Monsta.jpg');
//         //写入文件流
//         ctx.request.body.files.image.pipe(stream);
//         console.log('get FormData Params: ', req.body);  
//         req.on('data', (chunk) => {
//             data.push(chunk);
//             console.log(`Received ${chunk.length} bytes of data.`);
//         });
//         req.on('end', (chunk) => {
//             // fs.writeFileSync('cute_colorful_vector_illustration_I_need_a_Monsta.jpg', chunk);
//             let buf = Buffer.concat(data);
//             // fs.writeFileSync('cute_colorful_vector_illustration_I_need_a_Monsta.jpg', buf);
//             console.log(`Received ${buf.length} bytes of data.`);
//         });
//     } catch (err) {
//         console.log(`${err.name}：${err.message}`);
//         if (err.name === 'CastError' || err.name === 'NotFoundError') {
//             ctx.status = 404;
//         }
//         ctx.status = 500;
//     }
//     if (data) {
//         ctx.body = JSON.stringify({ success: true, data: data });
//     } else {
//         ctx.body = JSON.stringify({ success: false, msg: '不知道为啥反正是装逼失败了！' });
//     }
// }