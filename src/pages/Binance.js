import redPocket from '../assets/red-pocket.svg';
import bg from '../assets/binance-bg.svg';
import {usePrismicPageData} from '../hooks/usePrismicPageData';
import { PrismicText } from '@prismicio/react';

const Binance = () => {
  const data = usePrismicPageData('binance');

  return data && (
    <div className="binance-page">
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
            <a href={data['packet-link'].url}>
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
            <div className="binance-referral">
              <h3 className="binance-referral__title">
                <PrismicText field={data['referral-title']} />
              </h3>
              <p className="binance-referral__text">
                <PrismicText field={data['referral-text']} />
              </p>
              <a href={data['referral-link'].url}>
                <PrismicText field={data['referral-link-label']} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Binance;
