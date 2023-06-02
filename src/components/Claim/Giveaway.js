import calendar from '../../assets/calendar.svg';
import clock from '../../assets/clock.svg';
import UiButton from '../UiButton';

const Giveaway = () => (
  <div className='giveaway'>
    <h2 className='giveaway__title'>5 000 000 BOND Giveaway!</h2>
    <p className='giveaway__text'>
      We airdropped the AirBond Marketplace’s token to celebrate our
      blockchain’s 4th anniversary.
    </p>
    <UiButton withBorder className='giveaway__btn'>
      <a href='/bond-marketplace/'>Go to Marketplace</a>
    </UiButton>
    <a
      href='https://blog.airdao.io/airdao-blockchain-fourth-anniversary-airdrop-wrap-up-47b2b89c4331'
      target='_blank'
      rel='noreferrer'
    >
      Read Blogpost →
    </a>
    <div className='giveaway__dates'>
      <div className='giveaway__dates-item'>
        <div className='giveaway__info'>Start</div>
        <div className='giveaway__date'>
          <p className='giveaway__date-text'>
            <img src={calendar} alt='calendar' />
            Sunday, April 16th
          </p>
          <p className='giveaway__date-text'>
            <img src={clock} alt='calendar' />
            12 PM UTC
          </p>
        </div>
      </div>
      <div className='giveaway__dates-item'>
        <div className='giveaway__info'>End</div>
        <div className='giveaway__date'>
          <p className='giveaway__date-text'>
            <img src={calendar} alt='calendar' />
            Wednesday, April 26th
          </p>
          <p className='giveaway__date-text'>
            <img src={clock} alt='calendar' />
            12 PM UTC
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Giveaway;
