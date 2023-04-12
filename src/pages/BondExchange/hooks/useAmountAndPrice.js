import { useEffect, useState } from 'react';
import { calculatePrice } from '../../../services/swapActions';
import BnToString from '../../../utils/BnToString';
import provider from '../../../services/provider';
import useSwapActions from './useSwapActions';
import { ethers } from 'ethers';
import formatFloatString from '../../../utils/formatFloatString';

export default function useAmountAndPrice(amountToSell) {
  const [{ amount, price }, setData] = useState({
    amount: '',
    price: '',
  });

  const { getAmountOut } = useSwapActions();

  async function getAmountAndPrice(amountToSell) {
    const bnOne = ethers.utils.parseEther('1');
    const bnAmountToSell = ethers.utils.parseEther(amountToSell || '0');

    if (bnAmountToSell.lt(bnOne)) {
      const bnBriceForOneToken = await getAmountOut('1');
      const price = BnToString(bnBriceForOneToken);
      return { amount: '', price };
    }

    const bnAmountToReceive = await getAmountOut(amountToSell);
    const amountToReceive = BnToString(bnAmountToReceive);

    const price = calculatePrice(amountToSell, amountToReceive);

    return { amount: amountToReceive, price: formatFloatString(price) };
  }

  useEffect(() => {
    function getDataAndSetState() {
      getAmountAndPrice(amountToSell).then(setData);
    }

    getDataAndSetState();

    provider.on('block', getDataAndSetState);
    return () => provider.off('block', getDataAndSetState);
  }, [amountToSell]);

  return { amount, price };
}
