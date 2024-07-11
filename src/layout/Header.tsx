import { Layout, Dropdown } from 'antd';
import { useUserInfo, UserInfoState } from '@/store';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
const { Header } = Layout;
const items = [
  {
    key: '1',
    label: <span>退出登录</span>,
  },
];

export default function CustomHeader() {
  const navigate = useNavigate();
  const logout = useUserInfo((state: UserInfoState) => state.logout);
  const userInfo = useUserInfo((state: UserInfoState) => state.userInfo);

  const onClick = ({ key }: { key: number | string }) => {
    if (key === '1') {
      handleLogout();
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/login', {
      replace: true,
    });
  };
  return (
    <Header className={styles['header']}>
      <div className="header-left">
        <span className="iconfont icon-a-adminguanliyuanguanlizheyonghukehu"></span>
        <span className="title">react-admin-template</span>
      </div>
      <div className="header-right">
        <Dropdown menu={{ items, onClick }}>
          <span className="username">欢迎，{userInfo.name}</span>
        </Dropdown>
      </div>
    </Header>
  );
}
