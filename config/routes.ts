﻿export default [
  {
    layout: false,
    name: 'login',
    path: '/user/login',
    component: './user/Login',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/menu/list',
    component: './menu/List',
  },
  {
    path: '/user/list',
    component: './user/List',
  },
  {
    path: '/role/list',
    component: './role/List',
  },
  {
    path: '/database/list',
    component: './data/database/List',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
