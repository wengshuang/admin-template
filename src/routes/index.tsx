import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/index.tsx';
import Layout from '@/layout';
import { useUserInfo, UserInfoState } from '@/store';
import routes, { RouteType } from '@/routes/config';
import NotFound from './404';
import NoAuth from './403';

// 扁平化routes
const flatRoutes = (routes: RouteType[]): RouteType[] => {
  let arr: RouteType[] = [];
  routes.forEach((item) => {
    arr.push(item);
    if (item.children) {
      arr = arr.concat(flatRoutes(item.children));
    }
  });
  return arr;
};

const flatRoutesArr = flatRoutes(routes);
export default function CustomRoutes() {
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const userInfo = useUserInfo((state: UserInfoState) => state.userInfo);
  const setStoreRoutes = useUserInfo((state: UserInfoState) => state.setRoutes);
  useEffect(() => {
    console.log(userInfo, 'userInfo');
    const r = flatRoutesArr.filter((item: RouteType) =>
      item.auth?.includes(userInfo.name as string),
    );
    setRoutes(r);
    setStoreRoutes(r);
  }, [userInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {routes.map((route: RouteType) => {
            return (
              <Route
                key={route.path}
                index={route.index}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/403" element={<NoAuth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
