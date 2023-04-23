import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, Divider, message, Row, Space, Steps } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import CategoryService from '../../services/categoryService';
import ManufacturerService from '../../services/ManufacturerService';
import ContentHeader from '../common/ContentHeader';
import ProductForm from './ProductForm';
import UploadImage from './UploadImage';

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

    componentDidMount = () => {
        // axios
        //     .get('http://localhost:8080/api/v1/manufacturers/finall')
        //     .then((response) => {
        //         this.setState({ manufacturers: response.data });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        this.loadData();
    };

    loadData = async () => {
        try {
            const categoryService = new CategoryService();
            const cateListResponse = await categoryService.getCategories();

            const manufacturerService = new ManufacturerService();
            const manufacturerListResponse = await manufacturerService.getManufacturers();

            this.setState({
                ...this.state,
                categories: cateListResponse.data,
                manufacturers: manufacturerListResponse.data,
            });
        } catch (error) {
            console.log(error);
            message.error('Error: ' + error);
        }
    };

    render() {
        const { navigate } = this.props.router;
        const { step, categories, manufacturers } = this.state;
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
                                <ProductForm
                                    product={{}}
                                    goNext={this.goNext}
                                    categories={categories}
                                    manufacturers={manufacturers}
                                ></ProductForm>
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
