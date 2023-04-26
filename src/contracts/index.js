import { ethers } from 'ethers';
import AmbReadProvider from '../services/provider';

import erc20Abi from './erc20Abi.json';
import routerAbi from './routerAbi';
import factoryAbi from './factoryAbi';

const {
  REACT_APP_ROUTER_ADDRESS: routerAddress,
  REACT_APP_AIR_BOND_ADDRESS: airBondAddress,
  REACT_APP_SAMB_ADDRESS: sambAddress,
  REACT_APP_FACTORY_ADDRESS: factoryAddress,
} = process.env;

export function createRouterContract(provider = AmbReadProvider) {
  return new ethers.Contract(routerAddress, routerAbi, provider);
}

export function createFactoryContract(provider = AmbReadProvider) {
  return new ethers.Contract(factoryAddress, factoryAbi, provider);
}

export function createAirBondContract(provider = AmbReadProvider) {
  return new ethers.Contract(airBondAddress, erc20Abi, provider);
}

export function createSambContract(provider = AmbReadProvider) {
  return new ethers.Contract(sambAddress, erc20Abi, provider);
}
