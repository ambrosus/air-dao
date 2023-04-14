import UiButton from '../UiButton';
import telegram from '../../assets/telegram-grey.svg';
import twitter from '../../assets/twitter-grey.svg';
import discord from '../../assets/discord-grey.svg';
import reddit from '../../assets/reddit-grey.svg';
import medium from '../../assets/medium-grey.svg';

const socials = [
  { icon: twitter, url: 'https://twitter.com/airdao_io' },
  { icon: telegram, url: 'https://t.me/airDAO_official' },
  { icon: discord, url: 'https://discord.gg/hnftmSjUr8' },
  { icon: reddit, url: 'https://www.reddit.com/r/AirDAO/' },
  { icon: medium, url: 'https://blog.airdao.io/' },
];

const BondsEnds = () => (
  <>
    <h2 className='claim-block__title'>All AirBonds have been claimed!</h2>
    <p className='claim-block__text'>
      The community has claimed all 5,000,000 BOND tokens.
    </p>
    <p className='claim-block__subtitle'>
      Share the AirBond Marketplace waitlist using Gleam for a chance to win
      from our prize pool of 44,444 AMB!
    </p>
    <ul className='claim-block__socials'>
      {socials.map((el) => (
        <li key={el.url} className='claim-block__socials-item'>
          <a href={el.url}>
            <img src={el.icon} alt='social' />
          </a>
        </li>
      ))}
    </ul>
    <UiButton
      withBorder
      className='claim-block__btn claim-block__btn_marketplace'
    >
      <a href='/'>Enter Gleam Competition</a>
    </UiButton>
  </>
);

export default BondsEnds;
