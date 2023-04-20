import UiButton from '../UiButton';

const SuccessClaim = () => (
  <>
    <h2 className='claim-block__title'>Congratulations!</h2>
    <p className='claim-block__text'>
      Your BOND tokens are now in your wallet. You will be able to trade them on
      the AirBond Marketplace soon.
    </p>
    <UiButton
      withBorder
      className='claim-block__btn claim-block__btn_marketplace'
    >
      <a href='/bond-marketplace/'>Bond Marketplace</a>
    </UiButton>
  </>
);

export default SuccessClaim;
