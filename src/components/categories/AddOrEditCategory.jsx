import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';

class AddOrEditCategory extends Component {
    onSubmitForm = (values) => {
        console.log(values);
    };
    render() {
        const { navigate } = this.props.router;
        return (
            <div>
                <ContentHeader
                    navigate={navigate}
                    title="Add New Categories"
                    className="site-page-header"
                ></ContentHeader>
                <Form layout="vertical" className="form" onFinish={this.onSubmitForm}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Category ID" name="categoryId">
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Name" name="name" rules={[{ required: true, min: 2 }]}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Status" name="status" initialValue={'0'}>
                                <Select>
                                    <Select.Option value="0"> Visible</Select.Option>
                                    <Select.Option value="1"> InVisible</Select.Option>
                                </Select>
                            </Form.Item>
                            <Divider></Divider>
                            <Button htmlType="submit" type="primary" style={{ float: 'right' }}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default withRouter(AddOrEditCategory);
