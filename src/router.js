import { createBrowserRouter } from 'react-router-dom';
import Content from './pages/Content';
import Team from './pages/Team';
import Binance from './pages/Binance';
import MEXC from './pages/MEXC';
import NotFound from './pages/NotFound';
import Ambassadors from "./pages/Ambassadors";

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
  {
    path: 'ambassadors',
    element: <Ambassadors />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
