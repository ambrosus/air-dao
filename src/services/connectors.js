import { initializeConnector } from '@web3-react/core';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';
import { getCurrentAmbNetwork } from 'airdao-components-and-tools/utils';

const ambNetwork = getCurrentAmbNetwork();
const projectId = process.env.REACT_APP_WC_PROJECT_ID;
export const [walletconnectConnector, walletconnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId,
        chains: [ambNetwork.chainId],
        showQrModal: true,
        rpcMap: {
          [ambNetwork.chainId]: ambNetwork.rpcUrl,
        },
      },
      defaultChainId: ambNetwork.chainId,
    })
);
