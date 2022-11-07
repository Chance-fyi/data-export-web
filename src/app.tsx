import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type {MenuDataItem, Settings as LayoutSettings} from '@ant-design/pro-components';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import defaultSettings from '../config/defaultSettings';
// @ts-ignore
import type {ProLayoutProps} from "@ant-design/pro-layout";
import {getUserInfo} from "@/api/login";
import * as IconMap from '@ant-design/icons';
import React from "react";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => {
    if (icon && IconMap[icon]){
      // eslint-disable-next-line no-param-reassign
      icon = React.createElement(IconMap[icon])
    }
    return {
      ...item,
      icon: icon,
      children: routes && loopMenuItem(routes),
    }
  });

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfo;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await getUserInfo();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev ? [] : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: Element, props: ProLayoutProps) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    menu: {
      locale: false,
      params: initialState,
      request: async () => {
        return loopMenuItem(initialState?.currentUser?.menu)
      },
    },
    ...initialState?.settings,
  };
};
