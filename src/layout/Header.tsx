import { Dropdown, Layout } from 'antd';
import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { UserInfoState, useUserInfo } from '@/store';
import { MenuOutlined } from '@ant-design/icons';

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
      <Row>
        <Col xs={2} sm={0} md={0} lg={0} xl={0} xxl={0}>
          <Button icon={<MenuOutlined />} type="text" />
        </Col>
        <Col className="header-left" xs={0} sm={0} md={12} lg={12} xl={12} xxl={12}>
          {/* <span className="iconfont icon-a-adminguanliyuanguanlizheyonghukehu"></span> */}
          <span className="title">react-admin-template</span>
        </Col>
        <Col className="header-right" xs={22} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Dropdown menu={{ items, onClick }}>
            <span className="username">欢迎，{userInfo.name}</span>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
