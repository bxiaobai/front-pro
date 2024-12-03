import {ProLayoutProps} from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  "splitMenus": false,
  title: '智能输液系统',
  pwa: true,
  logo: 'https://mdn.alipayobjects.com/huamei_n8rchn/afts/img/A*x1BtQ5x7_pUAAAAAAAAAAAAADvSFAQ/original',
  iconfontUrl: '',
  token: {
    header : {
      heightLayoutHeader : 48,
      colorBgHeader : '#f3f6fc'
    },
    sider : {
      colorMenuBackground : '#f3f6fc',
      colorTextMenuSelected : '#006aff',
      colorBgMenuItemSelected : '#e4ebfb',
    }
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};
/**
 * 选中菜单的背景颜色 : #b3ccff
 */
export default Settings;

