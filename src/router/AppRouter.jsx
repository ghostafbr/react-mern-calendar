import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import { LoginPage } from '../auth/index.js';
import { CalendarRoutes } from '../calendar/index.js';
import { CalendarRouter } from '../calendar/index.js';
import {useAuthStore} from "../hooks/index.js";
import {useEffect} from "react";

/* export const router = createHashRouter([
  {
    path: '/auth/*',
    element: <AuthRouter />,
    children: <LoginPage />,
  },
  {
    path: '/calendar',
    element: <CalendarRouter />,
    children: <CalendarPage />,
  },
]); */

export const AppRouter = () => {
  const {status, checkAuthToken } = useAuthStore();
  // const status = 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
        <h3>Checking...</h3>
    )
  }

  let routesConfig = createHashRouter([
    {
      path: '/',
      element: <CalendarRouter />,
      children: CalendarRoutes,
    },
  ]);

  if (status === 'authenticated') {
    routesConfig = createHashRouter([
      {
        path: '/',
        element: <CalendarRouter />,
        children: CalendarRoutes,
      },
      {
        path: '/*',
        element: <Navigate to={'/'} />,
      },
    ]);
  } else {
    routesConfig = createHashRouter([
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/*',
        element: <Navigate to={'/auth/login'} />,
      },
    ]);
  }
  return <RouterProvider router={routesConfig} />;
};
