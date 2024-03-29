import UiButton from '../components/UiButton';
import check from '../assets/check.svg';
import whitePhone from '../assets/white-phone.png';
import highlight from '../assets/highlight.png';
import ambassador from '../assets/ambassador.svg';
import bridge from '../assets/bridge.svg';
import binance from '../assets/binance.svg';
import swap from '../assets/swap.png';
import firepot from '../assets/firepot.svg';
import roadmap from '../assets/roadmap.svg';
import appStore from '../assets/app-store.svg';
import googlePlay from '../assets/google-play.svg';
import logoSymbol from '../assets/logo-symbol.svg';
import { ReactComponent as LogoInverted } from '../assets/logo-inverted.svg';
import Contact from '../components/Contact';
import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { PrismicText } from '@prismicio/react';
import Slider from 'react-slick';
import { useMemo } from 'react';
import bg from '../assets/background.png';
import { Helmet } from 'react-helmet';

const groupArr = (data, n) => {
  const group = [];
  for (let i = 0, j = 0; i < data.length; i++) {
    if (i >= n && i % n === 0) {
      j++;
    }
    group[j] = group[j] || [];
    group[j].push(data[i]);
  }
  return group;
};
const settings = {
  dots: true,
  infinite: true,
};

const Content = () => {
  const data = usePrismicPageData('homepage');

  const groupedPartners = useMemo(() => {
    if (data) {
      return groupArr(data.partners_link, 6);
    } else return [];
  }, [data]);
  console.log(data);
  return (
    data && (
      <div className='container main-page'>
        <Helmet>
          <link rel='canonical' href='https://airdao.io' />
          <title>AirDAO | The World`s First Fully Integrated L1</title>
          <meta
            name='description'
            content='AirDAO is a revolutionary decentralized web app that houses an ecosystem of handy dApps under a single browser tab.'
          />
        </Helmet>
        <div className='content'>
          <img className='background' src={bg} alt='background' />
          <div className='white-overlay' />
          {data['promo-block-active'] && (
            <div className='we-are-hiring'>
              <p className='we-are-hiring__lead'>
                <PrismicText field={data['promo-block-text']} />
              </p>
              <UiButton>
                <a
                  className='we-are-hiring__button'
                  target='_blank'
                  rel='noreferrer'
                  href={data['promo-block-link'].url}
                >
                  <PrismicText field={data['promo-block-link-text']} />
                </a>
              </UiButton>
            </div>
          )}
          <div id='about' className='about-us'>
            <img
              src={logoSymbol}
              className={'about-us__logo-symbol'}
              alt={'logo-symbol'}
            />
            <h1 className='about-us__subtitle'>
              <PrismicText field={data.main_heading} />
            </h1>
            <p className='about-us__text'>
              <PrismicText field={data.main_lead_text} />
            </p>
            {data.links.map((item, i) => (
              <UiButton
                id={`about-${i}`}
                withBorder
                className='about-us__btn'
                key={`ui-button-${i}`}
              >
                <a href={item.link.url}>{item.link_name}</a>
              </UiButton>
            ))}
          </div>
          <section className='content__semi-wrapper binance-wrapper'>
            <div className='binance'>
              <p className='binance__cex'>CEX</p>
              <img src={binance} alt='binance' />
              <h3>
                <PrismicText field={data.binance_heading} />
              </h3>
              <p className='binance__text'>
                <PrismicText field={data.binance_lead_text} />
              </p>
              <UiButton
                id='binance-btn'
                withBorder
                className='binance__btn binance__btn-first'
              >
                <a
                  rel='nofollow'
                  href={data.binance_button_link.url}
                  target={data.binance_button_link.target}
                >
                  {data.binance_button_text}
                </a>
              </UiButton>
              <UiButton className='binance__btn binance__btn-second'>
                <a
                  href={data.binance_ref_link.url}
                  target={data.binance_ref_link.target}
                >
                  {data.binance_ref_text} →
                </a>
              </UiButton>
            </div>
            <div className='bridge'>
              <img src={bridge} alt='bridge' />
              <h3>
                <PrismicText field={data.bridge_heading} />
              </h3>
              <p>
                <PrismicText field={data.bridge_lead_text} />
              </p>
              <UiButton id='bridge-btn' withBorder className='bridge__btn'>
                <a href={data.bridge_button_link.url}>
                  {data.bridge_button_text}
                </a>
              </UiButton>
            </div>
          </section>
          <section className='mobile-app'>
            <img src={whitePhone} alt='mobile app' className='mobile-app__img' />
            <div className='mobile-app__info'>
              <h3 className='mobile-app__title'>
                <PrismicText field={data.mobile_app_title} />
              </h3>
              <p className='mobile-app__text'>
                <PrismicText field={data.mobile_app_text} />
              </p>
              <div className='mobile-app__btn-wrapper'>
                <a href={data.mobile_app_appstore.url} target='_blank' rel='noreferrer'>
                  <img src={appStore} alt='app store' />
                </a>
                <a href={data.mobile_app_google.url} target='_blank' rel='noreferrer'>
                  <img src={googlePlay} alt='google play' />
                </a>
              </div>
            </div>
          </section>
          <section id='firepot' className='firepot firepot--swap'>
            <img className='firepot__img' src={swap} alt='firepot' />
            <div className='firepot__content firepot__content--swap'>
              <span className='firepot__dex'>DEX</span>
              <img src={firepot} alt='firepot' className='firepot-logo' />
              <h3 className='firepot__title'>
                <PrismicText field={data.firepot_heading} />
              </h3>
              <p>
                <PrismicText field={data.firepot_lead_text} />
              </p>
              <UiButton withBorder className='firepot__btn'>
                <a href={data.dex_link_url.url}>
                  <PrismicText field={data.dex_link_text} />
                </a>
              </UiButton>
              <UiButton id='swap-btn' className='swap-btn'>
                <a href={data.firepot_button_link.url}>
                  {data.firepot_button_text}&nbsp;→
                </a>
              </UiButton>
            </div>
          </section>

          <section className='cex'>
            <h3 className='cex__title'>
              <PrismicText field={data.cex_heading} />
            </h3>
            <div className='cex__list'>
              {data.cex_links.map((link) => (
                <a
                  rel='nofollow'
                  key={link.cex_link_url.url}
                  href={link.cex_link_url.url}
                >
                  <PrismicText field={link.cex_link_text} />
                </a>
              ))}
            </div>
          </section>
          <section id='staking' className='earn'>
            <h3>
              <PrismicText field={data.stake_heading} />
            </h3>
            <p style={{ marginTop: 15 }}>
              <PrismicText field={data.stake_lead_text} />
            </p>
            <div className='earn__list'>
              {data.stake_checkmark_list.map((item, i) => (
                <span className='earn__list-item' key={`earn-list-item-${i}`}>
                  <img src={check} alt='check' />
                  <span>{item.checkmark_text}</span>
                </span>
              ))}
            </div>
            <UiButton id='start-earning' withBorder className='about-us__btn'>
              <a href={data.stake_button_link.url}>{data.stake_button_text}</a>
            </UiButton>
            <UiButton id='how-it-works'>
              <a
                rel='nofollow'
                href={data.stake_manual_link.url}
                target={data.stake_manual_link.target}
              >
                {data.stake_manual_text} →
              </a>
            </UiButton>
          </section>
          <section id='earn' className='validator'>
            <div className='validator-left'>
              <div>
                <p className='validator-left__big'>
                  {data.validator_holders_amount}
                </p>
                <p className='validator-left__small'>Total AMB Holders</p>
              </div>
              <div>
                <p className='validator-left__big'>{data.validators_amount}</p>
                <p className='validator-left__small'>Validators</p>
              </div>
            </div>
            <div className='validator-right'>
              <h3>
                <PrismicText field={data.validator_heading} />
              </h3>
              <p>
                <PrismicText field={data.validator_lead_text} />
              </p>
              <UiButton id='validator-btn' className='validator-right__btn'>
                <a
                  rel='nofollow'
                  href={data.validator_button_link.url}
                  target={data.validator_button_link.target}
                >
                  {data.validator_button_text} →
                </a>
              </UiButton>
            </div>
          </section>
          <section className='content__semi-wrapper'>
            <div className='timeline'>
              <img className='timeline__img' src={roadmap} alt='roadmap' />
              <h3 className='timeline__title-main'>
                <PrismicText field={data.roadmap_heading} />
              </h3>
              <p className='timeline__text'>
                <PrismicText field={data.roadmap_lead_text} />
              </p>
              <UiButton id='roadmap-btn' withBorder>
                <a
                  rel='nofollow'
                  href={data.roadmap_button_link.url}
                  target={data.roadmap_button_link.target}
                >
                  {data.roadmap_button_text}
                </a>
              </UiButton>
            </div>
            <div className='ambassador'>
              <img src={ambassador} alt='new' />
              <h3>
                <PrismicText field={data.ambassador_heading} />
              </h3>
              <p>
                <PrismicText field={data.ambassador_lead_text} />
              </p>
              <UiButton id='ambassador-btn' className='ambassador__btn'>
                <a
                  rel='nofollow'
                  href={data.ambassador_button_link.url}
                  target={data.ambassador_button_link.target}
                >
                  {data.ambassador_button_text} →
                </a>
              </UiButton>
            </div>
          </section>
          <section id='network' className='about-network'>
            <img
              className='about-network__highlight'
              src={highlight}
              alt='highlight'
            />
            <div className='about-network__content'>
              <LogoInverted />
              <div>
                <h3>
                  <PrismicText field={data.ambrosus_heading} />
                </h3>
                <p>
                  <PrismicText field={data.ambrosus_lead_text} />
                </p>
              </div>
            </div>
          </section>

          <section id='community' className='community'>
            <h3 className='community__heading'>
              <PrismicText field={data.community_heading} />
            </h3>
            <p className='community__lead'>
              <PrismicText field={data.community_lead_text} />
            </p>
            <div className='community__link-wrapper'>
              {data.community_links.map((item) => (
                <UiButton className='community__link' key={item.name}>
                  <a href={item.link.url} target={item.link.target}>
                    {item.name} →
                  </a>
                </UiButton>
              ))}
            </div>
          </section>

          <Contact
            heading={data.contact_heading}
            leadText={data.contact_lead_text}
          />
          <section className='partners'>
            <h3 className='partners-title'>
              <PrismicText field={data.partners_heading} />
            </h3>
            {window.innerWidth > 555 ? (
              <div className='partners-list'>
                {data.partners_link.map((el, i) => (
                  <a
                    rel={
                      el.partners_link_href.url.includes('airdao.io')
                        ? ''
                        : 'nofollow'
                    }
                    className='partners-list__item'
                    href={el.partners_link_href.url}
                    target={el.partners_link_href.target}
                    key={`partner-link-${i}`}
                  >
                    <img
                      src={el.partners_logo.url}
                      alt={el.partners_logo.alt}
                    />
                  </a>
                ))}
              </div>
            ) : (
              <Slider {...settings}>
                {groupedPartners.map((el, i) => (
                  <div
                    className='partners-mobile-list-item'
                    key={`partners-mobile-${i}`}
                  >
                    {el.map((item, j) => (
                      <a
                        rel={
                          item.partners_link_href.url.includes('airdao.io')
                            ? ''
                            : 'nofollow'
                        }
                        className='partners-list__item'
                        href={item.partners_link_href.url}
                        target={item.partners_link_href.target}
                        key={`mobile-partners-list-item-${j}`}
                      >
                        <img
                          src={item.partners_logo.url}
                          alt={item.partners_logo.alt}
                        />
                      </a>
                    ))}
                  </div>
                ))}
              </Slider>
            )}
          </section>
        </div>
      </div>
    )
  );
};

export default Content;
