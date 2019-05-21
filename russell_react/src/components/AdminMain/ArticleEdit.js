import React from 'react';
import { Button, Cascader, Input, Layout, message, Switch } from 'antd';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import MonacoEditor from 'react-monaco-editor';
import { Config, env } from '../../utils/utils';
import BlogServices from '../../services/BlogServices';
import AdminServices from '../../services/AdminServices';
import './ArticleEdit.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ReactMarkdown = require('react-markdown');

class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.adminService = new AdminServices();
    this.blogService = new BlogServices();

    const { categoryId, articleId } = props.match.params;
    this.state = {
      title: '',
      options: [],
      category: [],
      textType: 'md',
      editorState: null,
      resize: { flex: 1 },
      markdownContent: '',
      articleId: parseInt(articleId, 10) || '',
      categoryId: categoryId || '',
    };

    this.editorChanged = this.editorChanged.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
    this.getArticleDetail();
    window.addEventListener('resize', () => this.updateDimensions);
  }

  onCascaderChange(value) {
    this.setState({ category: value }, () => {
      this.setState({ categoryId: value[value.length - 1] });
    });
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  onInputChange = e => {
    this.setState({ title: e.target.value });
  };

  onClickPublish = () => {
    const {
      title,
      articleId,
      categoryId,
      editorState,
      textType,
      markdownContent,
    } = this.state;
    let content = '';
    if (textType === 'md') {
      content = markdownContent;
    } else {
      const rawContent = convertToRaw(editorState.getCurrentContent());
      content = draftToHtml(rawContent);
    }

    const body = {
      title,
      categoryId,
      content,
      textType,
    };

    if (articleId) {
      body.id = articleId;
    }
    this.publish(body);
  };

  onEditorChange(newValue, e) {
    console.log('onChange', newValue, e);
    this.setState({ markdownContent: newValue });
  }

  async getArticleDetail() {
    const { articleId } = this.state;
    if (!articleId) return;
    const resp = await this.blogService
      .getArticleDetail(articleId)
      .catch(err => message.error(`错误：${err}`));
    if (resp.success) {
      this.initArticle(resp.data);
    } else {
      message.warning(resp.msg);
    }
  }

  // get category select options data.
  async getAllCategories() {
    const resp = await this.blogService
      .getAllCategories()
      .catch(err => message.error(`错误：${err}`));
    if (resp.success) {
      this.setState({ options: this.handleOptions(resp.data, []) });
    } else {
      message.warning(resp.msg);
    }
  }

  uploadImageCallBack = file =>
    new Promise((resolve, reject) => {
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
    });

  updateDimensions() {
    this.setState({ resize: { flex: 1 } });
  }

  /**
   * 解析html文章展示
   * @param articleDetail
   */
  initHtmlArticle(articleDetail) {
    const html = articleDetail ? articleDetail.content : '';
    const contentBlock = htmlToDraft(html);
    let editorState;
    this.articleDetail = articleDetail;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  /**
   * 解析文档展示
   * @param detail
   */
  initArticle(detail) {
    if (detail.text_type === 'md') {
      this.setState({
        markdownContent: detail.content,
      });
    } else if (detail.text_type === 'html') {
      this.initHtmlArticle(detail);
    }
    this.setState({
      title: detail.title,
      textType: detail.text_type,
      category: detail.category ? Object.values(detail.category) : [],
    });
  }

  async publish(body) {
    const resp = await this.adminService
      .publishArticle(body)
      .catch(err => message.error(`错误：${err}`));
    if (resp.success) {
      message.success('发布成功！');
      console.log(`effected rows:${resp.data[1]}, row id:${resp.data[0]}`);
    } else {
      message.warning(resp.msg);
    }
  }

  handleOptions(data, optionData) {
    for (let i = 0; i < data.length; i++) {
      optionData[i] = { value: data[i].id, label: data[i].name };
      if (data[i].subCategory && data[i].subCategory.length) {
        this.handleOptions(data[i].subCategory, (optionData[i].children = []));
      }
    }
    return optionData;
  }

  editorChanged(checked) {
    this.setState({ textType: checked ? 'md' : 'html' });
  }

  render() {
    const {
      title,
      resize,
      options,
      category,
      textType,
      editorState,
      markdownContent,
    } = this.state;
    const editorConfig = {
      renderSideBySide: false,
      selectOnLineNumbers: true,
    };
    return (
      <Layout className="ArticleEdit">
        <div
          style={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Input.Group compact>
            <Cascader
              name="category"
              value={category}
              style={{ maxWidth: 300, width: 300 }}
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
          <Button type="primary" onClick={this.onClickPublish}>
            是时候让大家看看神的旨意了
          </Button>
          <Switch
            checkedChildren="Markdown"
            unCheckedChildren="RichText"
            onChange={this.editorChanged}
            checked={textType === 'md'}
          />
        </div>
        {textType === 'md' ? (
          <div className="markdown-container">
            <div className="monaco-container" style={resize}>
              <MonacoEditor
                language="markdown"
                theme="vs-light"
                value={markdownContent}
                options={editorConfig}
                onChange={this.onEditorChange}
              />
            </div>
            <div className="preview-container">
              <ReactMarkdown source={markdownContent} />
            </div>
          </div>
        ) : (
          <Editor
            editorState={editorState}
            toolbarClassName="rdw-storybook-toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            toolbar={{
              image: {
                uploadCallback: this.uploadImageCallBack,
                previewImage: true,
              },
            }}
            onEditorStateChange={this.onEditorStateChange}
          />
        )}
      </Layout>
    );
  }
}

export default ArticleEdit;
