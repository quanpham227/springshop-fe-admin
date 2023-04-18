import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import ManufacturerList from './ManufacturerList';
import withRouter from '../../helpers/withRouter';
import { Button, Col, Row } from 'antd';
import ManufacturerForm from './ManufacturerForm';
import { connect } from 'react-redux';
import { insertManufacturer, getManufacturers } from '../../redux/actions/ManufacturerAction';

class ListManufacturers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }
    componentDidMount = () => {
        this.props.getManufacturers();
        console.log('did mount');
    };

    onCreate = (values) => {
        console.log(values);
        this.props.insertManufacturer(values);
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
                <ManufacturerList dataSource={manufacturers} />

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

const mapStateToProps = (state) => ({
    manufacturers: state.manufacturerReducer.manufacturers,
});

const mapDispatchToProps = {
    insertManufacturer,
    getManufacturers,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManufacturers));
