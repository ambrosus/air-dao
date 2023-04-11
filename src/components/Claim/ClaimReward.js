import UiButton from '../UiButton';
import PropTypes from 'prop-types';
import InlineLoader from '../InlineLoader';
import { AmbErrorProviderWeb3 } from '@airdao/airdao-node-contracts';
import { ethers } from 'ethers';

const ClaimRewards = ({
  claimRewards,
  availableReward,
  isClaimLoading,
  account,
}) => {
  const handleClick = async () => {
    const provider = new AmbErrorProviderWeb3(window.ethereum);
    const balance = await provider.getBalance(account);

    if (ethers.utils.formatEther(balance) >= 1000) {
      claimRewards();
    }
  };

  return (
    <>
      <h2 className='claim-block__title'>Super!</h2>
      <p className='claim-block__text'>
        You are eligible to claim an airdrop!
        <b> +{availableReward} Airbonds </b>
        are ready to claim.
      </p>
      <p className='claim-block__subtitle'>
        AirBonds are vested AMB, rewarded to active community members.
      </p>
      {isClaimLoading ? (
        <InlineLoader />
      ) : (
        <UiButton onClick={handleClick} withBorder className='claim-block__btn'>
          Claim Reward
        </UiButton>
      )}
    </>
  );
};

ClaimRewards.propTypes = {
  claimRewards: PropTypes.func,
  availableReward: PropTypes.number,
  isClaimLoading: PropTypes.bool,
  account: PropTypes.string,
};

export default ClaimRewards;
