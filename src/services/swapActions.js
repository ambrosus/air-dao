import {
  createAirBondContract,
  createFactoryContract,
  createRouterContract,
} from '../contracts';
import Decimal from 'decimal.js-light';
import { ethers } from 'ethers';

const {
  REACT_APP_AIR_BOND_ADDRESS: airBondAddress,
  REACT_APP_SAMB_ADDRESS: sambAddress,
  REACT_APP_ROUTER_ADDRESS: routerAddress,
} = process.env;

const tokenAddresses = {
  BOND: airBondAddress,
  SAMB: sambAddress,
};

export async function getAmountsOut(amountToSell, tokens) {
  const routerContract = await createRouterContract();

  const path = tokens.map((token) => tokenAddresses[token]);

  const [, amountToReceive] = await routerContract.getAmountsOut(
    amountToSell,
    path
  );

  return amountToReceive;
}

export function calculatePrice(amountToSell = '', amountToReceive = '') {
  const decAmountToSell = new Decimal(amountToSell);
  const decAmountToReceive = new Decimal(amountToReceive);
  const decPrice = decAmountToReceive.div(decAmountToSell);
  return decPrice.toFixed(18);
}

export async function swapBondForAmb(amountToSell, receiver, signer) {
  const routerContract = await createRouterContract(signer);
  const amountToReceive = await getAmountsOut(amountToSell, ['BOND', 'SAMB']);
  const amountToReceiveWithSlippage = amountToReceive.div(100).mul(95);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  return routerContract.swapExactTokensForAMB(
    amountToSell,
    amountToReceiveWithSlippage,
    [airBondAddress, sambAddress],
    receiver,
    deadline
  );
}

export async function swapAmbForBond(amountToSell, receiver, signer) {
  const routerContract = await createRouterContract(signer);
  const amountToReceive = await getAmountsOut(amountToSell, ['SAMB', 'BOND']);
  const amountToReceiveWithSlippage = amountToReceive.div(100).mul(95);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  return routerContract.swapExactETHForTokens(
    amountToReceiveWithSlippage,
    [sambAddress, airBondAddress],
    receiver,
    deadline,
    { value: amountToSell }
  );
}

export async function checkIsApprovalRequired(amount, address, signer) {
  const AirBondsContract = await createAirBondContract(signer);
  const allowance = await AirBondsContract.allowance(address, routerAddress);
  return allowance.lt(amount);
}

export async function approveToRouter(amount, signer) {
  const AirBondsContract = await createAirBondContract(signer);
  return AirBondsContract.approve(routerAddress, amount);
}

export async function addLiquidityAmbToBond(
  amountAmb,
  amountBond,
  account,
  signer
) {
  const routerContract = await createRouterContract(signer);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  return routerContract.addLiquidityETH(
    airBondAddress,
    amountBond,
    0,
    0,
    account,
    deadline,
    { value: amountAmb }
  );
}

export async function removeAllUsersLiquidity(signer, account) {
  const factoryContract = await createFactoryContract(signer);
  const poolAddress = await factoryContract.getPair(
    airBondAddress,
    sambAddress
  );

  const POOL_ABI = [
    'function getReserves() view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)',
    'function balanceOf(address owner) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
  ];

  const pool = new ethers.Contract(poolAddress, POOL_ABI, signer);

  const liquidity = await pool.balanceOf(account);

  await pool.approve(routerAddress, liquidity).then((tx) => tx.wait());

  const routerContract = await createRouterContract(signer);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  return routerContract.removeLiquidityETH(
    airBondAddress,
    liquidity,
    0,
    0,
    account,
    deadline
  );
}
