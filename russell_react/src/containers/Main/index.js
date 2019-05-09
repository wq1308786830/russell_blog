import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb, Icon, Layout, Menu, message,
} from 'antd';
import BlogServices from '../../services/BlogServices';
import ContentRouter from '../../Routers';
import FancyMusicPlayer from '../../components/FancyMusicPlayer';
import './index.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.blogService = new BlogServices();

    this.currTagIndex = 2;
    this.bigTags = [];
    this.articleList = [];
    this.subCategories = [];
    this.categoriesTree = [];

    this.state = {
      bigTags: this.bigTags,
      currTagIndex: this.currTagIndex,
      categoriesTree: this.categoriesTree,
    };
  }

  componentDidMount() {
    this.getAllCategories();
  }


  // 获取所有类目菜单数据
  getAllCategories() {
    this.blogService.getAllCategories()
      .then((data) => {
        if (data.success) {
          this.renderBigTags(data.data);
        } else {
          message.warning(data.msg);
        }
      })
      .catch(e => message.error(`错误：${e}`));
  }

  // 处理导航栏一级菜单点击事件
  handleItemClick = (itemData) => {
    this.setState({ currTagIndex: itemData.key });
  };

  /**
   * 更新state里的category从而渲染类目
   * @param data: categories json data
   */
  renderBigTags(data) {
    this.bigTags = data.map((itemL1) => {
      this.renderCategoriesTree(itemL1);
      return <Menu.Item key={itemL1.id}>{itemL1.name}</Menu.Item>;
    });
    this.setState({ bigTags: this.bigTags });
  }

  renderCategoriesTree(itemL1) {
    this.categoriesTree[itemL1.id] = itemL1.subCategory.length > 0
      ? itemL1.subCategory.map((itemL2) => {
        this.renderSubCategory(itemL2);
        const { subCategories } = this;
        return (
          <SubMenu
            key={itemL2.id}
            title={(
              <span>
                <Icon
                  type="swap-right"
                  style={{ color: '#009999' }}
                />
                {itemL2.name}
              </span>
            )}
          >
            {subCategories[itemL2.id]}
          </SubMenu>
        );
      }) : [];
    this.setState({ categoriesTree: this.categoriesTree });
  }

  renderSubCategory(itemL2) {
    this.subCategories[itemL2.id] = itemL2.subCategory.length > 0
      ? itemL2.subCategory.map(itemL3 => (
        <Menu.Item key={itemL3.id}>
          <Link to={`/category/${itemL3.id}/articles`}>{itemL3.name}</Link>
        </Menu.Item>
      )) : [];
  }


  render() {
    // todo: 当子类没有文章时，不显示子类一级递归上去满足条件的父类
    const { bigTags, categoriesTree, currTagIndex } = this.state;
    return (
      <Layout className="Main">
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            onClick={this.handleItemClick}
            style={{ lineHeight: '62px' }}
          >
            {bigTags}
          </Menu>
        </Header>
        <Layout className="background-img">
          <Sider
            breakpoint="xs"
            collapsedWidth="1000"
            width={260}
            className="custom-scroll sider-rgba"
          >
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
            >
              {categoriesTree[currTagIndex]}
            </Menu>
          </Sider>
          <Layout className="rgba-background" style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="content-container custom-scroll">
              <ContentRouter />
              <FancyMusicPlayer />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
