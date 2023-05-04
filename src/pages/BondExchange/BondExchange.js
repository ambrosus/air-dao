import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyInput from './components/CurrencyInput';
import AmbIcon from '../../assets/icons/amb.svg';
import AirBondIcon from '../../assets/icons/airbond.svg';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import useAmountAndPrice from './hooks/useAmountAndPrice';
import useBalances from './hooks/useBalances';
import useSwapLayoutState from './hooks/useSwapLayoutState';
import ActionButton from './components/ActionButton';

import { WalletModal } from 'airdao-components-and-tools/components';
import { useAuthorization } from 'airdao-components-and-tools/hooks';
import { useWeb3React } from '@web3-react/core';

const BondExchange = () => {
  const [airBondsToSell, setAirBondsToSell] = useState('');

  const { amount: ambToReceive, price } = useAmountAndPrice(airBondsToSell);
  const { ambBalance, airBondBalance } = useBalances();
  const { state, stateList, setIsPending, setIsSuccess, setIsError } =
    useSwapLayoutState(airBondsToSell, airBondBalance);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const web3ReactInstance = useWeb3React();

  const { loginMetamask, loginWalletConnect } =
    useAuthorization(web3ReactInstance);

  return (
    <>
      <WalletModal
        isOpen={isModalOpen}
        {...{
          loginMetamask,
          loginWalletConnect,
          toggleModal,
        }}
      />
      <div className='bond-exchange'>
        <div className='container'>
          <div className='content bond-exchange__content'>
            <div className='bond-exchange__input-block'>
              <div className='bond-exchange__beta-mark'>Beta</div>
              <h2 className='bond-exchange__heading'>Bond Marketplace</h2>
              <p className='bond-exchange__lead'>
                AirBonds were rewarded to active community members.{' '}
                <Link to='/airdrop/' className='bond-exchange__lead-link'>
                  Claim your AirBonds
                </Link>
              </p>
              <CurrencyInput
                onChange={setAirBondsToSell}
                value={airBondsToSell}
                selectedCoin={{ symbol: 'AirBond', icon: AirBondIcon }}
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
                  {price} AMB per 1 BOND
                </div>
              </div>

              <ActionButton
                state={state}
                setIsPending={setIsPending}
                setIsSuccess={setIsSuccess}
                setIsError={setIsError}
                stateList={stateList}
                amount={airBondsToSell}
                successCallback={() => setAirBondsToSell('')}
                connectWallet={toggleModal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BondExchange;
