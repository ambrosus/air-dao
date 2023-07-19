import { useCallback } from 'react';
import {
  addLiquidityAmbToBond,
  approveToRouter,
  checkIsApprovalRequired,
  getAmountsOut,
  swapAmbForBond,
  swapBondForAmb,
} from '../../../services/swapActions';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

export default function useSwapActions() {
  const { provider, account } = useWeb3React();

  const wrappedGetAmountsOut = useCallback((amountToSell, tokens) => {
    const bnAmountToSell = ethers.utils.parseEther(amountToSell);
    return getAmountsOut(bnAmountToSell, tokens);
  }, []);

  const wrappedSwapBondForAmb = useCallback(
    (amountToSell) => {
      const bnAmountToSell = ethers.utils.parseEther(amountToSell);
      return swapBondForAmb(bnAmountToSell, account, provider.getSigner());
    },
    [provider, account]
  );

  const wrappedSwapAmbForBond = useCallback(
    (amountToSell) => {
      const bnAmountToSell = ethers.utils.parseEther(amountToSell);
      return swapAmbForBond(bnAmountToSell, account, provider.getSigner());
    },
    [provider, account]
  );

  const approve = useCallback(
    (amount) => {
      const bnAmount = ethers.utils.parseEther(amount);
      return approveToRouter(bnAmount, provider.getSigner());
    },
    [provider]
  );

  const checkAllowance = useCallback(
    (amount) => {
      const bnAmount = ethers.utils.parseEther(amount);
      return checkIsApprovalRequired(bnAmount, account, provider.getSigner());
    },
    [provider, account]
  );

  const wrappedAddLiquidityAmbToBond = useCallback(
    (amountAmb, amountBond) => {
      const bnAmountAmb = ethers.utils.parseEther(amountAmb);
      const bnAmountBond = ethers.utils.parseEther(amountBond);
      return addLiquidityAmbToBond(
        bnAmountAmb,
        bnAmountBond,
        account,
        provider.getSigner()
      );
    },
    [provider, account]
  );

  return {
    swap: wrappedSwapBondForAmb,
    approve,
    checkAllowance,
    getAmountsOut: wrappedGetAmountsOut,
    swapAmbForBond: wrappedSwapAmbForBond,
    addLiquidityAmbToBond: wrappedAddLiquidityAmbToBond,
  };
}
