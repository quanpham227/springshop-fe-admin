import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import { Button, Col, Form, Input, Row } from 'antd';
import ProductList from './ProductList';
import withRouter from '../../helpers/withRouter';

class ListProducts extends Component {
    render() {
        const products = [
            { id: 1, name: 'HAT', price: 100, discount: 100, quantity: 10, isFeatured: 1, status: 'InStock' },
            { id: 2, name: 'HAT', price: 100, discount: 100, quantity: 10, isFeatured: 1, status: 'InStock' },
            { id: 3, name: 'HAT', price: 100, discount: 100, quantity: 10, isFeatured: 1, status: 'InStock' },
            { id: 4, name: 'HAT', price: 100, discount: 100, quantity: 10, isFeatured: 1, status: 'InStock' },
        ];

        const { navigate } = this.props.router;
        return (
            <>
                <ContentHeader navigate={navigate} title="List Products" className="site-page-header"></ContentHeader>
                <Row style={{ marginBottom: 8 }}>
                    <Col md={20}>
                        <Form layout="inline" name="searchForm">
                            <Form.Item name="query">
                                <Input placeholder="Search Products" style={{ width: 400 }}></Input>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                    <Col md={4}>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({ ...this.state, open: true });
                            }}
                        >
                            New Product
                        </Button>
                    </Col>
                </Row>
                <ProductList products={products} />
            </>
        );
    }
}
export default withRouter(ListProducts);
