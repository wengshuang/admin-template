import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import routes, { RouteType } from '@/routes/config';
const { Sider } = Layout;
const items = routes.map((item: RouteType) => ({
  key: item.path,
  path: item.path,
  icon: item.icon,
  label: <Link to={item.path}>{item.title}</Link>,
}));
export default function CustomSider() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);
  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);
  return (
    <Sider
      width={200}
      breakpoint="lg"
      collapsed={collapsed}
      collapsible
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} items={items} />
    </Sider>
  );
}
