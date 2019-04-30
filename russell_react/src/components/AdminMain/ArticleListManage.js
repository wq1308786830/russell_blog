import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar, Button, Cascader, DatePicker, Input, List, message, Popconfirm, Spin,
} from 'antd';
import './ArticleListManage.less';
import AdminServices from '../../services/AdminServices';
import BlogServices from '../../services/BlogServices';

class ArticleListManage extends React.Component {
  constructor(props) {
    super(props);
    this.adminService = new AdminServices();
    this.state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageIndex: 0,
      options: [],
      cOptions: {
        categoryId: '',
        dateRange: [],
        text: '',
      },
    };
  }

  componentDidMount() {
    const { cOptions, pageIndex } = this.state;
    this.getAllCategories();
    this.getArticlesData(cOptions, pageIndex, (res) => {
      if (res.length < 2) {
        this.setState({ showLoadingMore: false });
      }
      this.setState({
        loading: false,
        data: res,
      });
    });
  }

    onCascaderChange = (value) => {
      const { cOptions } = this.state;
      this.changeSelectState();
      this.setState({ category: value }, () => {
        this.setState({ cOptions: { ...cOptions, categoryId: value[value.length - 1] } });
      });
    };

    onRangePickerChange = (dates) => {
      const { cOptions } = this.state;
      this.changeSelectState();
      this.setState({ dateRange: dates }, () => {
        this.setState({ cOptions: { ...cOptions, dateRange: [dates[0].unix(), dates[1].unix()] } });
      });
    };

    onInputChange = (e) => {
      e.persist();
      const { cOptions } = this.state;
      this.changeSelectState();
      this.setState({ text: e.target.value }, () => {
        this.setState({ cOptions: { ...cOptions, text: e.target.value } });
      });
    };

    /**
   *  get articles by conditions in data `option` and page number pageIndex.
   *  callback function will deal response data.
   */
    getArticlesData(option, pageIndex, callback) {
      this.adminService.getArticles(option, pageIndex)
        .then((data) => {
          if (data.success) {
            callback(data.data);
          } else {
            callback([]);
          }
        }).catch(err => message.error(`错误：${err}`));
    }


  onSearchClick = () => {
    const { cOptions, pageIndex } = this.state;
    this.setState({ needSelect: true }, () => {
      this.getArticlesData(cOptions, pageIndex, (res) => {
        if (res.length < 2) {
          this.setState({ showLoadingMore: false });
        }
        this.setState({
          showLoadingMore: true,
          loading: false,
          data: res,
        });
      });
    });
  };

    // handle load more button click event.
    onLoadMore = () => {
      let { pageIndex } = this.state;
      const { cOptions, data } = this.state;
      this.setState({
        loadingMore: true,
      });
      this.setState({ pageIndex: ++pageIndex }, () => {
        this.getArticlesData(cOptions, pageIndex, (res) => {
          if (res.length < 2) {
            this.setState({ pageIndex: --pageIndex, showLoadingMore: false });
          }
          const datas = data.concat(res);
          this.setState({
            datas,
            loadingMore: false,
          }, () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          });
        });
      });
    };

    // get category select options data.
    getAllCategories() {
      const blogService = new BlogServices();
      blogService.getAllCategories()
        .then((data) => {
          if (data.success) {
            this.setState({ options: this.handleOptions(data.data, []) });
          } else {
            message.warning(data.msg);
          }
        }).catch(err => message.error(`错误：${err}`));
    }

  // change pageIndex number and needSelect status when selected condition changes.
  changeSelectState = () => {
    const { pageIndex } = this.state;
    this.setState({ needSelect: false });
    if (pageIndex > 0) {
      this.setState({ pageIndex: 0 });
    }
  };

  confirm = (article) => {
    const { data } = this.state;
    this.adminService.deleteArticle(article.id)
      .then((res) => {
        if (res.success) {
          const deletedItem = data.filter(item => item.id !== article.id);
          this.setState({ data: deletedItem });
          message.success(`博文${article.title}，删除成功！`);
        }
      }).catch(err => message.error(`错误：${err}`));
  };


  /**
   * The recursive function to change option's key name.
   * @param data:input option array data.
   * @param optionData:output option array data.
   * @returns optionData: output option array data.
   */
  handleOptions(data, optionData) {
    const options = { ...optionData };
    for (let i = 0; i < data.length; i++) {
      options[i] = { value: data[i].id, label: data[i].name };
      if (data[i].subCategory && data[i].subCategory.length) {
        this.handleOptions(data[i].subCategory, options[i].children = []);
      }
    }
    return options;
  }

  render() {
    const {
      loading, loadingMore, showLoadingMore, data, options, category, dateRange, text,
    } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        {loadingMore && <Spin />}
        {(!loadingMore && data.length) ? <Button onClick={this.onLoadMore}>加载更多</Button> : null}
      </div>
    ) : <div className="ant-list-empty-text">没更多数据了</div>;
    return (
      <div>
        <Input.Group compact style={{ textAlign: 'center', paddingBottom: '2em' }}>
          <Cascader
            name="category"
            value={category}
            style={{ width: 300 }}
            options={options}
            placeholder="类目"
            onChange={this.onCascaderChange}
            changeOnSelect
          />
          <DatePicker.RangePicker
            name="dateRange"
            value={dateRange}
            onChange={this.onRangePickerChange}
            placeholder={['开始时间', '截止时间']}
          />
          <Input
            name="text"
            value={text}
            placeholder="模糊搜索"
            onChange={this.onInputChange}
            style={{ width: 200 }}
          />
          <Button type="primary" icon="search" onClick={this.onSearchClick}>过滤</Button>
        </Input.Group>
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[
              <Link
                to={{
                  state: { articleDetail: item, category, options },
                  pathname: `/admin/articleEdit/${item.category_id}/${item.id}`,
                }}
              >
                  编辑
              </Link>,
              <Popconfirm
                title="确定要删除吗?"
                onConfirm={() => this.confirm(item)}
                okText="确定"
                cancelText="取消"
              >
                <Link to="">删除</Link>
              </Popconfirm>]}
            >
              <List.Item.Meta
                avatar={(
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                )}
                title={(
                  <Link
                    to={`/category/${item.category_id}/articles/${item.id}/detail`}
                    target="_blank"
                  >
                    {item.title}
                  </Link>
                )}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ArticleListManage;
