import React from 'react';
import {
  Button, Cascader, Input, Layout, message,
} from 'antd';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Config, env } from '../../utils/utils';
import BlogServices from '../../services/BlogServices';
import AdminServices from '../../services/AdminServices';
import './ArticleEdit.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.articleDetail = {};
    this.adminService = new AdminServices();

    const { articleDetail, category, options } = props.location.state ? props.location.state : {};
    const { categoryId } = props.match.params;
    const html = articleDetail ? articleDetail.content : '';
    const contentBlock = htmlToDraft(html);
    this.articleDetail = articleDetail;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        options: options || [],
        categoryId: categoryId || '',
        editorState,
        title: articleDetail ? articleDetail.title : '',
        category: category || [],
      };
    }
  }

  componentDidMount() {
    this.getAllCategories();
  }

  onCascaderChange = (value) => {
    this.setState({ category: value }, () => {
      this.setState({ categoryId: value[value.length - 1] });
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onInputChange = (e) => {
    this.setState({ title: e.target.value });
  };

  onClickPublish = () => {
    let body = null;
    const { title, categoryId, editorState } = this.state;
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (this.articleDetail) {
      body = {
        title, categoryId, content, id: this.articleDetail.id,
      };
      this.change(body);
    } else {
      body = { title, categoryId, content };
      this.publish(body);
    }
  };

  // get category select options data.
  getAllCategories() {
    new BlogServices().getAllCategories()
      .then((data) => {
        if (data.success) {
          this.setState({ options: this.handleOptions(data.data, []) });
        } else {
          message.warning(data.msg);
        }
      }).catch(err => message.error(`错误：${err}`));
  }

  uploadImageCallBack = file => new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${Config[env]}/manage/uploadBlgImg`);
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );

  publish(body) {
    this.adminService.publishArticle(body)
      .then((data) => {
        if (data.success) {
          message.success('发布成功！');
          console.log(`effected rows:${data.data[1]}, row id:${data.data[0]}`);
        } else {
          message.warning(data.msg);
        }
      }).catch(err => message.error(`错误：${err}`));
  }

  change(body) {
    .changeArticle(body)
      .then((data) => {
        if (data.success) {
          message.success('更改成功！');
          console.log(`effected rows:${data.data[1]}, row id:${data.data[0]}`);
        } else {
          message.warning(data.msg);
        }
      }).catch(err => message.error(`错误：${err}`));
  }

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
      editorState, options, title, category,
    } = this.state;
    return (
      <Layout className="ArticleEdit">
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Input.Group compact>
            <Cascader
              name="category"
              value={category}
              style={{ maxWidth: 300 }}
              options={options}
              placeholder="类目"
              onChange={this.onCascaderChange}
              changeOnSelect
            />
            <Input
              name="title"
              value={title}
              style={{ width: 280 }}
              placeholder="标题"
              onChange={this.onInputChange}
            />
          </Input.Group>
          <Button type="primary" onClick={this.onClickPublish}>是时候让大家看看神的旨意了</Button>
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, previewImage: true },
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </Layout>
    );
  }
}


export default ArticleEdit;
