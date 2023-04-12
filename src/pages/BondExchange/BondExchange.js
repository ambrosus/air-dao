import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyInput from './components/CurrencyInput';
import AmbIcon from '../../assets/icons/amb.svg';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import useAmountAndPrice from './hooks/useAmountAndPrice';
import useBalances from './hooks/useBalances';
import useSwapLayoutState from './hooks/useSwapLayoutState';
import ActionButton from './components/ActionButton';

const BondExchange = () => {
  const [airBondsToSell, setAirBondsToSell] = useState('');

  const { amount: ambToReceive, price } = useAmountAndPrice(airBondsToSell);
  const { ambBalance, airBondBalance } = useBalances();
  const { state, stateList, setIsPending } = useSwapLayoutState(
    airBondsToSell,
    airBondBalance
  );

  return (
    <div className='bond-exchange'>
      <div className='content bond-exchange__content'>
        <div className='bond-exchange__input-block'>
          <h2 className='bond-exchange__heading'>Bond Marketplace</h2>
          <p className='bond-exchange__lead'>
            AirBonds were rewarded to active community members.
            <Link to='/claim/' className='bond-exchange__lead-link'>
              Claim your AirBonds
            </Link>
          </p>
          <CurrencyInput
            onChange={setAirBondsToSell}
            value={airBondsToSell}
            selectedCoin={{ symbol: 'AirBond', icon: AmbIcon }}
            balance={airBondBalance || '-'}
          />
          <div className='bond-exchange__divider'>
            <div className='bond-exchange__divider-button'>
              <Arrow className='bond-exchange__arrow' />
            </div>
          </div>
          <CurrencyInput
            value={ambToReceive}
            className='bond-exchange__currency-input_last'
            selectedCoin={{ symbol: 'AMB', icon: AmbIcon }}
            balance={ambBalance || '-'}
            disabled
          />
          <div className='bond-exchange__price-row'>
            <div className='bond-exchange__price-name'>Price:</div>
            <div className='bond-exchange__price-value'>
              {price} AirBond per 1 AMB
            </div>
          </div>

          <ActionButton
            state={state}
            setIsPending={setIsPending}
            stateList={stateList}
            amount={airBondsToSell}
            successCallback={() => setAirBondsToSell('')}
          />
        </div>
      </div>
    </div>
  );
};

export default BondExchange;
