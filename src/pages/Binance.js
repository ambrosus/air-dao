import redPocket from '../assets/red-pocket.svg';
import bg from '../assets/binance-bg.svg';
import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { PrismicText } from '@prismicio/react';
import { Helmet } from 'react-helmet';

const Binance = () => {
  const data = usePrismicPageData('binance');

  return data && (
    <div className="binance-page">
      <Helmet>
        <link rel="canonical" href="https://airdao.io/binance/" />
        <title>Binance & AirDAO Promotion</title>
        <meta
          name='description'
          content='Join the special promotions from AirDAO and Binance. From AMB tokens for new Binance customers to referral programs to an exclusive staking program'
        />
      </Helmet>
      <img src={bg} alt="bg" className="binance-page__bg"/>
      <div className="container">
        <div className="content content-binance">
          <h3 className="binance-title">
            <PrismicText field={data['page-title']} />
          </h3>
          <p className="binance-subtitle">
            <PrismicText field={data['page-subtitle']} />
          </p>
          <div className="red-packet">
            <img src={redPocket} alt="red packet" />
            <h3 className="red-packet__title">
              <PrismicText field={data['packet-title']} />
            </h3>
            <p className="red-packet__text">
              <PrismicText field={data['packet-text']} />
            </p>
            <a rel="nofollow" href={data['packet-link'].url}>
              <PrismicText field={data['packet-link-label']} />
            </a>
          </div>
          <div className="content__semi-wrapper">
            <div className="binance-staking">
              <p className="binance-staking__ends">
                <PrismicText field={data['staking-ends']} />
              </p>
              <p className="binance-staking__apy">
                <PrismicText field={data['staking-apr']} />
              </p>
              <p className="binance-staking__text">
                <PrismicText field={data['staking-text']} />
              </p>
              <a href={data['staking-link'].url} className="binance-staking__link">
                <PrismicText field={data['staking-link-label']} />
              </a>
            </div>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="binance-referral flip-card-front">
                  <h3 className="binance-referral__title">
                    <PrismicText field={data['referral-title']} />
                  </h3>
                  <p className="binance-referral__text">
                    <PrismicText field={data['referral-text']} />
                  </p>
                  <a rel="nofollow" href={data['referral-link'].url}>
                    <PrismicText field={data['referral-link-label']} />
                  </a>
                </div>
                <div className="flip-card-back binance-earn">
                  <h3 className="binance-referral__title binance-referral__title__mobile">
                    <PrismicText field={data['referral-title']} />
                  </h3>
                  <p className="binance-earn__title">
                    Earn up to $1200 in AMB tokens with the Binance referral program!
                  </p>
                  <p className="binance-earn__text">
                    Join the Binance Lite Referral Program to receive 100 USDT
                    cashback vouchers and earn up to $1200 in AMB gift cards!
                  </p>
                  <a rel="nofollow" href={data['referral-link'].url} className="binance-earn__link">
                    <PrismicText field={data['referral-link-label']} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Binance;
