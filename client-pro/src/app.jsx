import { PageLoading } from '@ant-design/pro-layout';
import { history, Link, useModel } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

import { extend } from 'umi-request';
import { message } from 'antd';

export async function getInitialState() {
  const initialize = (auth) => {
    return {
      initialize,
      currentUser: auth?.userInfo,
      permissions: auth?.permissions,
      settings: {
        title: 'my amazing title',
        now: new Date().toLocaleString(),
      },
    };
  };

  let authStr = localStorage.getItem('auth');
  if (authStr && JSON.parse(authStr)) {
    return initialize(JSON.parse(authStr));
  }

  return {
    initialize,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: '',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      let authStr = localStorage.getItem('auth');
      const { location } = history; // 如果没有登录，重定向到 login      
      console.log('onPageChange', location.pathname, initialState);

      if (!authStr || (JSON.parse(authStr).isAuthenticated) === false) {
        if (location.pathname === loginPath || location.pathname === registerPath) {
          history.push(location.pathname);
        }
        else history.push(loginPath);
      }

      if (authStr && (JSON.parse(authStr).isAuthenticated) && (location.pathname === loginPath || location.pathname === registerPath)) {
        history.push('/');
      }
    },
    links: isDev
      ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
