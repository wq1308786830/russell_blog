import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import BlogServices from '../../services/BlogServices';
import ArticleListItem from '../../components/ArticleListItem';

class ArticleListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.articleList = [];
    this.service = new BlogServices();
    this.state = {
      articleList: this.articleList
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getArticleList(match.params.categoryId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { match } = this.props;
    const { articleList } = this.state;
    if (match.params.categoryId !== nextProps.match.params.categoryId) {
      this.getArticleList(nextProps.match.params.categoryId);
      return true;
    }
    return articleList !== nextState.articleList;
  }

  getArticleList(key) {
    this.service
      .getArticleList(key)
      .then(data => {
        if (data.success) {
          this.renderArticleList(data.data);
        } else {
          this.articleList = [];
          this.setState({ articleList: this.articleList });
          message.warning(data.msg);
        }
      })
      .catch(e => message.error(`错误：${e}`));
  }

  renderArticleList(data) {
    const { match } = this.props;
    this.articleList = data.map(item => (
      <Link key={item.id} to={`${match.url}/${item.id}/detail`}>
        <ArticleListItem data={item} />
      </Link>
    ));
    this.setState({ articleList: this.articleList });
  }

  render() {
    const { articleList } = this.state;
    return articleList;
  }
}

ArticleListContainer.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      categoryId: PropTypes.string
    })
  }).isRequired
};

export default ArticleListContainer;
