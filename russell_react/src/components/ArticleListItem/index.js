import React from 'react';
import { Avatar, Card, Icon } from 'antd';
import { bareImg } from '../../assets';
import './index.less';

class ArticleListItem extends React.Component {
  handleLikeClick = e => {
    e.preventDefault();
    console.log(e);
  };

  render() {
    const { data } = this.props;
    return (
      <Card
        className="ArticleListItem"
        cover={<img alt="example" src={bareImg} />}
        actions={[
          <Icon type="like-o" onClick={this.handleLikeClick} />,
          <Icon type="dislike-o" />,
          <Icon type="share-alt" />,
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar
              src={
                data.avatar
                  ? data.avatar
                  : 'https://cn.vuejs.org/images/logo.png'
              }
            />
          }
          title={data.title}
          description={data.description}
        />
      </Card>
    );
  }
}

export default ArticleListItem;
