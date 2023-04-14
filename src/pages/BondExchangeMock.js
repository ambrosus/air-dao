import { Link } from 'react-router-dom';
import UiButton from '../components/UiButton';
import CurrencyInput from './BondExchange/components/CurrencyInput';
import AmbIcon from '../assets/icons/amb.svg';
import AirBondIcon from '../assets/icons/airbond.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';

export default function BondExchangeMock() {
  return (
    <div className='bond-exchange'>
      <div className='container'>
        <div className='content bond-exchange__content'>
          <div className='bond-exchange__input-block'>
            <h2 className='bond-exchange__heading'>Bond Marketplace</h2>
            <p className='bond-exchange__lead'>
              AirBonds were rewarded to active community members.{' '}
              <Link to='/claim/' className='bond-exchange__lead-link'>
                Claim your AirBonds
              </Link>
            </p>
            <div className='bond-exchange__blur'>
              <CurrencyInput
                onChange={() => {}}
                value={'1000'}
                selectedCoin={{ symbol: 'AirBond', icon: AirBondIcon }}
                balance={'-'}
                disabled
              />
              <div className='bond-exchange__divider'>
                <div className='bond-exchange__divider-button'>
                  <Arrow className='bond-exchange__arrow' />
                </div>
              </div>
              <CurrencyInput
                value={'800'}
                className='bond-exchange__currency-input_last'
                selectedCoin={{ symbol: 'AMB', icon: AmbIcon }}
                balance={'-'}
                disabled
              />
            </div>
            <div className='bond-exchange__price-row'>
              <div className='bond-exchange__price-name'>Price:</div>
              <div className='bond-exchange__price-value'>
                0.8 AirBond per 1 AMB
              </div>
            </div>
            <UiButton
              onClick={() => {}}
              className='bond-exchange__swap-button'
              withBorder
            >
              Coming Soon
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  );
}
