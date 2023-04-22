import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Upload } from 'antd';
import React, { Component } from 'react';

class ProductForm extends Component {
    form = React.createRef();

    goNext = () => {
        this.props.goNext({});
    };
    render() {
        const { product } = this.props;
        return (
            <>
                <Form layout="vertical" className="form" size="middle" ref={this.form}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Product Id" name="id" initialValue={product.id}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Name" name="name" initialValue={product.name}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Quantity" name="quantity" initialValue={product.quantity}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Price" name="price" initialValue={product.price}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Discount" name="discount" initialValue={product.discount}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Product Id" name="id" initialValue={product.id}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{ height: '100%' }}></Divider>
                        </Col>
                        <Col md={11}>
                            <Form.Item label="Status" name="status" initialValue={product.status}>
                                <Select placeholder="select product status">
                                    <Select.Option value="Instock">In Stock</Select.Option>
                                    <Select.Option value="OutOfStock">Out Of Stock</Select.Option>
                                    <Select.Option value="Discountinued">Discountinued</Select.Option>
                                    <Select.Option value="OnBackOrder">On BackOrder</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Category" name="categoryId" initialValue={product.categoryId}>
                                <Select placeholder="select category">
                                    <Select.Option value="Instock">Computer</Select.Option>
                                    <Select.Option value="OutOfStock">Macbook</Select.Option>
                                    <Select.Option value="Discountinued">PC</Select.Option>
                                    <Select.Option value="OnBackOrder">Dell</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Manufacturer" name="manufacturerId" initialValue={product.manufacturerId}>
                                <Select placeholder="select Manufacturer">
                                    <Select.Option value="Instock">FPT</Select.Option>
                                    <Select.Option value="OutOfStock">DELL</Select.Option>
                                    <Select.Option value="Discountinued">INTELL</Select.Option>
                                    <Select.Option value="OnBackOrder">APPLE</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Manufacturer Date"
                                name="manufacturerDate"
                                initialValue={product.manufacturerDate}
                            >
                                <DatePicker></DatePicker>
                            </Form.Item>
                            <Form.Item
                                label="Main Image"
                                name="image"
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
                            <Form.Item label="Brief" name="brief" initialValue={product.brief}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item label="Description" name="description" initialValue={product.description}>
                                <Input></Input>
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
