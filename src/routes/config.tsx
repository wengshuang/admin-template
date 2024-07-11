import { lazy, Suspense } from 'react';
import { HomeOutlined } from '@ant-design/icons';
const Home = lazy(() => import('@/pages/Home/index.tsx'));

export type RouteType = {
  path: string;
  title: string;
  index: boolean;
  icon: JSX.Element;
  element: JSX.Element;
};

export default [
  {
    path: '/home',
    title: '首页',
    index: true,
    icon: <HomeOutlined />,
    element: (
      <Suspense fallback={<>...</>}>
        <Home />
      </Suspense>
    ),
  },
];
