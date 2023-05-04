import useSwapActions from '../hooks/useSwapActions';
import PropTypes from 'prop-types';
import UiButton from '../../../components/UiButton';
import InlineLoader from '../../../components/InlineLoader';
import { ReactComponent as Check } from '../../../assets/check.svg';

export default function ActionButton({
  state,
  stateList,
  setIsPending,
  setIsSuccess,
  amount,
  successCallback,
  connectWallet,
  ...props
}) {
  const { swap, approve } = useSwapActions();

  function swapAndWait() {
    setIsPending(true);
    swap(amount)
      .then((tx) => tx.wait())
      .then(() => {
        setIsPending(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
        successCallback();
      })
      .catch((e) => {
        setIsPending(false);
        console.log(e);
      });
  }

  function approveAndWait() {
    setIsPending(true);
    approve(amount)
      .then((tx) => tx.wait())
      .then(() => setIsPending(false))
      .catch(() => setIsPending(false));
  }

  const buttonProps = {
    [stateList.NOT_CONNECTED]: {
      disabled: false,
      children: 'Connect Wallet',
      onClick: connectWallet,
    },
    [stateList.NO_VALUE]: {
      disabled: true,
      children: 'Swap',
    },
    [stateList.INSUFFICIENT_BALANCE]: {
      disabled: true,
      children: 'Insufficient balance',
    },
    [stateList.APPROVAL_REQUIRED]: {
      disabled: false,
      children: 'Approve',
      onClick: approveAndWait,
    },
    [stateList.PENDING]: {
      disabled: true,
      children: <InlineLoader className='bond-exchange__button-loader' />,
    },
    [stateList.READY]: {
      disabled: false,
      children: 'Swap',
      onClick: swapAndWait,
    },
    [stateList.SUCCESS]: {
      disabled: true,
      children: <Check />,
      className:
        'bond-exchange__swap-button bond-exchange__swap-button_success',
    },
  };

  return (
    <UiButton
      className='bond-exchange__swap-button'
      withBorder
      {...buttonProps[state]}
      {...props}
    />
  );
}

ActionButton.propTypes = {
  state: PropTypes.string,
  stateList: PropTypes.object,
  setIsPending: PropTypes.func,
  setIsSuccess: PropTypes.func,
  amount: PropTypes.string,
  successCallback: PropTypes.func,
  connectWallet: PropTypes.func,
};
