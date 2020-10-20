// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  qiankun: {
    slave: {}
  },
  chainWebpack(memo: any) {
    memo.module
      .rule('svg')
      .exclude.add(/pages/).end();

    memo.module
      .rule('svgr')
      .test(/.svg$/)
      .include.add(/pages/).end()
      .use('@svgr/webpack')
      .loader(require.resolve('@svgr/webpack'));
  },
  base: '/',
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/system/user',
      name: 'userManagement',
      icon: 'smile',
      component: './system/user',
    },
    {
      path: '/system/role',
      name: 'roleManagement',
      icon: 'smile',
      component: './system/role',
    },
    {
      path: '/system/department',
      name: 'DepartmentManagement',
      icon: 'smile',
      component: './system/department',
    },
    {
      path: '/system/menu',
      name: 'menuManagement',
      icon: 'smile',
      component: './system/menu',
    },
    {
      path: '/ops/task',
      name: 'TaskManagement',
      icon: 'smile',
      component: './ops/task',
    },
    {
      path: '/flow/config',
      name: 'ConfigManagement',
      icon: 'smile',
      component: './flow/config',
    },
    {
      path: '/',
      redirect: '/system/user',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'ant-prefix': 'cscs-react',
    'pro-table-prefix-cls': 'ant-pro-table',
    'pro-table-search-prefix-cls': 'ant-pro-table-search',
    'pro-table-form-prefix-cls': 'ant-pro-table-form',
    'pro-column-setting-prefix-cls': 'ant-pro-table-column-setting',
    'pro-table-alert-prefix-cls': 'ant-pro-table-alert',
    'pro-dropdown-prefix-cls': 'ant-pro-table-dropdown',
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
