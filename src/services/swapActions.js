import { ethers } from 'ethers';
import { createAirBondContract, createRouterContract } from '../contracts';

const {
  REACT_APP_AIR_BOND_ADDRESS: airBondAddress,
  REACT_APP_SAMB_ADDRESS: sambAddress,
  REACT_APP_ROUTER_ADDRESS: routerAddress,
} = process.env;

export async function getAmountToReceive(amountToSell) {
  const routerContract = await createRouterContract();

  const [, amountToReceive] = await routerContract.getAmountsOut(amountToSell, [
    airBondAddress,
    sambAddress,
  ]);

  return amountToReceive;
}

export async function calculatePrice(amountToSell, amountToReceive) {
  return amountToReceive.div(amountToSell);
}

export async function swapTokens(amountToSell, signer) {
  const routerContract = await createRouterContract(signer);
  const amountToReceive = await getAmountToReceive(amountToSell);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  return routerContract.swapExactTokensForETH(
    amountToSell,
    amountToReceive,
    [airBondAddress, sambAddress],
    ethers.constants.AddressZero,
    deadline
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
