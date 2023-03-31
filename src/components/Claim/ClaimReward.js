import UiButton from '../UiButton';
import PropTypes from 'prop-types';

const ClaimRewards = ({ claimRewards, availableReward }) => (
  <>
    <h2 className='claim-block__title'>Super!</h2>
    <p className='claim-block__text'>
      You are eligible to claim an airdrop! <b>+{availableReward} Airbonds </b>
      are ready to claim.
    </p>
    <p className='claim-block__subtitle'>
      AirBonds are vested AMB, rewarded to active community members.
    </p>
    <UiButton onClick={claimRewards} withBorder className='claim-block__btn'>
      Claim Reward
    </UiButton>
  </>
);

ClaimRewards.propTypes = {
  claimRewards: PropTypes.func,
  availableReward: PropTypes.number,
};

export default ClaimRewards;
