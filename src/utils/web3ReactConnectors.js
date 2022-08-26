import { InjectedConnector } from '@web3-react/injected-connector';

const { REACT_APP_CHAIN_ID } = process.env;

export const ConfiguredInjectedConnector = new InjectedConnector({
  supportedChainIds: [+REACT_APP_CHAIN_ID],
});
