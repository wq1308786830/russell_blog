import React from 'react';
import PropTypes from 'prop-types';
import { Col, Layout, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import RecommendLinks from '../../components/RecommendLinks';
import BlogServices from '../../services/BlogServices';
import './ArticleDetail.less';

class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: props.match.params.articleId,
      articleDetail: this.articleDetail
    };
  }

  componentDidMount() {
    const { articleId } = this.state;
    this.getArticleDetail(articleId);
  }

  getArticleDetail(articleId) {
    BlogServices.getArticleDetail(articleId)
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
    const textType = articleDetail ? articleDetail.text_type : 'md';
    return (
      <Layout className="ArticleDetail">
        <Col span={16} style={{ paddingRight: '30px' }}>
          <h1>{title}</h1>
          <div className="detail-container">
            {textType === 'md' ? (
              <ReactMarkdown source={content} />
            ) : (
              <p dangerouslySetInnerHTML={this.createHtml(content)} />
            )}
          </div>
        </Col>
        <Col span={8} style={{ marginTop: '174px' }}>
          <RecommendLinks articleId={articleId} />
        </Col>
      </Layout>
    );
  }
}

ArticleDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      articleId: PropTypes.string
    })
  }).isRequired
};

export default ArticleDetail;
