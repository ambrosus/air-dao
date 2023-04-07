import { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import UiButton from '../components/UiButton';
import { Link } from 'react-router-dom';
import CurrencyInput from '../components/BondExchange/CurrencyInput';
import AmbIcon from '../assets/icons/amb.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';

const BondExchange = () => {
  const [airBondsToSell, setAirBondsToSell] = useState('');
  const [ambToReceive, setAmbToReceive] = useState('');
  const [price, setPrice] = useState('');

  const [ambBalance, setAmbBalance] = useState('');
  const [airBondsBalance, setAirBondsBalance] = useState('');
  const { account, library } = useWeb3React();

  const getAmbBalance = async (library, account) => {
    const bnBalance = await library.getBalance(account);
    const balance = BNtoString(bnBalance);
    setAmbBalance(balance);
  };

  const getAirBondsBalance = async (library, account) => {
    const bnBalance = await AirBondsContract.balanceOf(account);
    const balance = BNtoString(bnBalance);
    setAirBondsBalance(balance);
  };

  useEffect(() => {
    if (!library || !account) return;
    const listener = (val) => {
      getAmbBalance(library, account);
      getAirBondsBalance(library, account);
      console.log(val);
    };
    library.on('block', listener);
    return () => library.off('block', listener);
  }, [library, account]);

  const abi = [
    'function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[] amounts)',
    'function swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) returns (uint256[] amounts)',
  ];

  const erc20Abi = [
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function balanceOf(address account) view returns (uint256)',
  ];

  const ROUTER_ADDRESS = '0xfBE44B3BF26B966d652365066De53AD7FAC676b1';
  const AMB_BOND_ADDRESS = '0xC6613c683f2d4684D806FAcb9D413f41221537c6';
  const SAMB_ADDRESS = '0x7cee2ae3042D2C646Aa24FACfA92dfeE589046f0';

  const routerContract = useMemo(() => {
    const signer = library.getSigner();
    return new ethers.Contract(ROUTER_ADDRESS, abi, signer);
  }, [library]);

  const AirBondsContract = useMemo(() => {
    const signer = library.getSigner();
    return new ethers.Contract(AMB_BOND_ADDRESS, erc20Abi, signer);
  }, [library]);

  const getAmountToReceive = async (amountToSell) => {
    const [, amountToReceive] = await routerContract.getAmountsOut(
      ethers.utils.parseEther(amountToSell),
      [AMB_BOND_ADDRESS, SAMB_ADDRESS]
    );

    return amountToReceive;
  };

  const getPrice = async () => {
    const amountToSell = airBondsToSell || '1';
    const amountToReceive = await getAmountToReceive(amountToSell);
    const price = amountToReceive.div(amountToSell);
    setPrice(BNtoString(price));
  };

  useEffect(() => {
    getPrice();
  }, [airBondsToSell]);

  useEffect(() => {
    if (!airBondsToSell) {
      setAmbToReceive('');
      return;
    }
    (async () => {
      const BnAmountToReceive = await getAmountToReceive(airBondsToSell);

      setAmbToReceive(BNtoString(BnAmountToReceive));
    })();
  }, [airBondsToSell]);

  const BNtoString = (bn) => {
    const floatString = ethers.utils.formatEther(bn);
    const [intPart, floatPart] = floatString.split('.');
    if (floatPart && floatPart.length > 3) {
      return `${intPart}.${floatPart.slice(0, 3)}`;
    } else if (floatPart && parseInt(floatPart) !== 0) {
      return `${intPart}.${floatPart}`;
    } else {
      return intPart;
    }
  };

  const swap = async () => {
    const amountToSell = ethers.utils.parseEther(airBondsToSell);

    await approveAllowanceIfNeeded(amountToSell);

    await routerContract.swapExactTokensForETH(
      amountToSell,
      0,
      [AMB_BOND_ADDRESS, SAMB_ADDRESS],
      account,
      Math.round((Date.now() + 1000 * 60 * 10) / 1000)
    );
  };

  const approveAllowanceIfNeeded = async (amount) => {
    const allowance = await AirBondsContract.allowance(account, ROUTER_ADDRESS);
    if (allowance.lt(amount)) {
      await AirBondsContract.approve(ROUTER_ADDRESS, amount).then((tx) =>
        tx.wait()
      );
    }
  };

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
            balance={airBondsBalance}
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
            balance={ambBalance}
            disabled
          />
          <div className='bond-exchange__price-row'>
            <div className='bond-exchange__price-name'>Price:</div>
            <div className='bond-exchange__price-value'>
              {price} AirBond per 1 AMB
            </div>
          </div>

          <UiButton
            withBorder
            onClick={swap}
            className='bond-exchange__swap-button'
          >
            Swap
          </UiButton>
        </div>
      </div>
    </div>
  );
};

export default BondExchange;
