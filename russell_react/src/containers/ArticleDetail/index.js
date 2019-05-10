import React from 'react';
import { Col, Layout, message } from 'antd';
import RecommendLinks from '../../components/RecommendLinks';
import BlogServices from '../../services/BlogServices';
import './ArticleDetail.less';

class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.service = new BlogServices();
    this.state = {
      articleId: props.match.params.articleId,
      articleDetail: this.articleDetail,
    };
  }

  componentDidMount() {
    const { articleId } = this.state;
    this.getArticleDetail(articleId);
  }

  getArticleDetail(articleId) {
    this.service
      .getArticleDetail(articleId)
      .then(data => {
        if (data.success) {
          this.setState({ articleDetail: data.data });
        } else {
          this.setState({ articleDetail: null });
          message.warning(data.msg);
        }
      })
      .catch(e => message.error(`错误：${e}`));
  }

  createHtml = content => ({ __html: content });

  render() {
    const { articleDetail, articleId } = this.state;
    const title = articleDetail ? articleDetail.title : '';
    const content = articleDetail ? articleDetail.content : '';
    return (
      <Layout className="ArticleDetail">
        <Col span={16} style={{ paddingRight: '30px' }}>
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={this.createHtml(content)} />
        </Col>
        <Col span={8} style={{ marginTop: '174px' }}>
          <RecommendLinks articleId={articleId} />
        </Col>
      </Layout>
    );
  }
}

export default ArticleDetail;
