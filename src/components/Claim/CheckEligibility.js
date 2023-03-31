import UiButton from '../UiButton';
import PropTypes from 'prop-types';

const CheckEligibility = ({ handleEligibility }) => (
  <>
    <h2 className='claim-block__title'>AirBonds Airdrop</h2>
    <p className='claim-block__text'>
      Discover how many AirBonds you can claim in reward for your activity on
      AirDAO.
    </p>
    <p className='claim-block__subtitle'>
      AirBonds are vested AMB, rewarded to active community members.
    </p>
    <UiButton
      onClick={handleEligibility}
      withBorder
      className='claim-block__btn'
    >
      Check Eligibility
    </UiButton>
  </>
);

CheckEligibility.propTypes = {
  handleEligibility: PropTypes.func,
};

export default CheckEligibility;
