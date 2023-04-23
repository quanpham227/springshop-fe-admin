import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space, Steps } from 'antd';
import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import ProductForm from './ProductForm';
import UploadImage from './UploadImage';

const { Step } = Steps;

class AddOrUpdateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
        };
    }

    goNext = (values) => {
        this.setState({ ...this.state, product: values, step: 1 });
    };

    goPrevious = () => {
        this.setState({ ...this.state, step: 0 });
    };

    saveProduct = () => {
        console.log('save product');
    };

    render() {
        const { navigate } = this.props.router;
        const { step } = this.state;
        let { title } = 'Add products';
        const { product } = this.props;

        return (
            <>
                <ContentHeader navigate={navigate} title={title} className="site-page-header"></ContentHeader>

                <Row>
                    <Col md={24}>
                        <Steps
                            current={step}
                            items={[
                                {
                                    title: 'Basic Information',
                                    description: 'Fill basic Information',
                                },
                                {
                                    title: 'Images',
                                    description: 'Choose the list of images',
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        {step === 0 && (
                            <>
                                <Divider></Divider>
                                <ProductForm product={{}} goNext={this.goNext}></ProductForm>
                            </>
                        )}
                        {step === 1 && (
                            <>
                                <Divider></Divider>
                                <Row>
                                    <Col md={24}>
                                        <UploadImage></UploadImage>
                                        <Divider></Divider>
                                        <div>
                                            <Space>
                                                <Button type="primary" onClick={this.goPrevious}>
                                                    Previous
                                                </Button>
                                                <Button type="primary" onClick={this.saveProduct}>
                                                    <SaveOutlined /> {product && product.id ? 'Update' : 'Save'}
                                                </Button>
                                            </Space>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>
            </>
        );
    }
}

export default withRouter(AddOrUpdateProduct);
