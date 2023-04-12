import UiButton from '../UiButton';
import PropTypes from 'prop-types';

const CheckEligibility = ({ handleEligibility }) => (
  <>
    <h2 className='claim-block__title'>AirBonds Airdrop</h2>
    <p className='claim-block__text'>
      Users that have engaged with AirDAO are eligible for an AirBond airdrop.
    </p>
    <p className='claim-block__subtitle'>
      Click the Check Eligibility button to discover how many BOND tokens you
      can claim.
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
