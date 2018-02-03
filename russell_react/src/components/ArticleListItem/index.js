import React from 'react';
import {Avatar, Card, Icon} from 'antd';
import {bareImg} from '../../assets';
import './index.less';

class ArticleListItem extends React.Component {

    render() {
        return (
            <Card
                className="ArticleListItem"
                cover={<img alt="example" src={bareImg}/>}
                actions={[<Icon type="like-o" onClick={this.handleLikeClick}/>, <Icon type="dislike-o"/>, <Icon type="share-alt"/>]}
            >
                <Card.Meta
                    avatar={<Avatar src={this.props.data.avatar ? this.props.data.avatar: 'https://cn.vuejs.org/images/logo.png'}/>}
                    title={this.props.data.title}
                    description={this.props.data.description}
                />
            </Card>
        );
    }

    handleLikeClick = (e) => {
        e.preventDefault();
        console.log(e);
    };
}

export default ArticleListItem;