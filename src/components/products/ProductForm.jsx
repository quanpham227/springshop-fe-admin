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
class ProductForm extends Component {
    form = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            descriptionCKData: '',
            isChecked: false,
        };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleCheckboxChange(e) {
        this.setState({ isChecked: e.target.checked });
    }
    goNext = () => {
        this.form.current
            .validateFields()
            .then((values) => {
                console.log(values);

                const newValues = {
                    ...values,
                    description: this.state.descriptionCKData,
                    manufacturerDate: values.manufacturerDate.format('YYYY-MM-DD'),
                    //image: values.image[0].fileName ? values.image[0] : values.image[0].response,
                };
                this.props.goNext(newValues);
            })
            .catch((info) => {
                console.log(info);
                message.error('Data validation Error. Please check your input fields');
            });
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
                                    >
                                        <Checkbox
                                            checked={this.state.isChecked}
                                            onChange={this.handleCheckboxChange}
                                        ></Checkbox>
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
                                    <Select.Option value="Instock">In Stock</Select.Option>
                                    <Select.Option value="OutOfStock">Out Of Stock</Select.Option>
                                    <Select.Option value="Discountinued">Discountinued</Select.Option>
                                    <Select.Option value="OnBackOrder">On BackOrder</Select.Option>
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
                                            <Select.Option value={manufacturer.id} key={manufacturer.id}>
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
                                initialValue={product.image ? [{ ...product.image }] : []}
                            >
                                <Upload listType="picture" accept=".jpg,.png,.gif" maxCount={1}>
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
