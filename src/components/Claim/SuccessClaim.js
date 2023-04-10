import UiButton from '../UiButton';

const SuccessClaim = () => (
  <>
    <h2 className='claim-block__title'>You&apos;ve claimed your AirBonds!</h2>
    <p className='claim-block__text'>Nice! You claimed the airdrop.</p>
    <p className='claim-block__subtitle'>
      AirBonds are vested AMB, rewarded to active community members.
    </p>
    <UiButton withBorder className='claim-block__btn claim-block__btn_marketplace'>
      <a
        href='https://staging-testnet.airdao.io/bond-exchange/'
        target='_blank'
        rel='noreferrer'
      >
        Open Marketplace
      </a>
    </UiButton>
  </>
);

export default SuccessClaim;
