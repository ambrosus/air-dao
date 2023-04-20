import { useEffect, useState } from 'react';
import { calculatePrice } from '../../../services/swapActions';
import BnToString from '../../../utils/BnToString';
import provider from '../../../services/provider';
import useSwapActions from './useSwapActions';
import { ethers } from 'ethers';
import formatFloatString from '../../../utils/formatFloatString';

export default function useAmountAndPrice(
  amountToSell,
  tokens = ['BOND', 'SAMB']
) {
  const [{ amount, price }, setData] = useState({
    amount: '',
    price: '',
  });

  const { getAmountsOut } = useSwapActions();

  async function getAmountAndPrice(amountToSell) {
    const bnOne = ethers.utils.parseEther('1');
    const bnAmountToSell = ethers.utils.parseEther(amountToSell || '0');

    if (bnAmountToSell.lt(bnOne)) {
      const bnBriceForOneToken = await getAmountsOut('1', tokens);
      const price = BnToString(bnBriceForOneToken);
      return { amount: '', price };
    }

    const bnAmountToReceive = await getAmountsOut(amountToSell, tokens);
    const amountToReceive = BnToString(bnAmountToReceive);

    const price = calculatePrice(amountToSell, amountToReceive);

    return { amount: amountToReceive, price: formatFloatString(price) };
  }

  useEffect(() => {
    function getAmountAndPriceAndSetToState() {
      getAmountAndPrice(amountToSell).then(setData);
    }

    getAmountAndPriceAndSetToState();

    provider.on('block', getAmountAndPriceAndSetToState);
    return () => provider.off('block', getAmountAndPriceAndSetToState);
  }, [amountToSell]);

  return { amount, price };
}
