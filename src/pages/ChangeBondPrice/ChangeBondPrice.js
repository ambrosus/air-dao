import { useEffect, useState } from 'react';
import CurrencyInput from '../BondExchange/components/CurrencyInput';
import AmbIcon from '../../assets/icons/amb.svg';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import useAmountAndPrice from '../BondExchange/hooks/useAmountAndPrice';
import useBalances from '../BondExchange/hooks/useBalances';
import useSwapActions from '../BondExchange/hooks/useSwapActions';
import UiButton from '../../components/UiButton';
import usePoolInfo from './hooks/usePoolInfo';
import { removeAllUsersLiquidity } from '../../services/swapActions';
import { useWeb3React } from '@web3-react/core';

const ChangeBondPrice = () => {
  const [amountToSell, setAmountToSell] = useState('');

  const [ambLiquidityToAdd, setAmbLiquidityToAdd] = useState('');
  const [bondLiquidityToAdd, setBondLiquidityToAdd] = useState('');

  const { amount, price } = useAmountAndPrice(amountToSell, ['SAMB', 'BOND']);

  const { ambBalance, airBondBalance } = useBalances();

  const [approveState, setApproveState] = useState(false);

  const { account, provider } = useWeb3React();

  // const { state, stateList, setIsPending } = useSwapLayoutState(
  //   amountToSell,
  //   airBondBalance
  // );

  const { swapAmbForBond, addLiquidityAmbToBond, checkAllowance, approve } =
    useSwapActions();

  const poolInfo = usePoolInfo();

  const swapAmbAndWait = async () => {
    const tx = await swapAmbForBond(amountToSell);
    const res = await tx.wait();
    console.log(res);
  };

  const checkApproval = async () => {
    if (!bondLiquidityToAdd) return false;
    const res = await checkAllowance(bondLiquidityToAdd);
    console.log(res);
    return res;
  };

  useEffect(() => {
    checkApproval().then((res) => setApproveState(res));
  }, [bondLiquidityToAdd, checkAllowance, checkApproval]);

  const addLiquidityAndWait = async () => {
    const tx = await addLiquidityAmbToBond(
      ambLiquidityToAdd,
      bondLiquidityToAdd
    );
    const res = await tx.wait();
    console.log(res);
  };

  const approveAmbAndWait = async () => {
    const tx = await approve(bondLiquidityToAdd);
    const res = await tx.wait();
    console.log(res);
  };

  const removeAllLiquidityAndWait = async () => {
    const tx = await removeAllUsersLiquidity(provider.getSigner(), account);
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

          <div className='bond-exchange__input-block'>
            <h2 className='bond-exchange__heading'>Add liquidity</h2>
            <CurrencyInput
              onChange={setAmbLiquidityToAdd}
              value={ambLiquidityToAdd}
              selectedCoin={{ symbol: 'AMB', icon: AmbIcon }}
              balance={ambBalance || '-'}
            />
            <div className='bond-exchange__divider'>
              <div className='bond-exchange__divider-button'>+</div>
            </div>
            <CurrencyInput
              onChange={setBondLiquidityToAdd}
              value={bondLiquidityToAdd}
              className='bond-exchange__currency-input_last'
              selectedCoin={{ symbol: 'AirBond', icon: AmbIcon }}
              balance={airBondBalance || '-'}
            />

            {approveState && (
              <UiButton
                className='bond-exchange__swap-button'
                withBorder
                onClick={approveAmbAndWait}
              >
                Approve BOND
              </UiButton>
            )}

            <UiButton
              className='bond-exchange__swap-button'
              withBorder
              onClick={addLiquidityAndWait}
            >
              Add liquidity
            </UiButton>

            <UiButton
              className='bond-exchange__swap-button'
              withBorder
              onClick={removeAllLiquidityAndWait}
            >
              Get back all liquidity
            </UiButton>
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
