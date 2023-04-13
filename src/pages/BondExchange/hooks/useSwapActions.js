import { useCallback } from 'react';
import {
  approveToRouter,
  checkIsApprovalRequired,
  getAmountToReceive,
  swapTokens,
} from '../../../services/swapActions';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

export default function useSwapActions() {
  const { library, account } = useWeb3React();

  const getAmountOut = useCallback((amountToSell) => {
    const bnAmountToSell = ethers.utils.parseEther(amountToSell);
    return getAmountToReceive(bnAmountToSell);
  }, []);

  const swap = useCallback(
    (amountToSell) => {
      const bnAmountToSell = ethers.utils.parseEther(amountToSell);
      return swapTokens(bnAmountToSell, account, library.getSigner());
    },
    [library, account]
  );

  const approve = useCallback(
    (amount) => {
      const bnAmount = ethers.utils.parseEther(amount);
      return approveToRouter(bnAmount, library.getSigner());
    },
    [library]
  );

  const checkAllowance = useCallback(
    (amount) => {
      const bnAmount = ethers.utils.parseEther(amount);
      return checkIsApprovalRequired(bnAmount, account, library.getSigner());
    },
    [library, account]
  );

  return { swap, approve, checkAllowance, getAmountOut };
}
