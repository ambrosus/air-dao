import { AmbErrorProvider } from '@airdao/airdao-node-contracts';
// eslint-disable-next-line
import { allAmbNetworksConfig } from 'airdao-components-and-tools/utils';

const { REACT_APP_CHAIN_ID: chainId } = process.env;
const rpcUrl = allAmbNetworksConfig[chainId].rpcUrl;

const ambReadProvider = new AmbErrorProvider(rpcUrl, +chainId);

export default ambReadProvider;
