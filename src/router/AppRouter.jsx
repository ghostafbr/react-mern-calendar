import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import { LoginPage } from '../auth/index.js';
import { CalendarRoutes } from '../calendar/index.js';
import { CalendarRouter } from '../calendar/index.js';

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
  let status = 'authenticated';

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
