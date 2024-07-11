import { Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Left from './Sider';
import Content from './Content';
import styles from './index.module.less';
export default function CustomLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
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
