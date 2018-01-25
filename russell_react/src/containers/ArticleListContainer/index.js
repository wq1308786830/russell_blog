import React from 'react';
import {Link} from "react-router-dom";
import {message} from "antd";
import {blogServices} from "../../services/blogServices";
import ArticleListItem from "../../components/ArticleListItem";

class ArticleListContainer extends React.Component {

    articleList = [];

    constructor(props) {
        super(props);
        this.state = {
            categoryId: this.props.match.params.categoryId,
            articleList: this.articleList
        }
    }

    componentDidMount() {
        this.getArticleListByKey(this.props.match.params.categoryId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
            this.getArticleListByKey(nextProps.match.params.categoryId);
            return true;
        }
        if (this.state.articleList !== nextState.articleList) {
            return true;
        }
        return false;
    }

    render() {
        return this.state.articleList;
    }

    renderArticleList(data) {
        this.articleList = data.map(item => (
            <Link key={item.id} to={`${this.props.match.url}/${item.id}/detail`}>
                <ArticleListItem data={item}/>
            </Link>
        ));
        this.setState({articleList: this.articleList});
    }

    getArticleListByKey(key) {
        blogServices.getArticleListByKey(key)
            .then(data => {
                if (data.success) {
                    this.renderArticleList(data.data);
                } else {
                    this.articleList = [];
                    this.setState({articleList: this.articleList});
                    message.warning(data.msg);
                }
            })
            .catch(e => message.error(`错误：${e}`));
    }
}

export default ArticleListContainer;