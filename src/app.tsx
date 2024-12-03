import {AvatarDropdown, AvatarName} from '@/components';
import {SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {history} from '@umijs/max';
import {errorConfig} from './requestConfig';
// import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import React, {useState} from 'react';
import {getLoginUserUsingGet} from "@/services/swagger/userController";
import defaultSettings from "../config/defaultSettings";
import {Button} from "antd";
import {
  GithubFilled,
  InfoCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleFilled
} from "@ant-design/icons";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const initialState: InitialState = {
    currentUser: undefined,
    settings: defaultSettings
  };
  // 如果不是登录页面，执行
  const {location} = history;
  if (location.pathname !== loginPath) {
    try {
      const res = await getLoginUserUsingGet();
      initialState.currentUser = res.data;
    } catch (error: any) {
      //如果未登录，重定向到登录页
      history.push(loginPath)
    }
  }
  return initialState;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(true);
    return {
      actionsRender: (props) => {
        if (props.isMobile) return [];
        if (typeof window === 'undefined') return [];
        return [
          <InfoCircleFilled key="InfoCircleFilled"/>,
          <QuestionCircleFilled key="QuestionCircleFilled"/>,
          <GithubFilled key="GithubFilled"/>,
        ];
      },
      avatarProps: {
        src: initialState?.currentUser?.userAvatar,
        title: <AvatarName/>,
        render: (_, avatarChildren) => {
          return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
        },
      },
      contentStyle: {
        backgroundColor: '#f3f6fc',
        height: 'calc(100vh - 48px)',
      },
      onCollapse: setCollapsed,
      menuItemRender: (_: any, dom: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
          onClick={() => {
            history.push(_.path)
          }}
        >
          {dom}
        </div>
      ),
      subMenuItemRender: (_: any, dom: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {dom}
        </div>
      ),
      collapsed,
      collapsedButtonRender: false,
      headerContentRender: () => (
        <div
          onClick={() => {
            setCollapsed(!collapsed)
          }}
          style={{
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </div>
      ),
      extra:
        () => (
          <>
            <div
              style={{
                maxWidth: 620,
                textAlign: 'start',
                backgroundColor: 'rgba(255,229,100,0.3)',
                borderInlineStartColor: '#ffe564',
                borderInlineStartWidth: '9px',
                borderInlineStartStyle: 'solid',
                padding: '20px 45px 20px 26px',
                margin: 'auto',
                marginBlockEnd: '30px',
                marginBlockStart: '20px',
              }}
            >
              <p>注意</p>
              <p>
                错误边界<strong>无法</strong>捕获以下场景中产生的错误：
              </p>
              <ul
                style={{
                  listStyle: 'none',
                }}
              >
                <li>
                  事件处理（
                  <a
                    href="https://zh-hans.reactjs.org/docs/error-boundaries.html#how-about-event-handlers#how-about-event-handlers">
                    了解更多
                  </a>
                  ）
                </li>
                <li>
                  异步代码（例如 <code>setTimeout</code> 或{' '}
                  <code>requestAnimationFrame</code> 回调函数）
                </li>
                <li>服务端渲染</li>
                <li>它自身抛出来的错误（并非它的子组件）</li>
              </ul>
            </div>
            <Button
              danger
              type="primary"
              onClick={() => {
                window.location.reload();
              }}
            >
              刷新页面
            </Button>
          </>
        ),
      siderWidth: 176,
      // 自定义 403 页面
      // 增加一个 loading 的状态
      childrenRender:
        (children) => {
          // if (initialState?.loading) return <PageLoading />;
          return (
            <>
              {children}
              {isDev && (
                <SettingDrawer
                  disableUrlParams
                  enableDarkTheme
                  settings={initialState?.settings}
                  onSettingChange={(settings) => {
                    setInitialState((preInitialState) => ({
                      ...preInitialState,
                      settings,
                    }));
                  }}
                />
              )}
            </>
          );
        },
      ...
        initialState?.settings,
    }
      ;
  }
;

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
