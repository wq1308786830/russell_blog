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
        const title = this.state.articleDetail ? this.state.articleDetail.title : '';
        const content = this.state.articleDetail ? this.state.articleDetail.content : '';
        return (
            <Layout className="ArticleDetail">
                <Col span={16} style={{paddingRight: '30px'}}>
                    <h1>{title}</h1>
                    <p dangerouslySetInnerHTML={this.createHtml(content)}/>
                </Col>
                <Col span={8} style={{marginTop: '174px'}}>
                    <RecommendLinks articleId={this.state.articleId}/>
                </Col>
            </Layout>
        );
    }

    createHtml = (content) => {
        return {__html: content};
    };

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