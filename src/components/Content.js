import UiButton from './UiButton';
import firepot from '../assets/firepot.svg';
import check from '../assets/check.svg';
import community from '../assets/community.svg';
import highlight from '../assets/highlight.png';
import amb from '../assets/amb-l1.svg';
import ambassador from '../assets/ambassador.svg';
import bridge from '../assets/bridge.svg';
import Contact from './Contact';

const Content = () => {
  return (
    <div className="content">
      <section id="about" className="about-us">
        <h3>About us</h3>
        <h4 className="about-us__subtitle">
          We make crypto painless.
        </h4>
        <p className="about-us__text">
          AirDAO's integrated approach makes it easy for you to get everything you need from a single source.
        </p>
        <UiButton withBorder className="about-us__btn">Read light paper</UiButton>
        <UiButton>Documentation  →</UiButton>
      </section>
      <section id="get-amb" className="content__semi-wrapper">
        <div className="trade">
          <span className="exchange-label">CEX</span>
          <h3>Trade AMB coin on a Centralized Exchange</h3>
          <a className="trade__link" href="">Binance →</a>
          <a className="trade__link" href="">KuCoin →</a>
          <a className="trade__link" href="">WhiteBIT →</a>
          <a className="trade__link" href="">ProBit →</a>
        </div>
        <div className="firepot">
          <span className="exchange-label">DEX</span>
          <img className="firepot__logo" src={firepot} alt="firepot"/>
          <h3>FirepotSwap</h3>
          <p>Buy the AMB coin  on a Decentralized Exchange</p>
          <a href="" className="firepot__link">Read more  →</a>
        </div>
      </section>
      <section id="staking" className="earn">
        <h3>Earn AMB with staking program</h3>
        <p style={{ marginTop: 15 }}>
          Join us in securing the Ambrosus network by staking your AMB
          tokens and earn rewards every 6 hours. Get started today and
          become a vital part of the AirDAO ecosystem
        </p>
        <div className="earn__list">
          <span className="earn__list-item">
            <img src={check} alt="check"/>
            <span>Starts from 1000 AMB</span>
          </span>
          <span className="earn__list-item">
            <img src={check} alt="check"/>
            <span>No node manual set up</span>
          </span>
          <span className="earn__list-item">
            <img src={check} alt="check"/>
            <span>Rewards are distributed every 6 hours</span>
          </span>
          <span className="earn__list-item">
            <img style={{ top: '14px' }} src={check} alt="check"/>
            <span>Unstake at any time</span>
          </span>
        </div>
        <UiButton withBorder className="about-us__btn">Start staking</UiButton>
        <UiButton>Read article →</UiButton>
      </section>
      <div className="community-mobile">
        <h3>AirDAO community</h3>
        <p>
          AirDAO's rapidly expanding ecosystem is full of exciting opportunities
          to learn and grow. We look forward to seeing you in the AirDAO community.
        </p>
      </div>
      <section id="community" className="community">
        <img className="community__img" src={community} alt="community"/>
        <div className="community__content">
          <h3>AirDAO community</h3>
          <p>
            AirDAO's rapidly expanding ecosystem is full of exciting opportunities
            to learn and grow. We look forward to seeing you in the AirDAO community.
          </p>
          <a className="community__link" href="">Twitter →</a>
          <a className="community__link" href="">Telegram →</a>
          <a className="community__link" href="">Medium →</a>
          <a className="community__link" href="">Reddit →</a>
        </div>
      </section>
      <section id="network" className="ambrosus">
        <img className="ambrosus__highlight" src={highlight} alt="highlight"/>
        <div className="ambrosus-content">
          <img className="ambrosus-content__img" src={amb} alt="ambrosus"/>
          <div>
            <h3>Ambrosus L1</h3>
            <p>
              AirDAO is a community-driven organization that is building a decentralized
              system for social and financial interactions on its layer one blockchain,
              the Ambrosus Network.
            </p>
            <UiButton withBorder className="ambrosus-content__btn">Ecosystem</UiButton>
            <UiButton>Governance forum  →</UiButton>
          </div>
        </div>
      </section>
      <section id="bridge" className="content__semi-wrapper">
        <div className="bridge">
          <img src={bridge} alt="bridge"/>
          <h3>The AirDAO Bridge</h3>
          <p>
            Securely bridge your AMB coins between BNB Chain or Ethereum networks,
            or bring liquidity to the Ambrosus Network
          </p>
          <UiButton withBorder className="bridge__btn">Use bridge</UiButton>
        </div>
        <div className="ambassador">
          <img src={ambassador} alt="new"/>
          <h3>Ambassador Program</h3>
          <p>
            Do you believe in the AirDAO ecosystem? We are looking for devoted
            community members who can help us promote AirDAO in their own unique ways
          </p>
          <UiButton className="ambassador__btn">Learn more →</UiButton>
        </div>
      </section>
      <Contact/>
      <section id="earn" className="validator">
        <div className="validator-left">
          <div>
            <p className="validator-left__big">150+</p>
            <p className="validator-left__small">Total amount of Amber Nodes</p>
          </div>
          <div>
            <p className="validator-left__big">14,808</p>
            <p className="validator-left__small">Total amount of Amber Node Holders</p>
          </div>
        </div>
        <div className="validator-right">
          <h3>Became a validator to earn AMB</h3>
          <p>
            Are you thinking of becoming a validator? Here's a step-by-step process on how to easily
            stake your AMB tokens using our Arcadia Staking platform to start earning rewards of up to 35% APY.
          </p>
          <UiButton withBorder className="validator-right__btn">
            Setup node
          </UiButton>
          <a
            style={{fontSize: 14}}
            target="_blank"
            href="https://blog.ambrosus.io/ambrosus-arcadia-a-complete-guide-to-ambrosus-ecosystems-simple-staking-service-53e9ad6c107d"
          >
            Documentation  →
          </a>
        </div>
      </section>
    </div>
  );
};

export default Content;
