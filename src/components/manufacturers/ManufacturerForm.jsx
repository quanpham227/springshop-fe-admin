import { Button, Divider, Form, Image, Input, Modal, Radio, Upload } from 'antd';
import React, { Component, createRef } from 'react';

class ManufacturerForm extends Component {
    form = createRef();

    constructor(props) {
        super(props);

        this.state = {
            manufacturer: { id: '', name: '', logo: '' },
            previewImage: '',
            previewVisible: false,
        };
    }
    handlePreview = (file) => {
        console.log(file);
        if (file.thumbUrl) {
            this.setState({ ...this.state, previewImage: file.thumbUrl, previewVisible: true });
        }
    };

    handleRemove = (value) => {
        console.log(value);
    };
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
        const { open, onCreate, onCancel } = this.props;
        const { manufacturer } = this.state;
        return (
            <Modal
                open={open}
                title="New Manufacturer"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    this.form.current
                        .validateFields()
                        .then((values) => {
                            this.form.current.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    ref={this.form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item label="Manufacturer ID" name="id" initialValue={manufacturer.id}>
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item
                        label="Manufacturer name"
                        name="name"
                        initialValue={manufacturer.name}
                        rules={[{ required: true, min: 2 }]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Logo"
                        name="logoFile"
                        initialValue={[{ url: '' }]}
                        rules={[{ required: true }]}
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}
                    >
                        <Upload
                            listType="picture"
                            onPreview={this.handlePreview}
                            onRemove={this.handleRemove}
                            accept=".jpg,.png,.gif"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button type="primary"> Browse</Button>
                        </Upload>
                    </Form.Item>
                    <Divider></Divider>
                    {this.state.previewVisible && (
                        <Image
                            src={this.state.previewImage}
                            style={{ width: 200 }}
                            preview={{ visible: false }}
                        ></Image>
                    )}
                </Form>
            </Modal>
        );
    }
}

export default ManufacturerForm;
