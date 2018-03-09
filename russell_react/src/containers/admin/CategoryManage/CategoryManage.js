import React from 'react';
import {Button, message, Select} from 'antd';
import CategoryModal from './CategoryModal';
import blogService from "../../../services/BlogServices";
import './CategoryManage.less';

const Option = Select.Option;

class CategoryManage extends React.Component {

    constructor() {
        super();
        this.categoryTemp = null;   // 类目缓存数据
        this.state = {
            children1: [],
            children2: [],
            children3: [],
            categoryData: []
        };
    }

    componentDidMount() {
        this.getAllCategories();
    }

    render() {
        const {children1, children2, children3} = this.state;
        return (
            <div className="CategoryManage">
                <div className="category-item">
                    <section>一级类目：</section>
                    <Select
                        placeholder={'请选择'}
                        onSelect={this.handleChange1}
                        style={{width: 300}}
                    >
                        <Option key={0}>添加</Option>
                        {children1}
                    </Select>
                    <Button type="danger" style={{margin: '0 10px'}} onClick={this.delCategory}>删除</Button>
                    <Button type="danger" onClick={this.editCategory}>编辑</Button>
                </div>
                <div className="category-item">
                    <section>二级类目：</section>
                    <Select
                        placeholder={'请选择'}
                        onSelect={this.handleChange2}
                        style={{width: 300}}
                    >
                        <Option key={0}>添加</Option>
                        {children2}
                    </Select>
                    <Button type="danger" style={{margin: '0 10px'}} onClick={this.delCategory}>删除</Button>
                    <Button type="danger" onClick={this.editCategory}>编辑</Button>
                </div>
                <div className="category-item">
                    <section>三级类目：</section>
                    <Select
                        placeholder={'请选择'}
                        onSelect={this.handleChange3}
                        style={{width: 300}}
                    >
                        <Option key={0}>添加</Option>
                        {children3}
                    </Select>
                    <Button type="danger" style={{margin: '0 10px'}} onClick={this.delCategory}>删除</Button>
                    <Button type="danger" onClick={this.editCategory}>编辑</Button>
                </div>
                <div className="category-item">
                    <Button style={{width: 300}} type="primary" onClick={this.handleSubmit}>提交</Button>
                </div>
                <CategoryModal ref="categoryModal"/>
            </div>
        );
    }

    handleChange1 = (value, option) => {
        if (parseInt(value, 10)) {
            const {categoryData} = this.state;
            const children = [];
            this.getChildren(parseInt(value, 10), categoryData);
            for (let i = 0; i < this.categoryTemp.length; i++) {
                children.push(
                    <Option key={this.categoryTemp[i].id + 's'}
                            value={this.categoryTemp[i].id}>{this.categoryTemp[i].name}</Option>
                );
            }
            this.setState({children2: children});
        } else {
            // refs下的属性首字母必须小写：categoryModal
            this.refs['categoryModal'].setModal2Visible(true);
        }
    };

    handleChange2 = (value, option) => {
        if (parseInt(value, 10)) {
            const {categoryData} = this.state;
            const children = [];
            this.getChildren(parseInt(value, 10), categoryData);
            for (let i = 0; i < this.categoryTemp.length; i++) {
                children.push(
                    <Option key={this.categoryTemp[i].id + 's'}
                            value={this.categoryTemp[i].id}>{this.categoryTemp[i].name}</Option>
                );
            }
            this.setState({children3: children});
        } else {
            // refs下的属性首字母必须小写：categoryModal
            this.refs['categoryModal'].setModal2Visible(true);
        }
    };

    handleChange3 = () => {

    };

    delCategory = () => {

    };

    editCategory = () => {

    };

    getChildren (id, data) {
        if (!data || !data.length) {
            return;
        }
        data.map(item => {
            if (item.id === parseInt(id, 10)) {
                this.categoryTemp = item.subCategory;
            } else {
                return this.getChildren(id, item.subCategory);
            }
            return this.categoryTemp;
        });
    }

    // get all categories data in json string.
    getAllCategories() {
        blogService.getAllCategories()
            .then(data => {
                if (data.success) {
                    const children = data.data.map(item => {
                        return <Option key={item.id}>{item.name}</Option>;
                    });
                    this.setState({children1: children});
                    this.setState({categoryData: data.data});
                } else {
                    message.warning(data.msg);
                }
            })
            .catch(e => message.error(`错误：${e}`));
    }
}

export default CategoryManage;