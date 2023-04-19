import { Button, Modal, Skeleton, Space, Table, Tag } from 'antd';
import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';

import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { getCategories, clearCategoryState, deleteCategory } from '../../redux/actions/categoryAction';

const { Column, ColumnGroup } = Table;

class ListCategory extends Component {
    constructor() {
        super();
        this.state = {
            category: {},
        };
    }

    componentDidMount = () => {
        this.props.getCategories();
        console.log('did mount');
    };

    componentWillUnmount = () => {
        this.props.clearCategoryState();
        console.log('will unmount');
    };

    editCategory = (category) => {
        console.log(category);
        const { navigate } = this.props.router;
        navigate('/categories/update/' + category.id);
    };

    deleteCategory = () => {
        console.log(this.state.category);
        this.props.deleteCategory(this.state.category.id);
    };

    openDeleteConfirmModal = (category) => {
        // this.setState({ ...this.state, category: category });

        // console.log(category);
        // const message = 'Do you want to delete the category ' + category.name;

        // Modal.confirm({
        //     title: 'Confirm',
        //     icon: <ExclamationCircleOutlined />,
        //     content: message,
        //     onOk: this.deleteCategory,
        //     okText: 'Delete',
        //     cancelText: 'Cancel',
        // });
        console.log(category);
        const message = 'Do you want to delete the category ' + category.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: () => {
                this.props.deleteCategory(category.id);
                this.setState({ category: {} });
            },
            onCancel: () => {
                this.setState({ category: {} });
            },
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };
    render() {
        const { navigate } = this.props.router;

        const { categories, isLoading } = this.props;

        if (isLoading) {
            return (
                <>
                    <ContentHeader
                        navigate={navigate}
                        title="List Categories"
                        className="site-page-header"
                    ></ContentHeader>
                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="List Categories" className="site-page-header"></ContentHeader>
                <Table dataSource={categories} size="small" rowKey="id">
                    <ColumnGroup>
                        <Column
                            title="Category ID"
                            key="categories.id"
                            dataIndex="id"
                            width={40}
                            align="center"
                        ></Column>
                        <Column title="Name" key="categories.name" dataIndex="name"></Column>
                        <Column
                            title="Status"
                            key="status"
                            dataIndex="status"
                            width={80}
                            render={(_, { status }) => {
                                let color = 'volcano';
                                let name = 'In-visible';
                                if (status === 'Visible') {
                                    color = 'green';
                                    name = 'visible';
                                }
                                return <Tag color={color}>{name}</Tag>;
                            }}
                        ></Column>
                        <Column
                            title="Action"
                            key="action"
                            width={150}
                            align="center"
                            render={(_, record) => (
                                <Space size="middle">
                                    <Button
                                        key={record.key}
                                        type="primary"
                                        size="small"
                                        onClick={() => this.editCategory(record)}
                                    >
                                        <EditOutlined style={{ marginRight: 8 }} /> Edit
                                    </Button>
                                    <Button
                                        key={record.key}
                                        type="primary"
                                        danger
                                        size="small"
                                        onClick={() => this.openDeleteConfirmModal(record)}
                                    >
                                        <DeleteOutlined style={{ marginRight: 8 }} />
                                        Delete
                                    </Button>
                                </Space>
                            )}
                        ></Column>
                    </ColumnGroup>
                </Table>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getCategories,
    clearCategoryState,
    deleteCategory,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCategory));
