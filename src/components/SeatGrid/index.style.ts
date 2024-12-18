import {createStyles} from 'antd-style';

const useStyles = createStyles(() => {
  return {
    gridContainer: {
      display: 'grid',
      margin: '0 auto', // 水平居中
      gridGap: '10px', // 网格间距
    },
    gridItem: {
      textAlign: 'center',
      lineHeight: '42px',
      cursor: 'pointer', /* 设置鼠标悬停时为手形光标 */
      userSelect: 'none', /* 禁止文本选择 */
      width: '50px', // 设置宽度为50px
      height: '50px', // 设置高度为50px
      backgroundSize: 'cover', // 背景图片覆盖整个元素
      backgroundRepeat: 'no-repeat', // 背景图片不重复
      backgroundPosition: 'center', // 背景图片居中
    },
    areaDiv: {
      width: '50px', // 设置宽度为50px
      height: '50px', // 设置高度为50px
      background: '#eee', // 可以根据需要设置背景色
    },
    title: {
      padding: 8,
      background: '#1890ff',
      textAlign: 'center',
      display: 'inline-block',
      color: 'white',
      borderRadius: '4px',
    }
  }
});

export default useStyles;
