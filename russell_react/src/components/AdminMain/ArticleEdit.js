import React from 'react';
import {Button, Cascader, Input, Layout, message} from "antd";
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import blogService from "../../services/BlogServices";
import adminService from "../../services/AdminServices";
import "./ArticleEdit.less";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class ArticleEdit extends React.Component {

    constructor(props) {
        super(props);
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                options: [],
                categoryId: '',
                editorState,
                title: '',
                category: []
            };
        }
    }

    componentDidMount() {
        this.getAllCategories();
    }

    render() {
        const {editorState, options} = this.state;
        return (
            <Layout className="ArticleEdit">
                <div>
                    <Input.Group compact>
                        <Cascader name="category" value={this.state.category} style={{width: 300}}
                                  options={options} placeholder={"类目"} onChange={this.onCascaderChange}
                                  changeOnSelect/>
                        <Input name="title" value={this.state.title} style={{width: 400}} placeholder="标题" onChange={this.onInputChange}/>
                        <Button type="primary" onClick={this.onClickPublish}>是时候让大家看看神的旨意了</Button>
                    </Input.Group>
                </div>
                <Editor
                    editorState={editorState}
                    toolbarClassName="rdw-storybook-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor"
                    toolbar={{
                        image: {uploadCallback: this.uploadImageCallBack, previewImage: true,}
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
                <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}/>
            </Layout>
        );
    }

    onCascaderChange = (value, selectedOptions) => {
        this.setState({category: value}, () => {
            this.setState({categoryId: value[value.length - 1]});
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onInputChange = (e) => {
        this.setState({title: e.target.value});
    };

    onClickPublish = () => {
        const {title, categoryId, editorState} = this.state;
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        adminService.publishArticle({title, categoryId, content})
            .then(data => {
                if (data.success) {

                }else {
                    message.warning(data.msg);
                }
            }).catch(err => message.error(`错误：${err}`));
    };

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
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
            }
        );
    };

    // get category select options data.
    getAllCategories() {
        blogService.getAllCategories()
            .then(data => {
                if (data.success) {
                    this.setState({options: this.handleOptions(data.data, [])});
                } else {
                    message.warning(data.msg);
                }
            }).catch(err => message.error(`错误：${err}`));
    }

    handleOptions(data, optionData) {
        for (let i = 0; i < data.length; i++) {
            optionData[i] = {value: data[i].id, label: data[i].name};
            if (data[i].subCategory && data[i].subCategory.length) {
                this.handleOptions(data[i].subCategory, optionData[i].children = []);
            }
        }
        return optionData;
    }
}


export default ArticleEdit;