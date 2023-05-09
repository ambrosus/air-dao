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
  setIsError,
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
        if (e.code === 'ACTION_REJECTED') return;
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        console.log(e);
      });
  }

  function approveAndWait() {
    setIsPending(true);
    approve(amount)
      .then((tx) => tx.wait())
      .then(() => setIsPending(false))
      .catch((e) => {
        setIsPending(false);
        if (e.code === 'ACTION_REJECTED') return;
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        console.log(e);
      });
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
      children: (
        <>
          <Check /> Success
        </>
      ),
      className:
        'bond-exchange__swap-button bond-exchange__swap-button_success',
    },
    [stateList.ERROR]: {
      disabled: true,
      children: "There's some error",
      className: 'bond-exchange__swap-button bond-exchange__swap-button_error',
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
  setIsError: PropTypes.func,
  amount: PropTypes.string,
  successCallback: PropTypes.func,
  connectWallet: PropTypes.func,
};
