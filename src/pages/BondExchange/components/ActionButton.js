import useSwapActions from '../hooks/useSwapActions';
import PropTypes from 'prop-types';
import UiButton from '../../../components/UiButton';
import InlineLoader from '../../../components/InlineLoader';

export default function ActionButton({
  state,
  stateList,
  setIsPending,
  amount,
  successCallback,
  ...props
}) {
  const { swap, approve } = useSwapActions();

  function swapAndWait() {
    setIsPending(true);
    swap(amount)
      .then((tx) => tx.wait())
      .then(() => {
        setIsPending(false);
        successCallback();
      })
      .catch(() => setIsPending(false));
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
      onClick: () => alert('connect wallet'),
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
  amount: PropTypes.string,
  successCallback: PropTypes.func,
};
