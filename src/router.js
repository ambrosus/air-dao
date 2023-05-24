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
import ChangeBondPrice from './pages/ChangeBondPrice/ChangeBondPrice';
import CommunityGovernance from './pages/CommunityGovernance';

const hideBondExchange = process.env.REACT_APP_HIDE_BOND_EXCHANGE === 'true';
const hideChangeBondPrice =
  process.env.REACT_APP_HIDE_CHANGE_BOND_PRICE === 'true';

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
    path: '/airdrop/',
    element: <Claim />,
  },
  {
    path: '/bond-marketplace/',
    element: hideBondExchange ? <BondExchangeMock /> : <BondExchange />,
  },
  {
    path: '/change-bond-price/',
    element: hideChangeBondPrice ? <NotFound /> : <ChangeBondPrice />,
  },
  {
    path: '/transition-to-community/',
    element: <CommunityGovernance />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
