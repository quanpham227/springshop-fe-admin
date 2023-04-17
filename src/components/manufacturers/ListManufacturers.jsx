import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import ManufacturerList from './ManufacturerList';
import withRouter from '../../helpers/withRouter';
import { Button, Col, Row } from 'antd';
import ManufacturerForm from './ManufacturerForm';
import { connect } from 'react-redux';
import { insertManufacturer } from '../../redux/actions/ManufacturerAction';

class ListManufacturers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    onCreate = (values) => {
        console.log(values);
        this.props.insertManufacturer(values);
    };
    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;
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
                <ManufacturerList />

                <ManufacturerForm
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    insertManufacturer,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManufacturers));
