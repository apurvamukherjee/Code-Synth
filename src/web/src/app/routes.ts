// This file defines the routing logic for the application.

import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';
import Page from './page';
import NotFound from './__create/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;