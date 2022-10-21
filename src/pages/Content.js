import UiButton from '../components/UiButton';
import check from '../assets/check.svg';
import community from '../assets/community.svg';
import highlight from '../assets/highlight.png';
import amb from '../assets/amb-l1.svg';
import ambassador from '../assets/ambassador.svg';
import bridge from '../assets/bridge.svg';
import binance from '../assets/binance.svg';
import swap from '../assets/swap.png';
import firepot from '../assets/firepot.svg';
import roadmap from '../assets/roadmap.svg';
import logoSymbol from '../assets/logo-symbol.svg';
import Contact from '../components/Contact';
import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { PrismicText } from '@prismicio/react';
import Slider from 'react-slick';
import { useMemo } from 'react';
import bg from '../assets/background.png';

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

  return (
    data && (
      <div className='container main-page'>
        <div className='content'>
          <img className='background' src={bg} alt='background' />
          <div className='white-overlay' />
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
              <UiButton withBorder className='binance__btn binance__btn-first'>
                <a
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
              <UiButton withBorder className='bridge__btn'>
                <a href={data.bridge_button_link.url}>
                  {data.bridge_button_text}
                </a>
              </UiButton>
            </div>
          </section>
          <section id='community' className='community community--swap'>
            <img className='community__img' src={swap} alt='community' />
            <div className='community__content community__content--swap'>
              <span className='firepot-dex'>DEX</span>
              <img src={firepot} alt='firepot' className='firepot-logo' />
              <h3 className='swap-title'>
                <PrismicText field={data.firepot_heading} />
              </h3>
              <p>
                <PrismicText field={data.firepot_lead_text} />
              </p>
              <UiButton withBorder className='swap-btn'>
                <a href={data.firepot_button_link.url}>
                  {data.firepot_button_text}
                </a>
              </UiButton>
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
            <UiButton withBorder className='about-us__btn'>
              <a href={data.stake_button_link.url}>{data.stake_button_text}</a>
            </UiButton>
            <UiButton>
              <a
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
              <UiButton className='validator-right__btn'>
                <a
                  href={data.validator_button_link.url}
                  target={data.validator_button_link.target}
                >
                  {data.validator_button_text} →
                </a>
              </UiButton>
            </div>
          </section>
          <section id='bridge' className='content__semi-wrapper ambrosus'>
            <div className='timeline'>
              <img className='timeline__img' src={roadmap} alt='roadmap' />
              <h3 className='timeline__title-main'>
                <PrismicText field={data.roadmap_heading} />
              </h3>
              <p className='timeline__text'>
                <PrismicText field={data.roadmap_lead_text} />
              </p>
              <UiButton withBorder>
                <a
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
              <UiButton className='ambassador__btn'>
                <a
                  href={data.ambassador_button_link.url}
                  target={data.ambassador_button_link.target}
                >
                  {data.ambassador_button_text} →
                </a>
              </UiButton>
            </div>
          </section>
          <section id='network' className='ambrosus'>
            <img
              className='ambrosus__highlight'
              src={highlight}
              alt='highlight'
            />
            <div className='ambrosus-content'>
              <img className='ambrosus-content__img' src={amb} alt='ambrosus' />
              <div>
                <h3>
                  <PrismicText field={data.ambrosus_heading} />
                </h3>
                <p>
                  <PrismicText field={data.ambrosus_lead_text} />
                </p>
                <UiButton withBorder className='ambrosus-content__btn'>
                  <a
                    href={data.ambrosus_button_link.url}
                    target={data.ambrosus_button_link.target}
                  >
                    {data.ambrosus_button_text}
                  </a>
                </UiButton>
              </div>
            </div>
          </section>
          <div className='community-mobile'>
            <h3>
              <PrismicText field={data.community_heading} />
            </h3>
            <p>
              <PrismicText field={data.community_lead_text} />
            </p>
          </div>
          <section id='community' className='community'>
            <img className='community__img' src={community} alt='community' />
            <div className='community__content community__content_low'>
              <h3>
                <PrismicText field={data.community_heading} />
              </h3>
              <p>
                <PrismicText field={data.community_lead_text} />
              </p>
              <div className='community__link-wrapper'>
                {data.community_links.map((item) => (
                  <a
                    href={item.link.url}
                    target={item.link.target}
                    className='community__link'
                    key={item.name}
                  >
                    {item.name} →
                  </a>
                ))}
              </div>
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
