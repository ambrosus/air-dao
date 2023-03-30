import PropTypes from 'prop-types';

const ConnectWallet = ({ loginMetamask }) => (
  <div className='claim-block'>
    <div className='claim-block__heading'>
      <span className='claim-block__day'>Day 1</span>
    </div>
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
  </div>
);

ConnectWallet.propTypes = {
  loginMetamask: PropTypes.func,
};

export default ConnectWallet;
