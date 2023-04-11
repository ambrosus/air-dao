import { useEffect, useState } from 'react';
import { calculatePrice } from '../../../services/swapActions';
import BnToString from '../../../utils/BnToString';
import provider from '../../../services/provider';
import useSwapActions from './useSwapActions';

export default function useAmountAndPrice(amountToSell) {
  const [{ amount, price }, setData] = useState({
    amount: '',
    price: '',
  });

  const { getAmountOut } = useSwapActions();

  async function getAmountAndPrice(amountToSell) {
    if (!amountToSell) {
      const amountToReceiveForOneToken = await getAmountOut('1');
      const bnPrice = await calculatePrice('1', amountToReceiveForOneToken);
      const price = BnToString(bnPrice);
      return { amount: '', price };
    }

    const bnAmountToReceive = await getAmountOut(amountToSell);
    const amountToReceive = BnToString(bnAmountToReceive);

    const bnPrice = await calculatePrice(amountToSell, bnAmountToReceive);
    const price = BnToString(bnPrice);

    return { amount: amountToReceive, price };
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
