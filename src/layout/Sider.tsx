import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import routes, { RouteType } from '@/routes/config';
import { UserInfoState, useUserInfo } from '@/store';

const { Sider } = Layout;

const resetRoute = (routes: RouteType[], auth: string): any => {
  // 递归routes并返回
  return routes
    .filter((item) => item.show && item.auth?.includes(auth))
    .map((item: RouteType) => {
      const children = item.children?.filter((item) => item.show);
      if (children?.length) {
        return {
          key: item.path,
          label: <Link to={item.path}>{item.title}</Link>,
          icon: item.icon,
          children: resetRoute(
            children.filter((item) => item.show && item.auth?.includes(auth)),
            auth,
          ),
        };
      }
      return {
        key: item.path,
        icon: item.icon,
        label: <Link to={item.path}>{item.title}</Link>,
      };
    });
};

export default function CustomSider() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);
  const [menus, setMenus] = useState<any[]>([]);
  const userInfo = useUserInfo((state: UserInfoState) => state.userInfo);

  useEffect(() => {
    setMenus(resetRoute(routes, userInfo.name as string));
  }, [userInfo]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);
  return (
    <Sider
      width={240}
      theme="light"
      breakpoint="md"
      collapsed={collapsed}
      collapsible
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu mode="inline" selectedKeys={selectedKeys} items={menus} theme="light" />
    </Sider>
  );
}
