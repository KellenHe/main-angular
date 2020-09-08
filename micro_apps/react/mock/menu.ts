import { Request, Response } from 'express';

const menuData: any[] = [
  {
    key: 0,
    level: 0,
    text: '介绍',
    title: '介绍',
    i18n: 'menu.introduce',
    icon: 'svg:home',
    iconReact: 'home',
    link: '/introduce',
    authorityMenuTyped: 'menu'
  },
  {
    key: 1,
    level: 0,
    text: '开始使用',
    title: '开始使用',
    i18n: 'menu.started',
    icon: 'svg:workflow',
    iconReact: 'workflow',
    link: '/home',
    authorityMenuTyped: 'menu'
  },
  {
    key: 2,
    level: 0,
    text: '组件',
    title: '组件',
    i18n: 'menu.components',
    icon: 'svg:connect',
    iconReact: 'connect',
    authorityMenuTyped: 'catalog',
    children: [
      {
        key: 3,
        text: '色彩',
        title: '色彩',
        i18n: 'menu.color',
        link: '/components/color',
        authorityMenuTyped: 'menu'
      },
      {
        key: 4,
        text: '文字',
        title: '文字',
        i18n: 'menu.typography',
        link: '/components/typography',
        authorityMenuTyped: 'menu'
      },
      {
        key: 5,
        text: '图标',
        title: '图标',
        i18n: 'menu.icon',
        link: '/components/icon',
        authorityMenuTyped: 'menu'
      },
      {
        key: 6,
        text: '按钮',
        title: '按钮',
        i18n: 'menu.button',
        link: '/components/button',
        authorityMenuTyped: 'menu'
      }
    ]
  },
  {
    key: 7,
    level: 0,
    text: '系统管理',
    title: '系统管理',
    icon: 'svg:management',
    iconReact: 'management',
    i18n: 'menu.system',
    authorityMenuTyped: 'catalog',
    children: [
      {
        key: 8,
        text: '用户管理',
        title: '用户管理',
        i18n: 'menu.user',
        link: '/system/user',
        authorityMenuTyped: 'menu'
      }
    ]
  }
];

function getMenu(req: Request, res: Response, u: string) {
  const result = {
    costTime: '',
    message: '',
    page: {},
    status: '00000',
    data: menuData
  };

  return res.json(result);
}

function setMenu(req: Request, res: Response, u: string) {
  menuData.find(menu => menu.key === 7).children.push({
    key: Math.floor(Math.random() * 100),
    title: req.body.title,
    text: req.body.title,
    link: req.body.menuUrl,
    icon: req.body.menuIcon,
    iconReact: req.body.menuIcon,
    authorityMenuTyped: req.body.authorityMenuTyped
  });

  const result = {
    costTime: '',
    message: '',
    page: {},
    status: '00000',
    data: menuData
  };

  return res.json(result);
}

export default {
  '/v2.0/role/basic/list': getMenu,
  'POST /v2.0/authority/menu': setMenu
};
