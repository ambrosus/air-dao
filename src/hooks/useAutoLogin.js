import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ConfiguredInjectedConnector } from '../utils/web3ReactConnectors';
import changeChainId from '../utils/changeChainId';

const { REACT_APP_CHAIN_ID } = process.env;

const useAutoLogin = () => {
  const { activate, error, connector } = useWeb3React();
  const [isLoaded, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { ethereum } = window;
      // eslint-disable-next-line no-underscore-dangle
      const isUnlocked = await (ethereum &&
        ethereum._metamask &&
        ethereum._metamask.isUnlocked());

      const lastAuthorizedWallet = localStorage.getItem('wallet');

      if (lastAuthorizedWallet === 'metamask' && isUnlocked) {
        activate(ConfiguredInjectedConnector).then(() => setLoading(true));
      } else {
        setLoading(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      console.error(error);

      if (connector instanceof InjectedConnector && !document.hidden) {
        changeChainId(window.ethereum, REACT_APP_CHAIN_ID);
      }
    }
  }, [error]);

  return isLoaded;
};

export default useAutoLogin;
