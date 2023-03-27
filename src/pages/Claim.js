import question from '../assets/question.svg';

const Claim = () => {
  return (
    <div className='claim-page'>
      <div className='container'>
        <div className='claim-wrapper content'>
          <div className='claim-block'>
            <span className='claim-block__day'>Day 1</span>
            <h2 className='claim-block__title'>AirBonds Airdrop</h2>
            <p className='claim-block__text'>
              Connect your wallet to discover how many AirBonds you can claim in
              reward for your activity on AirDAO.
            </p>
            <p className='claim-block__subtitle'>
              AirBonds are vested AMB, rewarded to active community members.
            </p>
            <button type='button' className='claim-block__connect'>
              Connect Wallet
            </button>
          </div>
          <ul className='claim-steps'>
            <li className='claim-steps__item'>
              <img src={question} alt='question mark' />
              Use Staking
            </li>
            <li className='claim-steps__item'>
              <img src={question} alt='question mark' />
              Bridged to AMB Network
            </li>
            <li className='claim-steps__item'>
              <img src={question} alt='question mark' />
              Use Staking
            </li>
            <li className='claim-steps__item'>
              <img src={question} alt='question mark' />
              Made Transactions
            </li>
            <li className='claim-steps__item'>
              <img src={question} alt='question mark' />
              Will be open in: 24h 20min
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Claim;
