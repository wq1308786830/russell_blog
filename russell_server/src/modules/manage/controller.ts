import BlogManager from '../../models/manage';
const fs = require('fs');

const manager = new BlogManager();
const IMG_SERVER = 'http://localhost:5001'
const STATIC_FOLDER = 'static';
const UPLOAD_FOLDER = 'uploads';

// get articles by params
export async function uploadBlgImg(ctx) {
    let data = null;
    try {
        const file = ctx.request.files.image;	// 获取上传文件
        const reader = fs.createReadStream(file.path);	// 创建可读流
        const ext = file.name.split('.').pop();		// 获取上传文件扩展名
        const filename = `${Math.random().toString()}.${ext}`;
        const writer = fs.createWriteStream(`./${STATIC_FOLDER}/${UPLOAD_FOLDER}/${filename}`);		// 创建可写流
        reader.pipe(writer);
        data = {'link': `${IMG_SERVER}/${UPLOAD_FOLDER}/${filename}`};
    } catch (err) {
        console.log(err);
        if (err.name === 'CastError' || err.name === 'NotFoundError') {
            ctx.status = 404;
        } else {
            ctx.status = 500;
        }
    }
        
    if (data !== null) {
        ctx.body = JSON.stringify({success: true, data});
    } else {
        ctx.body = JSON.stringify({success: false, msg: '少侠莫急，子类目还没空添加'});
    }
}

// get articles by params
export async function getArticlesByCondition(ctx) {
    let data = null;
    try {
        data = await manager.listArticlesByCondition(ctx.request.body.option, ctx.request.body.pageIndex);
    } catch (err) {
        if (err.name === 'CastError' || err.name === 'NotFoundError') {
            ctx.status = 404;
        }
        ctx.status = 500;
    }
    if (data.length) {
        ctx.body = JSON.stringify({success: true, data});
    } else {
        ctx.body = JSON.stringify({success: false, msg: '少侠莫急，子类目还没空添加'});
    }
}

// publish article
export async function publishArticle(ctx) {
    let data = null;
    const {categoryId, title, content} = ctx.request.body.body;
    try {
        data = await manager.saveArticle({categoryId, title, content});
    } catch (err) {
        console.log(`${err.name}：${err.message}`);
        if (err.name === 'CastError' || err.name === 'NotFoundError') {
            ctx.status = 404;
        }
        ctx.status = 500;
    }
    if (data) {
        ctx.body = JSON.stringify({success: true, data});
    } else {
        ctx.body = JSON.stringify({success: false, msg: '不知道为啥反正是装逼失败了！'});
    }
}

// update blog
export async function changeArticle(ctx) {
    let data = null;
    if (ctx.request.body.article_id < 0) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '缺少参数'});
    } else {
        try {
            data = await manager.updateArticle(ctx.request.body.body);
        } catch (err) {
            console.log(err.message);
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({success: true, data});
    }
}

// delete blog
export async function deleteArticle(ctx) {
    let data = null;
    if (ctx.request.body.article_id < 0) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '缺少参数'});
    } else {
        try {
            data = await manager.deleteArticleById(ctx.request.body);
        } catch (err) {
            console.log(err.message);
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({success: true, data});
    }
}

// add category
export async function addCategory(ctx) {
    let data = null;
    if (ctx.request.body.fatherId < 0 || !ctx.request.body.categoryName || ctx.request.body.level < 0) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '错误'});
    } else {
        try {
            data = await manager.addCategory(ctx.request.body);
        } catch (err) {
            console.log(err.message);
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({success: true, data});
    }
}

// delete category
export async function deleteCategory(ctx) {
    let data = null;
    if (ctx.request.body.categoryId < 0) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '错误'});
    } else {
        try {
            data = await manager.deleteCategoryById(ctx.request.body);
        } catch (err) {
            console.log(err.message);
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({success: true, data});
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
