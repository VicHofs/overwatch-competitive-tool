import React from 'react';
import TeamSorter from 'pages/TeamSorter';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Overlay from 'pages/Overlay';
import Header from 'components/Header';
import OverlayMenu from 'pages/OverlayMenu';
import Footer from 'components/Footer';
import Tools from 'pages/Tools';
import About from 'pages/About';
import Home from 'pages/Home';
import { AppContainer } from 'styles';

const router = createBrowserRouter([
  {
    path: '/sorter',
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
  {
    path: '/tools',
    element: <Tools />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/',
    element: <Home />,
  },
]);

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </AppContainer>
  );
};

export default App;
