import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import ManufacturerList from './ManufacturerList';
import withRouter from '../../helpers/withRouter';
import { Button, Col, Form, Input, Modal, Pagination, Row } from 'antd';
import ManufacturerForm from './ManufacturerForm';
import { connect } from 'react-redux';
import {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
    getManufacturersByName,
} from '../../redux/actions/ManufacturerAction';
import { ExclamationCircleOutlined } from '@ant-design/icons';

class ListManufacturers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            manufacturer: { id: '', name: '', logo: '' },
        };
    }
    componentDidMount = () => {
        this.props.getManufacturers();
        console.log('did mount');
    };

    onCreate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updateManufacturer(values);
        } else {
            this.props.insertManufacturer(values);
        }
        this.setState({ ...this.state, manufacturer: {}, open: false });
    };

    onEdit = (value) => {
        this.setState({ ...this.state, manufacturer: value, open: true });
    };
    deleteManufacturer = () => {
        this.props.deleteManufacturer(this.state.manufacturer.id);
        console.log('delete manufacturer');
    };
    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, manufacturer: value });

        const message = 'Do you want to delete the manufacturer ' + value.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteManufacturer,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    // onShowSizeChange = (current, pageSize) => {
    //     console.log(current, pageSize);

    //     const { pagination } = this.props;
    //     const params = {
    //         query: pagination.query,
    //         page: 0,
    //         size: pageSize,
    //     };
    //     this.props.getManufacturersByName(params);
    // };

    onChange = (pageNumber, pageSize) => {
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
        };
        this.props.getManufacturersByName(params);
    };

    handleSearch = (value) => {
        console.log(value);
        const { pagination } = this.props;
        const params = {
            query: value.query,
            size: pagination.size,
        };

        this.props.getManufacturersByName(params);
    };

    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { manufacturers, pagination } = this.props;
        return (
            <>
                <ContentHeader
                    navigate={navigate}
                    title="List Manufacturers"
                    className="site-page-header"
                ></ContentHeader>
                <Row style={{ marginBottom: 8 }}>
                    <Col md={20}>
                        <Form layout="inline" name="searchForm" onFinish={this.handleSearch}>
                            <Form.Item name="query" initialValue={pagination.query}>
                                <Input placeholder="Search Manufacturer" style={{ width: 400 }}></Input>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                    <Col md={4}>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({ ...this.state, open: true });
                            }}
                        >
                            New Manufacturer
                        </Button>
                    </Col>
                </Row>
                <ManufacturerList
                    dataSource={manufacturers}
                    onDeleteConfirm={this.onDeleteConfirm}
                    onEdit={this.onEdit}
                />

                <Row style={{ marginTop: 10 }}>
                    <Col md={24} style={{ textAlign: 'right' }}>
                        <Pagination
                            defaultCurrent={pagination.page}
                            defaultPageSize={pagination.size}
                            total={pagination.totalElements}
                            //onShowSizeChange={this.onShowSizeChange}
                            onChange={this.onChange}
                            showSizeChanger="true"
                            totalPages={pagination.totalPages}
                        ></Pagination>
                    </Col>
                </Row>
                <ManufacturerForm
                    manufacturer={this.state.manufacturer}
                    open={open}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ...this.state, open: false });
                    }}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    manufacturers: state.manufacturerReducer.manufacturers,
    pagination: state.manufacturerReducer.pagination,
});

const mapDispatchToProps = {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
    getManufacturersByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManufacturers));
