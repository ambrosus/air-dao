import Content from './components/Content';
import Footer from './components/Footer';
import bg from './assets/background.png';
import Menu from 'airdao-menu/build';
import { useWeb3React } from '@web3-react/core';
import useAutoLogin from './hooks/useAutoLogin';
import useAuthorization from './hooks/useAuthorization';

function App() {
  const isLoaded = useAutoLogin();
  const { account: address } = useWeb3React();
  const { loginMetamask, logout } = useAuthorization();

  return (
    isLoaded && (
      <>
        <div className='page-wrapper'>
          <img className='background' src={bg} alt='background' />
          <Menu address={address} login={loginMetamask} logout={logout} />
          <div className='white-overlay' />
          <div className='container'>
            <Content />
          </div>
        </div>
        <Footer />
      </>
    )
  );
}

export default App;
