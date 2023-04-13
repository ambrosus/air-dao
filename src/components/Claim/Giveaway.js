import calendar from '../../assets/calendar.svg';
import clock from '../../assets/clock.svg';

const Giveaway = () => (
  <div className='giveaway'>
    <h2 className='giveaway__title'>5 000 000 BOND Giveaway!</h2>
    <p className='giveaway__text'>
      Complete a new task every two days to win an airdrop. You must hold 1000
      AMB in your wallet to be eligible to participate.
    </p>
    <a href='/'>Read Announcement →</a>
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
