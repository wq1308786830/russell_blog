import { domains, env } from "../../config";
import BlogManager from "../../models/manage";
import { handleResponse, handleException } from "../index";
import { getCurrentDomain } from "../../../../global";

const fs = require("fs");

const manager = new BlogManager();
const IMG_SERVER = domains[env];
const STATIC_FOLDER = "static";
const UPLOAD_FOLDER = "uploads";

// get articles by params
export async function uploadBlgImg(ctx) {
  let data = null;
  let errMsg = "糟了，文件上传失败了！";
  try {
    const file = ctx.request.files.image; // 获取上传文件
    const reader = fs.createReadStream(file.path); // 创建可读流
    const ext = file.name.split(".").pop(); // 获取上传文件扩展名
    const filename = `${Math.random().toString()}.${ext}`;
    const writer = fs.createWriteStream(
      `./${STATIC_FOLDER}/${UPLOAD_FOLDER}/${filename}`
    ); // 创建可写流
    reader.pipe(writer);
    data = { link: `${IMG_SERVER}/${UPLOAD_FOLDER}/${filename}` };
  } catch (err) {
    console.log(err);
    handleException(ctx, err);
  }
  handleResponse(ctx, data, errMsg);
}

// get articles by params
export async function getArticlesByCondition(ctx) {
  let data = null;
  let errMsg = "少侠莫急，子类目还没空添加！";
  try {
    data = await manager.listArticlesByCondition(
      ctx.request.body.option,
      ctx.request.body.pageIndex
    );
  } catch (err) {
    console.log(err);
    handleException(ctx, err);
  }
  handleResponse(ctx, data, errMsg);
}

// publish article
export async function publishArticle(ctx) {
  let data = null;
  let errMsg = "不知道为啥反正是装逼失败了！";
  const { categoryId, title, content, textType } = ctx.request.body.body;
  try {
    if (ctx.request.body.article_id) {
      data = await manager.updateArticle(ctx.request.body.body);
    } else {
      data = await manager.saveArticle({
        categoryId,
        title,
        content,
        textType
      });
    }
  } catch (err) {
    console.log(err);
    handleException(ctx, err);
  }
  handleResponse(ctx, data, errMsg);
}

// delete blog
export async function deleteArticle(ctx) {
  let data = null;
  let errMsg = "";
  if (ctx.request.body.article_id < 0) {
    ctx.status = 404;
    errMsg = "缺少参数";
  } else {
    try {
      data = await manager.deleteArticleById(ctx.request.body);
    } catch (err) {
      console.log(err);
      handleException(ctx, err);
    }
  }
  handleResponse(ctx, data, errMsg);
}

// add category
export async function addCategory(ctx) {
  let data = null;
  let errMsg = "";
  if (
    ctx.request.body.fatherId < 0 ||
    !ctx.request.body.categoryName ||
    ctx.request.body.level < 0
  ) {
    ctx.status = 404;
    errMsg = "参数错误";
  } else {
    try {
      data = await manager.addCategory(ctx.request.body);
    } catch (err) {
      console.log(err);
      handleException(ctx, err);
    }
  }
  handleResponse(ctx, data, errMsg);
}

// delete category
export async function deleteCategory(ctx) {
  let data = null;
  let errMsg = "";
  if (ctx.request.body.categoryId < 0) {
    ctx.status = 404;
    errMsg = "参数错误";
  } else {
    try {
      data = await manager.deleteCategoryById(ctx.request.body);
    } catch (err) {
      console.log(err);
      handleException(ctx, err);
    }
  }
  handleResponse(ctx, data, errMsg);
}
