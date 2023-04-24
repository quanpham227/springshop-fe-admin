import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Avatar, Col, Layout, Menu, message, Row, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    MdOutlineHome,
    MdCategory,
    MdFormatListBulleted,
    MdAddCircleOutline,
    MdOutlineShoppingBag,
    MdRequestPage,
    MdInsertChartOutlined,
    MdManageAccounts,
    MdSupervisorAccount,
    MdLogout,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import AddOrEditCategory from '../components/categories/AddOrEditCategory';
import ListCategory from '../components/categories/ListCategory';
import Home from '../components/home/Home';
import ListManufacturers from '../components/manufacturers/ListManufacturers';
import AddOrUpdateProduct from '../components/products/AddOrUpdateProduct';
import ListProducts from '../components/products/ListProducts';
import UploadImage from '../components/products/UploadImage';
import { setError, setMessage } from '../redux/actions/commonAction';

import './DashboardPage.css';

const { Header, Sider, Content } = Layout;

function DashboardPage() {
    const [marginLeft, setMarginLeft] = useState(200);
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const msg = useSelector((state) => state.commonReducer.message);
    const err = useSelector((state) => state.commonReducer.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (msg) {
            dispatch(setMessage(''));
            message.success(msg);
        }

        if (err) {
            dispatch(setError(''));
            message.error(err);
        }
    }, [msg, err, dispatch]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const siteLayoutStyle = { marginLeft: marginLeft };

    const handleContentScroll = (e) => {
        const content = e.target;
        const scrollHeight = content.scrollHeight;
        const clientHeight = content.clientHeight;
        const scrollTop = content.scrollTop;

        if (scrollTop + clientHeight >= scrollHeight) {
            content.style.height = `${scrollHeight}px`;
        }
    };
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: '0', top: '0', bottom: '0' }}
            >
                <div className="logo">
                    <h1>{collapsed ? 'SS' : 'SpringShop'}</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <MdOutlineHome />,
                            label: 'Home',
                            onClick: () => navigate('/'),
                        },
                        {
                            key: '2',
                            icon: <MdCategory />,
                            label: 'Categories',
                            children: [
                                {
                                    key: '21',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Add Category',
                                    onClick: () => navigate('/categories/add'),
                                },
                                {
                                    key: '22',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Category',
                                    onClick: () => navigate('/categories/list'),
                                },
                            ],
                        },
                        {
                            key: '3',
                            icon: <MdCategory />,
                            label: 'Manufacturers',
                            children: [
                                {
                                    key: '31',
                                    icon: <MdAddCircleOutline />,
                                    label: 'List Manufacturer',
                                    onClick: () => navigate('/manufacturers/list'),
                                },
                                {
                                    key: '32',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List countries',
                                    onClick: () => navigate('/countries/list'),
                                },
                                {
                                    key: '33',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Provinces',
                                    onClick: () => navigate('/provinces/list'),
                                },
                            ],
                        },
                        {
                            key: '4',
                            icon: <PieChartOutlined />,
                            label: 'Products',
                            children: [
                                {
                                    key: '41',
                                    icon: <PlusOutlined />,
                                    label: 'Upload Images',
                                    onClick: () => navigate('/products/upload'),
                                },
                                {
                                    key: '42',
                                    icon: <MdFormatListBulleted />,
                                    label: 'Add Product',
                                    onClick: () => navigate('/products/add'),
                                },
                                {
                                    key: '43',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Products',
                                    onClick: () => navigate('/products/list'),
                                },
                            ],
                        },
                        {
                            key: '5',
                            icon: <MdOutlineShoppingBag />,
                            label: 'Orders',
                        },
                        {
                            key: '6',
                            icon: <MdRequestPage />,
                            label: 'Invoices',
                        },
                        {
                            key: '7',
                            icon: <MdInsertChartOutlined />,
                            label: 'Statistics',
                        },
                        {
                            key: '8',
                            icon: <MdManageAccounts />,
                            label: 'Profiles',
                        },
                        {
                            key: '9',
                            icon: <MdSupervisorAccount />,
                            label: 'Accounts',
                        },
                        {
                            key: '10',
                            icon: <MdLogout />,
                            label: 'Logout',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={siteLayoutStyle}>
                <Affix offsetTop={0}>
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                            right: 16,
                            left: marginLeft + 16,
                            top: 0,
                            position: 'fixed',
                            height: 70,
                        }}
                    >
                        <Row>
                            <Col md={18}>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => {
                                        const sts = !collapsed;
                                        setCollapsed(sts);
                                        setMarginLeft(sts ? 80 : 200);
                                    },
                                })}
                            </Col>
                            <Col md={6}>
                                <div>
                                    <Avatar size="default" icon={<UserOutlined></UserOutlined>}></Avatar> Pham Hong Quan
                                </div>
                            </Col>
                        </Row>
                    </Header>
                </Affix>
                <Content
                    style={{
                        margin: '80px 24px 16px 24px',
                        padding: 20,
                        height: '100%',
                        overflow: 'auto',
                        background: colorBgContainer,
                    }}
                    onScroll={handleContentScroll}
                >
                    <div className="content-panel">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/categories/add" element={<AddOrEditCategory key="a" />}></Route>
                            <Route path="/categories/update/:id" element={<AddOrEditCategory key="u" />}></Route>
                            <Route path="/categories/list" element={<ListCategory />}></Route>
                            <Route path="/manufacturers/list" element={<ListManufacturers />}></Route>
                            <Route path="/products/upload" element={<UploadImage />}></Route>
                            <Route path="/products/add" element={<AddOrUpdateProduct />}></Route>
                            <Route path="/products/list" element={<ListProducts />}></Route>
                        </Routes>
                        <Outlet></Outlet>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default DashboardPage;
