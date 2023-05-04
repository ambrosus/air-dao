import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import useSwapActions from './useSwapActions';

const stateList = {
  NOT_CONNECTED: 'NOT_CONNECTED',
  NO_VALUE: 'NO_VALUE',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  APPROVAL_REQUIRED: 'APPROVAL_REQUIRED',
  PENDING: 'PENDING',
  READY: 'READY',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default function useSwapLayoutState(airBondsToSell, airBondsBalance) {
  const [state, setState] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const { account } = useWeb3React();
  const { checkAllowance } = useSwapActions();

  async function checkStates(
    account,
    airBondsToSell,
    airBondsBalance,
    isPending,
    isSuccess,
    isError,
    checkAllowance
  ) {
    if (isPending) {
      setState(stateList.PENDING);
      return;
    }

    if (isSuccess) {
      setState(stateList.SUCCESS);
      return;
    }

    if (isError) {
      setState(stateList.ERROR);
      return;
    }

    if (!account) {
      setState(stateList.NOT_CONNECTED);
      return;
    }

    const bnAirBondsToSell = ethers.utils.parseEther(airBondsToSell || '0');
    const bnOne = ethers.utils.parseEther('1');

    if (bnAirBondsToSell.lt(bnOne)) {
      setState(stateList.NO_VALUE);
      return;
    }

    if (airBondsBalance) {
      const bnAirBondsToSell = ethers.utils.parseEther(airBondsToSell);
      const bnAirBondsBalance = ethers.utils.parseEther(airBondsBalance);

      if (bnAirBondsToSell.gt(bnAirBondsBalance)) {
        setState(stateList.INSUFFICIENT_BALANCE);
        return;
      }

      const isApprovalRequired = await checkAllowance(airBondsToSell);
      if (isApprovalRequired) {
        setState(stateList.APPROVAL_REQUIRED);
        return;
      }
    }

    setState(stateList.READY);
  }

  useEffect(() => {
    checkStates(
      account,
      airBondsToSell,
      airBondsBalance,
      isPending,
      isSuccess,
      isError,
      checkAllowance
    );
  }, [
    account,
    airBondsToSell,
    airBondsBalance,
    isPending,
    isSuccess,
    isError,
    checkAllowance,
  ]);

  return { state, stateList, setIsPending, setIsSuccess, setIsError };
}
