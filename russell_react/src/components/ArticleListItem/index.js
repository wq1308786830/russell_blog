import React from 'react';
import {Avatar, Card, Icon} from 'antd';
import {bareImg} from '../../assets';
import './index.less';

class ArticleListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.data.id,
            title: props.data.title,
            description: props.data.description,
        }
    }

    render() {
        return (
            <Card
                className="ArticleListItem"
                cover={<img alt="example" src={bareImg}/>}
                actions={[<Icon type="like-o" onClick={this.handleLikeClick}/>, <Icon type="dislike-o"/>, <Icon type="share-alt"/>]}
            >
                <Card.Meta
                    avatar={<Avatar src="https://cn.vuejs.org/images/logo.png"/>}
                    title={this.state.title}
                    description={this.state.description}
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