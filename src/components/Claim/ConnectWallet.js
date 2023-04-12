import PropTypes from 'prop-types';

const ConnectWallet = ({ loginMetamask }) => (
  <>
    <h2 className='claim-block__title'>AirBonds Airdrop</h2>
    <p className='claim-block__text'>
      Connect your wallet and discover how many AirBonds you can claim for
      participating in our ecosystem.
    </p>
    <p className='claim-block__subtitle'>
      AirBonds are BOND tokens — AMB that is vested and tradable on our AirBond
      Marketplace.
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
