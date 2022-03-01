import { Navigate } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Account from './pages/Account';
import CreateUser from './pages/CreateUser';
import NotFound from './pages/Page404';
import Settings from './pages/Settings';

// ----------------------------------------------------------------------

const routers = (isAuthenticated) => [
  {
    path: '/dashboard',
    element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { element: <Navigate to="/dashboard/app" replace /> },
      { path: 'app', element: <DashboardApp /> },
      { path: 'user', element: <User /> },
      { path: 'products', element: <Products /> },
      { path: 'blog', element: <Blog /> },
      { path: 'account', element: <Account /> },
      { path: 'user/create', element: <CreateUser /> },
      { path: 'settings', element: <Settings /> }
    ]
  },
  {
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  { path: '*', element: <Navigate to="/404" replace /> }
];

export default routers;
