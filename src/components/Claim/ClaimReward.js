import UiButton from '../UiButton';
import PropTypes from 'prop-types';

const ClaimRewards = ({ claimRewards }) => (
  <div className='claim-block'>
    <div className='claim-block__heading'>
      <span className='claim-block__day'>Day 1</span>
      <span className='claim-block__claimed-text'>Total AirBonds claimed:</span>
      <span className='claim-block__claimed'>500</span>
    </div>
    <h2 className='claim-block__title'>Super!</h2>
    <p className='claim-block__text'>
      You are eligible to claim an airdrop! <b>+300 Airbonds</b> are ready to
      claim.
    </p>
    <p className='claim-block__subtitle'>
      AirBonds are vested AMB, rewarded to active community members.
    </p>
    <UiButton onClick={claimRewards} withBorder className='claim-block__btn'>
      Claim Reward
    </UiButton>
  </div>
);

ClaimRewards.propTypes = {
  claimRewards: PropTypes.func,
};

export default ClaimRewards;
