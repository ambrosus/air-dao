import UiButton from '../UiButton';
import PropTypes from 'prop-types';

const CheckEligibility = ({ handleEligibility }) => (
  <div className='claim-block'>
    <div className='claim-block__heading'>
      <span className='claim-block__day'>Day 1</span>
      <span className='claim-block__claimed-text'>Total AirBonds claimed:</span>
      <span className='claim-block__claimed'>500</span>
    </div>
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
  </div>
);

CheckEligibility.propTypes = {
  handleEligibility: PropTypes.func,
};

export default CheckEligibility;
