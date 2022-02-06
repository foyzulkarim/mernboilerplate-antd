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
import { message } from 'antd';

export async function getInitialState() {
  const initialize = (auth) => {
    const requestInstance = extend({
      timeout: 1000,
    });

    requestInstance.interceptors.request.use((url, options) => {
      const token = auth.token;

      options.headers['rbac-client-time'] = `${new Date()} `;

      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
      } else {
        options.headers['Authorization'] = null;
      }
      console.log('url:', url, API_URL);
      return {
        url: `${API_URL}${url}`,
        options: { ...options, interceptors: true },
      };
    });

    requestInstance.interceptors.response.use(async (response, options) => {
      // if resposne is 401, return initialize with null 
      if (response.status === 401) {
        const data = await response.clone().json();
        localStorage.removeItem('auth');
        history.replace({
          pathname: '/user/login',
        });
        message.error(data.errorMessage);
        return { name: response.name };
      }
      return response;
    });

    return {
      initialize,
      currentUser: auth?.userInfo,
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
      // console.log('onPageChange', location.pathname, initialState);

      if (authStr && (JSON.parse(authStr).isAuthenticated) && initialState && initialState.currentUser && location.pathname === loginPath) {
        history.push('/');
      }

      if (!authStr || (!initialState?.currentUser && location.pathname !== loginPath)) {
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
