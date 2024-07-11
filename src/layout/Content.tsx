import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export default function CustomContent() {
  return (
    <Layout style={{ padding: '20px', backgroundColor: 'transparent' }}>
      <Outlet />
    </Layout>
  );
}
