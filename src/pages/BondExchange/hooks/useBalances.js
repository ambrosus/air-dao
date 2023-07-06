import { useEffect, useState } from 'react';
import BnToString from '../../../utils/BnToString';
import { createAirBondContract } from '../../../contracts';
import { useWeb3React } from '@web3-react/core';

export default function useBalances() {
  const { provider, account } = useWeb3React();
  const [balances, setBalances] = useState({
    ambBalance: '',
    airBondBalance: '',
  });

  const getAmbBalance = async (provider, account) => {
    const bnBalance = await provider.getBalance(account);
    return BnToString(bnBalance);
  };

  const getAirBondsBalance = async (provider, account) => {
    const AirBondsContract = await createAirBondContract(provider);
    const bnBalance = await AirBondsContract.balanceOf(account);
    return BnToString(bnBalance);
  };

  useEffect(() => {
    if (!provider || !account) {
      setBalances({ ambBalance: '', airBondBalance: '' });
      return;
    }

    const getBalances = async () => {
      const ambBalance = await getAmbBalance(provider, account);
      const airBondBalance = await getAirBondsBalance(provider, account);
      setBalances({ ambBalance, airBondBalance });
    };

    getBalances();
    provider.on('block', getBalances);
    return () => provider.off('block', getBalances);
  }, [account, provider]);

  return balances;
}
