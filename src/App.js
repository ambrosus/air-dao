import Content from './pages/Content';
import Footer from './components/Footer';
import Menu from 'airdao-menu/build';
import { useWeb3React } from '@web3-react/core';
import useAutoLogin from './hooks/useAutoLogin';
import useAuthorization from './hooks/useAuthorization';
import Binance from './pages/Binance';
import { Routes, Route } from 'react-router-dom';

function App() {
  const isLoaded = useAutoLogin();
  const { account: address } = useWeb3React();
  const { loginMetamask, logout } = useAuthorization();

  return (
    isLoaded && (
      <>
        <div className='page-wrapper'>
          <Menu address={address} login={loginMetamask} logout={logout} />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="binance" element={<Binance />} />
          </Routes>
        </div>
        <Footer />
      </>
    )
  );
}

export default App;
