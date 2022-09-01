import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import bg from './assets/background.png';
import Menu from './components/Menu';
import { Web3ReactProvider } from '@web3-react/core';
import {providers} from "ethers";
import useAutoLogin from "./hooks/useAutoLogin";

const getLibrary = (provider = null) => new providers.Web3Provider(provider);

function App() {
  const isLoaded = useAutoLogin();
  return isLoaded && (
        <div>
          <img className="background" src={bg} alt="background"/>
          <div className="white-overlay" />
          {/*<Header/>*/}
          <Menu/>
          <div className="container">
            <Content/>
          </div>
          <Footer/>
        </div>
  );
}

export default () => (<Web3ReactProvider getLibrary={getLibrary}><App /></Web3ReactProvider>);
