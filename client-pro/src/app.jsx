import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
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
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行
  console.log(
    'App>getInitialState>response',
    localStorage.getItem('token'),
    localStorage.getItem('userInfo'),
  );
  const request = extend({
    // prefix: '/api/v1',
    timeout: 1000,
    headers: {
      'special-header': 'amazing123',
    },
  });

  request.interceptors.request.use((url, options) => {
    const token = localStorage.getItem('token');

    options.headers['special-agent-3'] = `${new Date()} `;

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    return {
      url: `${url}`,
      options: { ...options, interceptors: true },
    };
  });

  const userStr = localStorage.getItem('userInfo');

  if (userStr) {
    // const currentUser = await fetchUserInfo();
    let currentUser = {};
    if (userStr && userStr.length > 0) {
      currentUser = JSON.parse(userStr);
    }

    return {
      // fetchUserInfo,
      currentUser,
      settings: {
        title: 'my amazing title',
        now: new Date().toLocaleString(),
      },
    };
  }

  console.log(
    'why i am i here? is is just because the route is user/login?',
    history.location.pathname,
  );
  return {
    // fetchUserInfo,
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
      if (initialState.currentUser && location.pathname === loginPath) {
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
