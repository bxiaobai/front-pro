import {createStyles} from 'antd-style';

const useStyle = createStyles(() => {
  return {
    left: {
      width: '16%',
      backgroundColor: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
    right: {
      width: '84%',
    },
    noBorderMenu: {
      borderRight: 'none !important',
    },
    title: {
      fontSize: '20px',
      color: '#000',
      fontWeight: 'bold',
      marginBottom: '24px',

    },
    menuItem: {
      fontSize: '16px',
      color: '#000',
      marginBottom: '16px',
      cursor: 'pointer',
      padding: '12px',
      borderRadius: '8px',
      '&:hover': {
        color: '#1890ff',
      },
    },
    selected: {
      backgroundColor: '#f3f6fc', /* 示例颜色 */
      fontWeight: 'bold',
      color: '#1890ff',
    },
    item : {
      width : '83%',
    },
    delete : {
      fontWeight : 300,
      fontSize : '14px',
      color : '#666',
    }
  }
})
export default useStyle
