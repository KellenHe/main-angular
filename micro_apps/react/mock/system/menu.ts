import { Request, Response } from 'express';

const menuData: any[] = [
  {
    key: 0,
    menuOrder: 0,
    title: '介绍',
    icon: 'svg:home',
    link: '/introduce',
    authorityMenuTyped: 'menu'
  },
  {
    key: 1,
    title: '开始使用',
    icon: 'svg:workflow',
    link: '/home',
    authorityMenuTyped: 'menu'
  },
  {
    key: 2,
    title: '组件',
    icon: 'svg:connect',
    authorityMenuTyped: 'catalog',
    children: [
      {
        key: 3,
        title: '色彩',
        link: '/components/color',
        authorityMenuTyped: 'menu'
      },
      {
        key: 4,
        title: '文字',
        link: '/components/typography',
        authorityMenuTyped: 'menu'
      },
      {
        key: 5,
        title: '图标',
        link: '/components/icon',
        authorityMenuTyped: 'menu'
      },
      {
        key: 6,
        title: '按钮',
        link: '/components/button',
        authorityMenuTyped: 'menu'
      }
    ]
  },
  {
    key: 7,
    title: '系统管理',
    icon: 'svg:management',
    authorityMenuTyped: 'catalog',
    children: [
      {
        key: 8,
        title: '用户管理',
        link: '/system/user',
        authorityMenuTyped: 'menu'
      }
    ]
  }
];

function getMenu(req: Request, res: Response, u: string) {
  const result = {
    errorCode: '',
    errorMessage: '',
    success: true,
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
  '/authority/menu/list': getMenu,
  'POST /v2.0/authority/menu': setMenu
};
