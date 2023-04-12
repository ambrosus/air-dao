import { useEffect, useState } from 'react';
import BnToString from '../../../utils/BnToString';
import { createAirBondContract } from '../../../contracts';
import { useWeb3React } from '@web3-react/core';

export default function useBalances() {
  const { library, account } = useWeb3React();
  const [balances, setBalances] = useState({
    ambBalance: '',
    airBondBalance: '',
  });

  const getAmbBalance = async (library, account) => {
    const bnBalance = await library.getBalance(account);
    return BnToString(bnBalance);
  };

  const getAirBondsBalance = async (library, account) => {
    const AirBondsContract = await createAirBondContract(library);
    const bnBalance = await AirBondsContract.balanceOf(account);
    return BnToString(bnBalance);
  };

  useEffect(() => {
    if (!library || !account) {
      setBalances({ ambBalance: '', airBondBalance: '' });
      return;
    }

    const getBalances = async () => {
      const ambBalance = await getAmbBalance(library, account);
      const airBondBalance = await getAirBondsBalance(library, account);
      setBalances({ ambBalance, airBondBalance });
    };

    getBalances();
    library.on('block', getBalances);
    return () => library.off('block', getBalances);
  }, [account, library]);

  return balances;
}
