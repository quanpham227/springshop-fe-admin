import React, { Component } from 'react';
import { Button, Image, Space, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/lib/table/Column';
import ProductService from '../../services/productService';
import { MdPreview } from 'react-icons/md';
import withRouter from '../../helpers/withRouter';

class ProductList extends Component {
    render() {
        const { products } = this.props;
        const { navigate } = this.props.router;

        return (
            <Table dataSource={products} size="small" rowKey="id" pagination={false}>
                <ColumnGroup>
                    <Column
                        title="Image"
                        key="imageFileName"
                        width={90}
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <Image
                                    width="100%"
                                    src={ProductService.getProductImageUrl(record.imageFileName)}
                                ></Image>
                            </Space>
                        )}
                    ></Column>
                    <Column title="Name" key="name" dataIndex="name"></Column>
                    <Column title="Quantity" key="quantity" dataIndex="quantity" width={60}></Column>
                    <Column title="Price" key="price" dataIndex="price" width={60}></Column>
                    <Column title="Discount" key="discount" dataIndex="discount" width={60}></Column>
                    <Column
                        title="Is Featured"
                        key="isFeatured"
                        dataIndex="isFeatured"
                        width={100}
                        render={(_, record) => <h1>{record.isFeatured}</h1>}
                    ></Column>
                    <Column
                        title="Status"
                        key="status"
                        dataIndex="status"
                        width={100}
                        render={(_, record) => <h1>{record.status}</h1>}
                    ></Column>
                    <Column
                        title="Action"
                        key="action"
                        width={150}
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <Tooltip placement="top" title="View Product Detail" color="green">
                                    <Button
                                        key={record.key}
                                        type="link"
                                        size="small"
                                        onClick={() => navigate('/products/view/' + record.id)}
                                    >
                                        <MdPreview color="green" size={24} />
                                    </Button>
                                </Tooltip>
                                <Tooltip placement="top" title="Edit Product" color="green">
                                    <Button
                                        key={record.key}
                                        type="link"
                                        size="small"
                                        onClick={() => navigate('/products/edit/' + record.id)}
                                    >
                                        <EditOutlined color="blue" size={24} />
                                    </Button>
                                </Tooltip>
                                <Tooltip placement="top" title="Delete Product" color="red">
                                    <Button
                                        key={record.key}
                                        type="link"
                                        danger
                                        size="small"
                                        onClick={() => navigate('/')}
                                    >
                                        <DeleteOutlined color="red" size={24} />
                                    </Button>
                                </Tooltip>
                            </Space>
                        )}
                    ></Column>
                </ColumnGroup>
            </Table>
        );
    }
}
export default withRouter(ProductList);
