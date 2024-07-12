import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

export default function CustomContent() {
  return (
    <Layout style={{ padding: '20px', backgroundColor: 'transparent' }}>
      <Outlet />
    </Layout>
  );
}
