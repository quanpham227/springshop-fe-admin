import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import ManufacturerList from './ManufacturerList';
import withRouter from '../../helpers/withRouter';
import { Button, Col, Modal, Row } from 'antd';
import ManufacturerForm from './ManufacturerForm';
import { connect } from 'react-redux';
import {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
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
    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { manufacturers } = this.props;
        return (
            <>
                <ContentHeader
                    navigate={navigate}
                    title="List Manufacturers"
                    className="site-page-header"
                ></ContentHeader>
                <Row>
                    <Col md={24}>
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
});

const mapDispatchToProps = {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManufacturers));