import React from 'react';
import {Layout, message} from "antd";
import {blogServices} from "../../services/blogServices";
import './ArticleDetail.less'

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articleId: this.props.match.params.articleId,
            articleDetail: this.articleDetail
        };
    }

    componentDidMount() {
        this.getArticleDetail(this.state.articleId);
    }

    render() {
        return (
            <Layout className="ArticleDetail">
                <h3>{this.state.articleDetail ? this.state.articleDetail.title : ''}</h3>
                <p>{this.state.articleDetail ? this.state.articleDetail.content : ''}</p>
            </Layout>
        );
    }

    getArticleDetail(articleId) {
        blogServices.getArticleDetail(articleId)
            .then(data => {
                if (data.success) {
                    this.setState({articleDetail: data.data});
                } else {
                    this.setState({articleDetail: null});
                    message.warning(data.msg);
                }
            })
            .catch(e => message.error(`错误：${e}`));
    }
}

export default ArticleDetail;