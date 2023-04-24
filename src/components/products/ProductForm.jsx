import { UploadOutlined } from '@ant-design/icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Image,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Space,
    Upload,
} from 'antd';
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdOutlineCategory } from 'react-icons/md';
import ManufacturerService from '../../services/ManufacturerService';
import ProductService from '../../services/productService';

class ProductForm extends Component {
    form = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            descriptionCKData: '',
        };
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            descriptionCKData: this.props.product.description,
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        // hiển thị phần mô tả sp lên ckeditor
        if (nextProps.product.description && !prevState.descriptionCKData) {
            return {
                ...prevState,
                descriptionCKData: nextProps.product.description, // cập nhật lại giá trị của descriptionCKData trong state từ descrip của product và khi nào description thay đổi thì update
            };
        }
        return null;
    }
    goNext = () => {
        this.form.current
            .validateFields()
            .then((values) => {
                const newValues = {
                    ...values,
                    description: this.state.descriptionCKData,
                    manufacturerDate: values.manufacturerDate.format('YYYY-MM-DD'),
                    image: values.image[0].fileName ? values.image[0] : values.image[0].response,
                };

                console.log(newValues);
                this.props.goNext(newValues);
            })
            .catch((info) => {
                console.log(info);
                message.error('Data validation Error. Please check your input fields');
            });
    };

    handleImageRemoved = (info) => {
        console.log('remove');

        if (info.fileName) {
            ProductService.deleteProductImage(info.fileName);
        } else if (info.response && info.response.fileName) {
            ProductService.deleteProductImage(info.response.fileName);
        }
    };

    //chuuẩn hóa file để upload lên server (có thể tách ra 1 lớp vid được gọi nhiều lần)
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.fileList.length > 1) {
            return [e.fileList[1]];
        }
        return e && e.fileList;
    };

    render() {
        const { product, categories, manufacturers } = this.props;
        const { descriptionCKData } = this.state;
        return (
            <>
                <Form layout="vertical" className="form" size="middle" ref={this.form}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Product Id" name="id" initialValue={product.id}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="name"
                                initialValue={product.name}
                                rules={[{ required: true, min: 2 }]}
                                hasFeedback
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                initialValue={product.quantity}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <InputNumber
                                    min={0}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                ></InputNumber>
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true }]}
                                hasFeedback
                                initialValue={product.price}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={'$'}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                ></InputNumber>
                            </Form.Item>
                            <Form.Item
                                label="Discount"
                                name="discount"
                                rules={[{ required: true }]}
                                hasFeedback
                                initialValue={product.discount}
                            >
                                <InputNumber
                                    min={0}
                                    max={100}
                                    addonAfter={'%'}
                                    formatter={(value) => `${value}`}
                                    parser={(value) => value.replace('%', '')}
                                    style={{ width: '100%' }}
                                ></InputNumber>
                            </Form.Item>
                            <Row>
                                <Col md={12}>
                                    <Form.Item
                                        label="Featured"
                                        name="isFeatured"
                                        hasFeedback
                                        initialValue={product.isFeatured}
                                        valuePropName="checked"
                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{ height: '100%' }}></Divider>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                label="Status"
                                name="status"
                                initialValue={product.status}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="select product status">
                                    <Select.Option value="InStock">In Stock</Select.Option>
                                    <Select.Option value="OutOfStock">Out Of Stock</Select.Option>
                                    <Select.Option value="Discountinued">Discountinued</Select.Option>
                                    <Select.Option value="OnBackOrder">On Back Order</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Category"
                                name="categoryId"
                                initialValue={product.categoryId}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="select category" suffixIcon={<MdOutlineCategory />}>
                                    {categories &&
                                        categories.map((category) => (
                                            <Select.Option value={category.id} key={'cate' + category.id}>
                                                {category.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Manufacturer"
                                name="manufacturerId"
                                initialValue={product.manufacturerId}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="select manufacturer" suffixIcon={<MdOutlineCategory />}>
                                    {manufacturers &&
                                        manufacturers.map((manufacturer) => (
                                            <Select.Option value={manufacturer.id} key={'manu' + manufacturer.id}>
                                                <Space size={'large'}>
                                                    <Image
                                                        src={ManufacturerService.getManufacturerLogoUrl(
                                                            manufacturer.logo,
                                                        )}
                                                        height={20}
                                                    ></Image>

                                                    <span
                                                        style={{
                                                            color: 'black',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        {manufacturer.name}
                                                    </span>
                                                </Space>
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Manufacturer Date"
                                name="manufacturerDate"
                                rules={[{ required: true }]}
                                hasFeedback
                                initialValue={product.manufacturerDate}
                            >
                                <DatePicker></DatePicker>
                            </Form.Item>
                            <Form.Item
                                label="Main Image"
                                name="image"
                                rules={[{ required: true }]}
                                hasFeedback
                                initialValue={
                                    product.image
                                        ? [
                                              {
                                                  ...product.image,
                                                  url: ProductService.getProductImageUrl(product.image.fileName),
                                              },
                                          ]
                                        : []
                                }
                                valuePropName="fileList"
                                getValueFromEvent={this.normFile}
                            >
                                <Upload
                                    listType="picture"
                                    accept=".jpg,.png,.gif"
                                    maxCount={1}
                                    onRemove={this.handleImageRemoved}
                                    action={ProductService.getProductImageUploadUrl()}
                                >
                                    <Button icon={<UploadOutlined />}></Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item
                                label="Brief"
                                name="brief"
                                rules={[{ required: true }]}
                                hasFeedback
                                initialValue={product.brief}
                            >
                                <ReactQuill theme="snow"></ReactQuill>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true }]}
                                hasFeedback
                                initialValue={descriptionCKData}
                            >
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={descriptionCKData}
                                    onReady={(editor) => {
                                        editor.editing.view.change((write) => {
                                            write.setStyle('height', '200px', editor.editing.view.document.getRoot());
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.setState({ ...this.state, descriptionCKData: data });
                                    }}
                                ></CKEditor>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Divider></Divider>
                        <Col md={24}>
                            <Button type="primary" onClick={this.goNext} style={{ float: 'right' }}>
                                Next
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

export default ProductForm;
