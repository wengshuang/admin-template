import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/index.tsx';

export default function CustomRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
