import { FloatButton } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import THEME from '@/lib/theme';

function AppFloatingButton({
  show,
  setShow,
  onClick,
  text,
  buttonStyle = { top: 350, left: 10, right: 'auto', bottom: 'auto' },
}) {
  const handleOnClick = (e) => {
    if (!show && !THEME.isLgScreen()) {
      window.scrollTo(0, 0);
    }
    if (onClick) {
      onClick(e);
    } else {
      if (setShow) {
        setShow(!show);
      }
    }
  };
  return (
    <FloatButton
      onClick={(e) => handleOnClick(e)}
      style={buttonStyle}
      tooltip={show ? <div>Hide {text}</div> : <div>Show {text}</div>}
      icon={show ? <LeftCircleOutlined /> : <RightCircleOutlined />}
    />
  );
}

export default AppFloatingButton;
