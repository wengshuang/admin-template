import { Layout } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserInfoState, useUserInfo } from '@/store';

import Content from './Content';
import Header from './Header';
import styles from './index.module.less';
import Left from './Sider';

export default function CustomLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = useUserInfo((state: UserInfoState) => state.routes);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', {
        replace: true,
      });
    }
    if (location.pathname === '/') {
      if (routes.length) {
        navigate(routes[0].path, {
          replace: true,
        });
      } else {
        navigate('/403', {
          replace: true,
        });
      }
    }
  }, [location]);
  return (
    <Layout className={styles['layout']}>
      <Header />
      <Layout>
        <Left></Left>
        <Content></Content>
      </Layout>
    </Layout>
  );
}
