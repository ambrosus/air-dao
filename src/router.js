import { createBrowserRouter } from 'react-router-dom';
import Content from './pages/Content';
// import Team from './pages/Team';
import Binance from './pages/Binance';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Content />,
  },
  {
    path: '/binance',
    element: <Binance />,
  },
  {
    path: '/team',
    element: <Team />,
  },
]);

export default router;
