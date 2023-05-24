import UiButton from '../UiButton';

const BondsEnds = () => (
  <>
    <h2 className='claim-block__title'>You&apos;re Awesome!</h2>
    <p className='claim-block__text'>
      You have claimed all available rewards. You will be able to trade them on
      the AirBond Marketplace soon.
    </p>
    <UiButton
      withBorder
      className='claim-block__btn claim-block__btn_marketplace'
    >
      <a href='/bond-marketplace'>Bond Marketplace</a>
    </UiButton>
  </>
);

export default BondsEnds;
