import PropTypes from 'prop-types';
import UiButton from '../UiButton';

const NotToday = ({ nextClaimTimeRemaining }) => (
  <>
    <h2 className='claim-block__title'>Oh No!</h2>
    <p className='claim-block__text'>
      You&apos;re not eligible to claim AirBonds yet — new eligibility criteria
      will be announced in<br/>
      <b> {nextClaimTimeRemaining}</b>.
    </p>
    <p className='claim-block__subtitle'>
      Click the link below to learn more about our airdrop.
    </p>
    <UiButton className='claim-block__not-today'>
      <a
        href='https://blog.airdao.io/airdao-blockchain-fourth-anniversary-airdrop-f0388c837476?gi=5790fe133fd6'
        target='_blank'
        rel='noreferrer'
      >
        Learn more →
      </a>
    </UiButton>

  </>
);

NotToday.propTypes = {
  nextClaimTimeRemaining: PropTypes.string,
};

export default NotToday;
