import PropTypes from 'prop-types';

const NotToday = ({ nextClaimTimeRemaining }) => (
  <>
    <h2 className='claim-block__title'>Oh No!</h2>
    <p className='claim-block__text'>
      You&apos;re not eligible to claim AirBonds yet — new eligibility criteria
      will be announced in
      <b> {nextClaimTimeRemaining}</b>.
    </p>
    <p className='claim-block__subtitle'>
      Click the link below to learn more about our airdrop.
    </p>
    <a href='/'>Learn more →</a>
  </>
);

NotToday.propTypes = {
  nextClaimTimeRemaining: PropTypes.string,
};

export default NotToday;
