import { createBrowserRouter } from 'react-router-dom';
import Content from './pages/Content';
import Team from './pages/Team';
import Binance from './pages/Binance';
import MEXC from './pages/MEXC';
import NotFound from './pages/NotFound';
import Ambassadors from './pages/Ambassadors';
import Claim from './pages/Claim';
import BondExchange from './pages/BondExchange';
import BondExchangeMock from './pages/BondExchangeMock';

const hideBondExchange = process.env.REACT_APP_HIDE_BOND_EXCHANGE === 'true';

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
    path: '/claim/',
    element: <Claim />,
  },
  {
    path: '/bond-exchange/',
    element: hideBondExchange ? <BondExchangeMock /> : <BondExchange />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
