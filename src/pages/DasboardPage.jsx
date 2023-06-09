import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Layout, Menu, Row, theme } from 'antd';
import React, { useState } from 'react';
import {
    MdOutlineHome,
    MdCategory,
    MdFormatListBulleted,
    MdAddCircleOutline,
    MdOutlineInventory2,
    MdOutlineShoppingBag,
    MdRequestPage,
    MdInsertChartOutlined,
    MdManageAccounts,
    MdSupervisorAccount,
    MdLogout,
} from 'react-icons/md';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import AddOrEditCategory from '../components/categories/AddOrEditCategory';
import ListCategory from '../components/categories/ListCategory';
import Home from '../components/home/Home';

import './DashboardPage.css';

const { Header, Sider, Content } = Layout;

function DasboardPage() {
    const [marginLeft, setMarginLeft] = useState(200);
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const siteLayoutStyle = { marginLeft: marginLeft };
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
                            icon: <MdOutlineInventory2 />,
                            label: 'Products',
                        },
                        {
                            key: '4',
                            icon: <MdOutlineShoppingBag />,
                            label: 'Orders',
                        },
                        {
                            key: '5',
                            icon: <MdRequestPage />,
                            label: 'Invoices',
                        },
                        {
                            key: '6',
                            icon: <MdInsertChartOutlined />,
                            label: 'Statistics',
                        },
                        {
                            key: '7',
                            icon: <MdManageAccounts />,
                            label: 'Profiles',
                        },
                        {
                            key: '8',
                            icon: <MdSupervisorAccount />,
                            label: 'Accounts',
                        },
                        {
                            key: '9',
                            icon: <MdLogout />,
                            label: 'Logout',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={siteLayoutStyle}>
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
                <Content
                    style={{
                        margin: '80px 24px 16px 24px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <div className="content-panel">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/categories/add" element={<AddOrEditCategory />}></Route>
                            <Route path="/categories/list" element={<ListCategory />}></Route>
                        </Routes>
                        <Outlet></Outlet>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default DasboardPage;
