import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, Divider, message, notification, Row, Space, Steps } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from '../../helpers/withRouter';
import CategoryService from '../../services/categoryService';
import ManufacturerService from '../../services/ManufacturerService';
import ContentHeader from '../common/ContentHeader';
import ProductForm from './ProductForm';
import UploadImage from './UploadImage';
import { insertProduct } from '../../redux/actions/ProductAction';
import ProductService from '../../services/productService';

class AddOrUpdateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            product: {},
            productImages: [],
            updatedProductImages: [],
            categories: [],
            manufacturers: [],
        };
    }

    goNext = (values) => {
        this.setState({ ...this.state, product: values, step: 1 });
    };

    goPrevious = () => {
        this.setState({ ...this.state, step: 0 });
    };

    onUpdateFileList = (fileList) => {
        console.log('updated fileList', fileList);
        this.setState({
            ...this.state,
            updatedProductImages: fileList,
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.product && nextProps.product.images && nextProps.product.images.length > 0) {
            let productImages = [];
            if (nextProps.product.images) {
                productImages = nextProps.product.images.map((item) => ({
                    ...item,
                    uid: item.id,
                    url: ProductService.getProductImageUrl(item.fileName),
                    status: 'done',
                }));
            }
            return { ...prevState, productImages: productImages };
        }
        return null;
    }

    saveProduct = () => {
        const { product, productImages, updatedProductImages } = this.state;
        console.log('save product');
        const newProduct = {
            ...product,
            images:
                updatedProductImages && updatedProductImages.length > 0
                    ? updatedProductImages.map((item) => {
                          if (item.id) {
                              return { ...item };
                          }
                          return item.response;
                      })
                    : productImages.map((item) => {
                          if (item.id) {
                              return { ...item };
                          }
                          return item.response;
                      }),
        };
        console.log(newProduct);
        if (newProduct.images && newProduct.images.length > 0) {
            const uploading = newProduct.images.filter((item) => item.status != 'done');
            if (uploading && uploading > 0) {
                notification.error({
                    message: 'Error',
                    description: 'Product images are uploading , Please wait ....',
                    duration: 10,
                });
                return;
            }
        } else if (newProduct.images.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Product images are not chosen . Please choose the product images before saving',
                duration: 10,
            });
            return;
        }
        const { navigate } = this.props.router;
        this.setState({ ...this.state, product: {}, productImages: [] });
        this.props.insertProduct(newProduct, navigate);
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
        const { step, categories, manufacturers, productImages } = this.state;
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
                                        <UploadImage
                                            onUpdateFileList={this.onUpdateFileList}
                                            fileList={productImages}
                                        ></UploadImage>
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

const mapStateToProps = (state) => ({
    product: state.productReducer.product,
});

const mapDispatchToProps = {
    insertProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddOrUpdateProduct));
