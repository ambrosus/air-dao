import UiButton from './UiButton';
import check from '../assets/check.svg';
import community from '../assets/community.svg';
import highlight from '../assets/highlight.png';
import amb from '../assets/amb-l1.svg';
import ambassador from '../assets/ambassador.svg';
import bridge from '../assets/bridge.svg';
import binance from '../assets/binance.svg';
import swap from '../assets/swap.png';
import firepot from '../assets/firepot.svg';
import Contact from './Contact';

const Content = () => {
  return (
    <div className="content">
      <section id="about" className="about-us">
        <h1 className="about-us__subtitle">
          The worlds first {' '}
          <br className="about-us__title-br"/>
          fully integrated L1
        </h1>
        <p className="about-us__text">
          Running on AMB's L1, the AirDAO Web App is an
          <br className="about-us__br" />
          ecosystem of handy dApps under a single browser tab
        </p>
        <UiButton withBorder className="about-us__btn">Read Litepaper</UiButton>
        <UiButton>Documentation  →</UiButton>
      </section>
      <section className="binance">
        <p className="binance__cex">CEX</p>
        <img src={binance} alt="binance" />
        <h3>Trade AMB <br/> coin on Binance</h3>
        <p className="binance__text">Buy and trade AMB with BUSD or BTC directly on Binance</p>
        <UiButton withBorder className="binance__btn">Trade on Binance</UiButton>
      </section>
      <section id="community" className="community community--swap">
        <img className="community__img" src={swap} alt="community"/>
        <div className="community__content community__content--swap">
          <img src={firepot} alt="firepot" className="firepot-logo"/>
          <h3 className="swap-title">FirepotSwap</h3>
          <p>Buy the AMB coin <br/> on a Decentralized Exchange</p>
          <UiButton withBorder className="swap-btn">
            <a href="/firepot/swap">Use FirepotSwap</a>
          </UiButton>
          <UiButton>Governance forum  →</UiButton>
        </div>
      </section>
      <section id="staking" className="earn">
        <h3>Earn AMB with staking program</h3>
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
            <span>Rewards are distributed <br/> every 6 hours</span>
          </span>
          <span className="earn__list-item">
            <img style={{ top: '14px' }} src={check} alt="check"/>
            <span>Unstake at any time</span>
          </span>
        </div>
        <UiButton withBorder className="about-us__btn">
          <a href="/staking">Start staking</a>
        </UiButton>
        <UiButton>Read article →</UiButton>
      </section>
      <section id="earn" className="validator">
        <div className="validator-left">
          <div>
            <p className="validator-left__big">150+</p>
            <p className="validator-left__small">
              Total amount {' '}
              <br className="validator-left__break"/>
              of Amber Nodes</p>
          </div>
          <div>
            <p className="validator-left__big">14,808</p>
            <p className="validator-left__small">Total amount <br/> of Amber Node Holders</p>
          </div>
        </div>
        <div className="validator-right">
          <h3>Became a validator to earn AMB</h3>
          <p>
            Are you thinking of becoming a validator? Here's a step-by-step process on how
            to easily stake your AMB tokens using our Arcadia Staking platform to start
            earning rewards of up to 35% APY
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
      <section id="bridge" className="content__semi-wrapper">
        <div className="bridge">
          <img src={bridge} alt="bridge"/>
          <h3>The AirDAO Bridge</h3>
          <p>
            Securely bridge your AMB coins between BNB Chain or Ethereum
            networks, or bring liquidity to the Ambrosus Network
          </p>
          <UiButton withBorder className="bridge__btn">
            <a href="/bridge">Use bridge</a>
          </UiButton>
        </div>
        <div className="ambassador">
          <img src={ambassador} alt="new"/>
          <h3>Ambassador Program</h3>
          <p>
            Do you believe in AirDAO? Join the community and help build the AirDAO ecosystem
          </p>
          <UiButton className="ambassador__btn">Learn more →</UiButton>
        </div>
      </section>
      <section id="network" className="ambrosus">
        <img className="ambrosus__highlight" src={highlight} alt="highlight"/>
        <div className="ambrosus-content">
          <img className="ambrosus-content__img" src={amb} alt="ambrosus"/>
          <div>
            <h3>Ambrosus L1</h3>
            <p>
              We are powered by the Ambrosus layer 1 blockchain that allows the AirDAO Web
              App's centralized dashboard to be designed for speed, security and affordability.
            </p>
            <UiButton withBorder className="ambrosus-content__btn">Ecosystem</UiButton>
            <UiButton>Governance forum  →</UiButton>
          </div>
        </div>
      </section>
      <div className="community-mobile">
        <h3>AirDAO community</h3>
        <p>
          We are a group of passionate individuals and builders across the globe
          who are committed to supporting you in your journey in the blockchain world.
          Whether you have questions about AirDAO, crypto, or DeFi, we're here to help.
          So join us, and let's build amazing things together
        </p>
      </div>
      <section id="community" className="community">
        <img className="community__img" src={community} alt="community"/>
        <div className="community__content community__content_low">
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
      <Contact/>
    </div>
  );
};

export default Content;
