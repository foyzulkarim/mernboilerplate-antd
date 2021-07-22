import React from "react";
import { Layout, Menu } from "antd";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import { ProductAdd, ProductList } from "../Pages/Product";
import { CustomerAdd, CustomerEdit, CustomerList, CustomerDetail } from "../Pages/Customer";
import { RoleAdd, RoleList } from "../Pages/Role";
import { UserAdd, UserList, UserEdit, UserDetail } from "../Pages/User";
import { ResourceAdd, ResourceList } from "../Pages/Resource"
import { PermissionAdd, PermissionList } from "../Pages/Permission";
import { Login } from './../Pages/Authentication/Login';
import { useAuth } from '../contexts/AuthContext';
import { AppProtectedComponent, AppProtectedRoute } from './../components/AppProtectedComponent';
import { NotFound } from './../Pages/NotFound';

const { Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

export const AuthLayout = () => {
    const [auth] = useAuth();

    return (
        <Layout>
            <Layout style={{ minHeight: "90vh" }}>
                <Content className='main-content'>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route
                            render={({ location }) => {
                                return auth.isAuthenticated ? (
                                    <Redirect to="/dashboard" />
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: "/login",
                                            state: { from: location }
                                        }}
                                    />
                                )
                            }}
                        />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export const MainLayout = () => {
    return (
        <Layout>
            <Layout style={{ minHeight: "90vh" }}>
                <Sider width={300} style={{ background: "#fff" }}>
                    <Menu
                        mode="inline"
                        style={{ height: "90vh", borderRight: 5 }}
                    >
                        <AppProtectedComponent key="dashboard" component={Item} name='dashboard' type='menu'>
                            <Link to="/">Dashboard</Link>
                        </AppProtectedComponent>
                        <AppProtectedComponent key="product" title="Product" component={SubMenu} name='product' type='menu'>
                            <AppProtectedComponent key="products-add" component={Item} name='products-add' type='menu'>
                                <Link to="/products/add">Add Product</Link>
                            </AppProtectedComponent>
                            <AppProtectedComponent key="product-list" component={Item} name='products-list' type='menu'>
                                <Link to="/products/list">Product List</Link>
                            </AppProtectedComponent>
                        </AppProtectedComponent>
                        <AppProtectedComponent key="customer" title="Customer" component={SubMenu} name='customer' type='menu'>
                            <AppProtectedComponent key="customers-add" component={Item} name='customers-add' type='menu'>
                                <Link to="/customers/add">Add Customer</Link>
                            </AppProtectedComponent>
                            <AppProtectedComponent key="customers-list" component={Item} name='customers-list' type='menu'>
                                <Link to="/customers/list">Customer List</Link>
                            </AppProtectedComponent>
                        </AppProtectedComponent>
                        <AppProtectedComponent key="role" title="Role" component={SubMenu} name='role' type='menu'>
                            <Menu.Item key="role-add">
                                <Link to="/roles/add">Add Role</Link>
                            </Menu.Item>
                            <Menu.Item key="role-list">
                                <Link to="/roles/list">Role List</Link>
                            </Menu.Item>
                        </AppProtectedComponent>
                        <AppProtectedComponent key="user" title="User" component={SubMenu} name='user' type='menu'>
                            <Menu.Item key="user-add">
                                <Link to="/users/add">Add User</Link>
                            </Menu.Item>
                            <Menu.Item key="user-list">
                                <Link to="/users/list">User List</Link>
                            </Menu.Item>
                        </AppProtectedComponent>
                        <AppProtectedComponent key="resource" title="Resource" component={SubMenu} name='resource' type='menu'>
                            <Menu.Item key="resource-add">
                                <Link to="/resources/add">Add Resource</Link>
                            </Menu.Item>
                            <Menu.Item key="resource-list">
                                <Link to="/resources/list">Resource List</Link>
                            </Menu.Item>
                        </AppProtectedComponent>
                        <AppProtectedComponent key="permission" title="Permission" component={SubMenu} name='permission' type='menu'>
                            <Menu.Item key="permission-add">
                                <Link to="/permissions/add">
                                    Add Permission
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="permission-list">
                                <Link to="/permissions/list">
                                    Permission List
                                </Link>
                            </Menu.Item>
                        </AppProtectedComponent>
                    </Menu>
                </Sider>

                <Layout style={{ padding: "6px" }}>

                    <Content className="main-content">
                        <Switch>
                            <Route exact path="/dashboard" component={Dashboard} name='dashboard' type='menu' />
                            <AppProtectedRoute name='products-add' type='route' exact path="/products/add" component={ProductAdd} />
                            <AppProtectedRoute name='products-list' type='route' exact path="/products/list" component={ProductList} />
                            <AppProtectedRoute name='customers-add' type='route' exact path="/customers/add" component={CustomerAdd} />
                            <AppProtectedRoute name='customers-list' type='route' exact path="/customers/list" component={CustomerList} />
                            <AppProtectedRoute name='customers-detail' type='route' exact path="/customers/list/:id" component={CustomerDetail} />                                                                                            
                            <AppProtectedRoute name='customers-edit' type='route' exact path="/customers/edit/:id" component={CustomerEdit} />                                                                                                                            
                            <AppProtectedRoute name='roles-add' type='route' exact path="/roles/add" component={RoleAdd} />
                            <AppProtectedRoute name='roles-list' type='route' exact path="/roles/list" component={RoleList} />
                            <AppProtectedRoute name='users-add' type='route' exact path="/users/add" component={UserAdd} />
                            <AppProtectedRoute name='users-list' type='route' exact path="/users/list" component={UserList} />
                            <AppProtectedRoute name='users-edit' type='route' exact path="/users/edit/:id" component={UserEdit} />
                            <AppProtectedRoute name='users-detail' type='route' exact path="/users/list/:id" component={UserDetail} />
                            <AppProtectedRoute name='resources-add' type='route' exact path="/resources/add" component={ResourceAdd} />
                            <AppProtectedRoute name='resources-list' type='route' exact path="/resources/list" component={ResourceList} />
                            <AppProtectedRoute name='permissions-add' type='route' exact path="/permissions/add" component={PermissionAdd} />
                            <AppProtectedRoute name='permissions-list' type='route' exact path="/permissions/list" component={PermissionList} />
                            <Route exact path="/" component={Dashboard} />
                            <Route path="/" component={NotFound} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
