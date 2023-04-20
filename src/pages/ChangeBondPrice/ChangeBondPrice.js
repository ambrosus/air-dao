import { useState } from 'react';
import CurrencyInput from '../BondExchange/components/CurrencyInput';
import AmbIcon from '../../assets/icons/amb.svg';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import useAmountAndPrice from '../BondExchange/hooks/useAmountAndPrice';
import useBalances from '../BondExchange/hooks/useBalances';
// import useSwapLayoutState from './BondExchange/hooks/useSwapLayoutState';
// import ActionButton from './BondExchange/components/ActionButton';
import useSwapActions from '../BondExchange/hooks/useSwapActions';
import UiButton from '../../components/UiButton';
import usePoolInfo from './hooks/usePoolInfo';

const ChangeBondPrice = () => {
  const [amountToSell, setAmountToSell] = useState('');

  const { amount, price } = useAmountAndPrice(amountToSell, ['SAMB', 'BOND']);
  const { ambBalance, airBondBalance } = useBalances();

  // const { state, stateList, setIsPending } = useSwapLayoutState(
  //   amountToSell,
  //   airBondBalance
  // );

  const { swapAmbForBond } = useSwapActions();

  const poolInfo = usePoolInfo();

  const swapAmbAndWait = async () => {
    const tx = await swapAmbForBond(amountToSell);
    const res = await tx.wait();
    console.log(res);
  };

  return (
    <div className='bond-exchange exchange-control-panel'>
      <div className='container'>
        <div className='content bond-exchange__content'>
          <div className='bond-exchange__input-block'>
            <h2 className='bond-exchange__heading'>Manual buy BOND for AMB</h2>
            <CurrencyInput
              onChange={setAmountToSell}
              value={amountToSell}
              selectedCoin={{ symbol: 'AMB', icon: AmbIcon }}
              balance={ambBalance || '-'}
            />
            <div className='bond-exchange__divider'>
              <div className='bond-exchange__divider-button'>
                <Arrow className='bond-exchange__arrow' />
              </div>
            </div>
            <CurrencyInput
              value={amount}
              className='bond-exchange__currency-input_last'
              selectedCoin={{ symbol: 'AirBond', icon: AmbIcon }}
              balance={airBondBalance || '-'}
              disabled
            />
            <div className='bond-exchange__price-row'>
              <div className='bond-exchange__price-name'>Price:</div>
              <div className='bond-exchange__price-value'>
                {price} BOND per 1 AMB
              </div>
            </div>

            <UiButton
              className='bond-exchange__swap-button'
              withBorder
              onClick={swapAmbAndWait}
            >
              Swap
            </UiButton>

            {/*<ActionButton*/}
            {/*  state={state}*/}
            {/*  setIsPending={setIsPending}*/}
            {/*  stateList={stateList}*/}
            {/*  amount={amountToSell}*/}
            {/*  successCallback={() => setAmountToSell('')}*/}
            {/*/>*/}
          </div>
          <div className='bond-exchange__pool-info'>
            <h2 className='bond-exchange__heading'>Pool stats</h2>
            <div className={'info-list'}>
              {Object.keys(poolInfo).map((key) => (
                <>
                  <div className={'info-list__key'}>{key}:</div>{' '}
                  <div className='info-list__value'>{poolInfo[key]}</div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeBondPrice;
