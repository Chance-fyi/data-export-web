export default [
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
    component: './database/List',
  },
  {
    path: '/sql/list',
    component: './sql/List',
  },
  {
    path: '/sql/myList',
    component: './sql/MyList',
  },
  {
    path: '/export/list',
    component: './export/List',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
