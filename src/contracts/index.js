import { ethers } from 'ethers';
import AmbReadProvider from '../services/provider';

import erc20Abi from './erc20Abi.json';
import routerAbi from './routerAbi';

const {
  REACT_APP_ROUTER_ADDRESS: routerAddress,
  REACT_APP_AIR_BOND_ADDRESS: airBondAddress,
  REACT_APP_SAMB_ADDRESS: sambAddress,
} = process.env;

function createRouterContract(provider = AmbReadProvider) {
  return new ethers.Contract(routerAddress, routerAbi, provider);
}

function createAirBondContract(provider = AmbReadProvider) {
  return new ethers.Contract(airBondAddress, erc20Abi, provider);
}

function createSambContract(provider = AmbReadProvider) {
  return new ethers.Contract(sambAddress, erc20Abi, provider);
}

export { createRouterContract, createAirBondContract, createSambContract };
