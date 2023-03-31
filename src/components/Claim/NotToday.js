import PropTypes from 'prop-types';

const NotToday = ({ nextClaimTimeRemaining }) => (
  <>
    <h2 className='claim-block__title'>Not today</h2>
    <p className='claim-block__text'>
      You don’t have eligibility to claim AirBonds. Don’t forget to check
      another day. New claiming rules will be announced in
      <b> {nextClaimTimeRemaining}</b>.
    </p>
    <p className='claim-block__subtitle'>
      AirBonds are vested AMB, rewarded to active community members.
    </p>
  </>
);

NotToday.propTypes = {
  nextClaimTimeRemaining: PropTypes.string,
};

export default NotToday;
