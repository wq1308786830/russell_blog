import React from 'react';
import {Col, Layout, message} from "antd";
import RecommendLinks from "../../components/RecommendLinks";
import blogService from "../../services/BlogServices";
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
                <Col span={16} style={{paddingRight: '30px'}}>
                    <h1>{this.state.articleDetail ? this.state.articleDetail.title : ''}</h1>
                    <p>{this.state.articleDetail ? this.state.articleDetail.content : ''}</p>
                </Col>
                <Col span={8} style={{marginTop: '174px'}}>
                    <RecommendLinks articleId={this.state.articleId}/>
                </Col>
            </Layout>
        );
    }

    getArticleDetail(articleId) {
        blogService.getArticleDetail(articleId)
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