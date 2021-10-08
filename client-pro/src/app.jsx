import { PageLoading } from '@ant-design/pro-layout';
import { history, Link, useModel } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

import { extend } from 'umi-request';

export async function getInitialState() {
  console.log('getInitialState is called');

  const initialize = (auth) => {
    console.log('getInitialState is called, auth:', auth);
    const request = extend({
      // prefix: '/api/v1',
      timeout: 1000,
    });

    request.interceptors.request.use((url, options) => {
      const token = auth.token;

      options.headers['rbac-client-time'] = `${new Date()} `;

      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
      } else {
        options.headers['Authorization'] = null;
      }

      return {
        url: `${url}`,
        options: { ...options, interceptors: true },
      };
    });

    return {
      initialize,
      currentUser: auth.userInfo,
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

  console.log(
    'why i am i here? is is just because the route is user/login?',
    history.location.pathname,
  );
  return {
    // fetchUserInfo,
    initialize,
    settings: {},
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: '',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login
      console.log('onPageChange', location.pathname, initialState);
      if (initialState && initialState.currentUser && location.pathname === loginPath) {
        history.push('/');
      }

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
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
