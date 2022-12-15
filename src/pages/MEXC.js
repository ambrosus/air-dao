import { ReactComponent as MexcLogo } from '../assets/mexc.svg';
import MexcBackground from '../assets/mexc-background.png';
import UiButton from '../components/UiButton';
import { Helmet } from 'react-helmet';

const MEXC = () => (
  <section className='mexc-page'>
    <Helmet>
      <link rel="canonical" href="https://airdao.io/mexc/" />
    </Helmet>
    <div className='container'>
      <div className='content'>
        <h1 className='mexc-page__heading'>MEXC Global & AirDAO</h1>
        <p className='mexc-page__lead'>
          Discover AirDAO on MEXC global — with a USDT pair, Airdrops, and more!
        </p>
        <div className='mexc-page__card-wrapper'>
          <img
            src={MexcBackground}
            alt='background'
            className='mexc-page__background'
          />
          <div className='mexc-page__card'>
            <span className='mexc-page__note'>CEX</span>
            <MexcLogo className='mexc-page__logo' />
            <h2 className='mexc-page__card-heading'>
              Buy AMB on <br />
              MEXC
            </h2>
            <p className='mexc-page__card-lead'>
              Trade AMB on MEXC, Asia’s biggest <br />
              crypto exchange
            </p>
            <a href='https://www.mexc.com/exchange/AMB_USDT'>
              <UiButton withBorder className='mexc-page__button'>
                Buy AMB
              </UiButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MEXC;
