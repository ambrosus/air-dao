import UiButton from '../UiButton';

const SuccessClaim = () => (
  <div className='claim-block'>
    <div className='claim-block__heading'>
      <span className='claim-block__day'>Day 1</span>
      <span className='claim-block__claimed-text'>Total AirBonds claimed:</span>
      <span className='claim-block__claimed'>500</span>
    </div>
    <h2 className='claim-block__title'>You&apos;ve claimed your AirBonds!</h2>
    <p className='claim-block__text'>Nice! You claimed the airdrop.</p>
    <p className='claim-block__subtitle'>
      AirBonds are vested AMB, rewarded to active community members.
    </p>
    <UiButton withBorder className='claim-block__btn'>
      Open Marketplace
    </UiButton>
  </div>
);

export default SuccessClaim;
