import { sequelize } from "../utils";

export default class ArticlesManager {
  private sql = "";

  /**
   * 查询所有的分类
   */
  public async listAllCategories() {
    this.sql = "select * from blg_category;";
    return await sequelize.query(this.sql, {
      type: sequelize.QueryTypes.SELECT
    });
  }

  /**
   * 查询父分类下的子分类id
   * @param fatherId
   */
  public async listCategories(fatherId) {
    this.sql = "select * from blg_category where father_id=:fatherId;";
    return await sequelize.query(this.sql, {
      replacements: { fatherId },
      type: sequelize.QueryTypes.SELECT
    });
  }

  /**
   * 查询分类下的文章列表
   * @param id
   */
  public async listArticleListById(id) {
    this.sql = "select * from blg_article where category_id=:categoryId;";
    return await sequelize.query(this.sql, {
      replacements: { categoryId: id },
      type: sequelize.QueryTypes.SELECT
    });
  }

  /**
   * 查询文章详情
   * @param articleId
   */
  public async selectArticleById(articleId) {
    await this.updateArticleReadCount(articleId);
    this.sql = "select * from blg_article where id=:articleId;";
    return await sequelize.query(this.sql, {
      replacements: { articleId },
      type: sequelize.QueryTypes.SELECT
    });
  }

  public async selectArticleCategory(articleId) {
    this.sql = "select (select father_id from blg_category where id = (select father_id from blg_category where id = (select category_id from blg_article where id=:articleId))) as level1, father_id as level2, (select category_id from blg_article where id=:articleId) as level3 from blg_category where id = (select category_id from blg_article where id=:articleId);";
    return await sequelize.query(this.sql, {
      replacements: { articleId },
      type: sequelize.QueryTypes.SELECT
    });
  }

  /**
   * 更新文章阅读量
   * @param articleId
   */
  public async updateArticleReadCount(articleId) {
    let countArr = await sequelize.query(
      "select click_count from blg_article where id=:articleId",
      {
        replacements: { articleId },
        type: sequelize.QueryTypes.SELECT
      }
    );
    const clickCount = ++countArr[0].click_count;
    this.sql =
      "update blg_article set click_count = :clickCount where id = :articleId";
    return await sequelize.query(this.sql, {
      replacements: { clickCount, articleId },
      type: sequelize.QueryTypes.UPDATE
    });
  }

  public async getArticleRecommendLinksByArticleId(articleId) {
    this.sql = "select * from blg_links where article_id=:articleId;";
    return await sequelize.query(this.sql, {
      replacements: { articleId },
      type: sequelize.QueryTypes.SELECT
    });
  }
}
