import PropTypes from 'prop-types';

const ConnectWallet = ({ loginMetamask }) => (
  <>
    <h2 className='claim-block__title'>AirBonds Airdrop</h2>
    <p className='claim-block__text'>
      Connect your wallet to discover how many AirBonds you can claim in reward
      for your activity on AirDAO.
    </p>
    <p className='claim-block__subtitle'>
      AirBonds are vested AMB, rewarded to active community members.
    </p>
    <button
      type='button'
      onClick={loginMetamask}
      className='claim-block__connect'
    >
      Connect Wallet
    </button>
  </>
);

ConnectWallet.propTypes = {
  loginMetamask: PropTypes.func,
};

export default ConnectWallet;
