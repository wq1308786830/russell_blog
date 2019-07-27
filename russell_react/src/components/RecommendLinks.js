import React from 'react';
import PropTypes from 'prop-types';
import { Layout, message } from 'antd';
import BlogServices from '../services/BlogServices';
import './RecommendLinks.less';

class RecommendLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendLinks: null
    };
  }

  componentDidMount() {
    const { articleId } = this.props;
    this.getArticleRecommendLinks(articleId);
  }

  getArticleRecommendLinks(articleId) {
    BlogServices.getArticleRecommendLinks(articleId)
      .then(data => {
        if (data.success) {
          this.setState({ recommendLinks: data.data });
        } else {
          this.setState({ recommendLinks: null });
          message.warning(data.msg);
        }
      })
      .catch(e => message.error(`错误：${e}`));
  }

  render() {
    const { recommendLinks } = this.state;
    const LinkList = (recommendLinks || []).map(item => (
      <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    ));
    return (
      <Layout className="RecommendLinks">
        <h2>参考文献</h2>
        <a href="https://github.com/wq1308786830" target="_blank" rel="noopener noreferrer">
          Russell GitHub.
        </a>
        {LinkList}
      </Layout>
    );
  }
}

RecommendLinks.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default RecommendLinks;
