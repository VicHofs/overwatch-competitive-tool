import React from 'react';
import TeamSorter from 'pages/TeamSorter';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Overlay from 'pages/Overlay';
import Header from 'components/Header';
import OverlayMenu from 'pages/OverlayMenu';

const router = createBrowserRouter([
  {
    path: '/team-sorter',
    element: <TeamSorter />,
  },
  {
    path: '/overlay',
    element: <OverlayMenu />,
  },
  {
    path: '/overlay/:tag',
    element: <Overlay />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
