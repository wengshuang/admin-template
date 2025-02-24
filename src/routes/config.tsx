import { lazy, ReactNode, Suspense } from 'react';

import { FileTextOutlined, FormOutlined, HomeOutlined, TableOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Home = lazy(() => import('@/pages/Home/index.tsx'));
const List = lazy(() => import('@/pages/List/index.tsx'));
const Detail = lazy(() => import('@/pages/List/Detail/index.tsx'));
const Form = lazy(() => import('@/pages/Form/index.tsx'));
export type RouteType = {
  path: string;
  title: string;
  index: boolean;
  icon: JSX.Element;
  element: JSX.Element;
  show: boolean;
  children?: RouteType[];
  parentKey?: string;
  auth: string[];
};

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" tip="页面加载中...">
        <span
          style={{
            padding: 50,
            borderRadius: 4,
          }}
        ></span>
      </Spin>
    </div>
  );
};

const LoadingPage = ({ temp }: { temp: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{temp}</Suspense>;
};

const routes: RouteType[] = [
  {
    path: '/home',
    title: '首页',
    index: false,
    show: true,
    auth: ['admin', 'user'],
    icon: <HomeOutlined />,
    element: <LoadingPage temp={<Home />} />,
  },
  {
    path: '/list',
    title: '列表页',
    index: false,
    show: true,
    auth: ['admin'],
    icon: <TableOutlined />,
    element: <LoadingPage temp={<List />} />,
    children: [
      {
        path: '/list/detail/:id',
        parentKey: '/list',
        title: '详情页',
        index: false,
        auth: ['admin'],
        show: false,
        icon: <FileTextOutlined />,
        element: <LoadingPage temp={<Detail />} />,
      },
    ],
  },
  {
    path: '/form',
    title: '表单',
    index: false,
    show: true,
    auth: ['admin', 'user'],
    icon: <FormOutlined />,
    element: <LoadingPage temp={<Form />} />,
  },
];
export default routes;
