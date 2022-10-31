import { useWeb3React } from '@web3-react/core';
import { ConfiguredInjectedConnector } from '../utils/web3ReactConnectors';

const useAuthorization = () => {
  const { activate, deactivate } = useWeb3React();

  const loginMetamask = () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      activate(ConfiguredInjectedConnector).then(() => {
        localStorage.setItem('wallet', 'metamask');
      });
    } else {
      window
        .open(
          `https://metamask.app.link/dapp/${
            window.location.hostname + window.location.pathname
          }`
        )
        .focus();
    }
  };

  const logout = () => {
    localStorage.removeItem('wallet');
    deactivate();
  };

  return {
    loginMetamask,
    logout,
  };
};

export default useAuthorization;
