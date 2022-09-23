import Content from './components/Content';
import Footer from './components/Footer';
import bg from './assets/background.png';
import Menu from 'airdao-menu/build';
import { Web3ReactProvider } from '@web3-react/core';
import {providers} from "ethers";
import useAutoLogin from "./hooks/useAutoLogin";
import {useWeb3React} from "@web3-react/core";
import useAuthorization from './hooks/useAuthorization';

const getLibrary = (provider = null) => new providers.Web3Provider(provider);

function App() {
  const isLoaded = useAutoLogin();
  const { account: address } = useWeb3React();
  const { loginMetamask, logout } = useAuthorization();

  return isLoaded && (
    <>
      <div className="page-wrapper">
        <img className="background" src={bg} alt="background"/>
        <Menu address={address} login={loginMetamask} logout={logout}/>
        <div className="white-overlay" />
        <div className="container">
          <Content/>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default () => (<Web3ReactProvider getLibrary={getLibrary}><App /></Web3ReactProvider>);
