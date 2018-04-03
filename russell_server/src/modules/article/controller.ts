import ArticlesManager from '../../models/articles';

const manager = new ArticlesManager();
// 获取分类下的文章列表
export async function list(ctx) {
    try {
        ctx.body = await manager.getArticle(ctx.query.offset);
    } catch (err) {
        if (err.name === 'CastError' || err.name === 'NotFoundError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }
}

// 获取所有类目
export async function getAllCategories(ctx) {
    let data = null;
    try {
        data = await manager.listAllCategories();
    } catch (err) {
        if (err.name === 'CastError' || err.name === 'NotFoundError') {
            ctx.status = 404;
        }
        ctx.status = 500;
    }
    if (data.length) {
        ctx.body = JSON.stringify({success: true, data: categoryOptimize(data)});
    } else {
        ctx.body = JSON.stringify({success: false, msg: '少侠莫急，子类目还没空添加'});
    }
}

const categoryOptimize = (data) => {
    let allCategories = [];
    if (!data.length) {
        return;
    }
    for (let d = 1; d < data.length; d++) {
        if (data[d].level === 1) {
            allCategories = data.filter((item) => {
                return item.level === data[d].level;
            });
        } else {
            for (const category of allCategories) {
                category.subCategory = data.filter((item) => {
                    return item.father_id === category.id;
                });
                for (const categorySub of category.subCategory) {
                    categorySub.subCategory = data.filter((item) => {
                        return item.father_id === categorySub.id;
                    });
                }
            }

        }
    }
    return allCategories;
};

// 根据父级类目father_id获取子类目
export async function getCategories(ctx) {
    let data = null;
    if (!(ctx.request.body.father_id > -1)) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '缺少参数'});
    } else {
        try {
            data = await manager.listCategories(ctx.request.body.father_id);
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
}

// 根据key作为`blg_article`的id获取博文列表
export async function getArticleListByKey(ctx) {
    let data = null;
    if (!(ctx.request.body.key > -1)) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '缺少参数'});
    } else {
        try {
            data = await manager.listArticleListById(ctx.request.body.key);
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
}

// 根据key作为`blg_article`的id获取博文详情
export async function getArticleDetail(ctx) {
    let data = null;
    if (!(ctx.request.body.articleId > -1)) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '缺少参数'});
    } else {
        try {
            data = await manager.selectArticleById(ctx.request.body.articleId);
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({success: true, data: data[0]});
    }
}

// 根据key作为`blg_article`的id获取博文推荐查看的链接
export async function getArticleRecommendLinks(ctx) {
    let data = null;
    if (ctx.request.body.articleId < 0) {
        ctx.status = 404;
        ctx.body = JSON.stringify({success: false, msg: '缺少参数'});
    } else {
        try {
            data = await manager.getArticleRecommendLinksByArticleId(ctx.request.body.articleId);
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.status = 404;
            }
            ctx.status = 500;
        }
        ctx.body = JSON.stringify({success: true, data});
    }
}
