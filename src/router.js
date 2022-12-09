import { createBrowserRouter } from 'react-router-dom';
import Content from './pages/Content';
import Team from './pages/Team';
import Binance from './pages/Binance';
import MEXC from './pages/MEXC';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Content />,
  },
  {
    path: '/binance/',
    element: <Binance />,
  },
  {
    path: '/team/',
    element: <Team />,
  },
  {
    path: '/mexc/',
    element: <MEXC />,
  },
]);

export default router;
