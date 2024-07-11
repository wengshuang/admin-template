import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/index.tsx';
import Layout from '@/layout';
import routes, { RouteType } from './config';

export default function CustomRoutes() {
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
      </Routes>
    </BrowserRouter>
  );
}
