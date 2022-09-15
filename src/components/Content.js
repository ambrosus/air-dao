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
import roadmap from '../assets/roadmap.svg';
import logoSymbol from '../assets/logo-symbol.svg';
import Contact from './Contact';

const Content = () => {
  return (
    <div className="content">
      <div id="about" className="about-us">
        <img src={logoSymbol} className={"about-us__logo-symbol"} alt={'logo-symbol'}/>
        <h1 className="about-us__subtitle">
          The World’s First Fully-Integrated Blockchain Experience
        </h1>
        <p className="about-us__text">
          Powered by the Ambrosus Network blockchain and its AMB token, AirDAO is an
          ecosystem of innovative, user-friendly dApps accessible through a single dashboard.
        </p>
        <UiButton withBorder className="about-us__btn">
          <a href="/firepot/swap">Trade AMB on Firepot</a>
        </UiButton>
        <UiButton withBorder>
          <a href="/bridge">
            AMB Bridge
          </a>
        </UiButton>
      </div>
      <section className="content__semi-wrapper binance-wrapper">
        <div className="binance">
          <p className="binance__cex">CEX</p>
          <img src={binance} alt="binance" />
          <h3>Buy AMB on Binance</h3>
          <p className="binance__text">Trade AMB on Binance, the world’s largest cryptocurrency exchange.</p>
          <UiButton withBorder className="binance__btn binance__btn-first">
            <a href="https://www.binance.com/en/trade/AMB_BUSD" target="_blank">
              Buy AMB
            </a>
          </UiButton>
          <UiButton className="binance__btn binance__btn-second">
            <a href="https://accounts.binance.com/en/register?ref=428083495" target="_blank">
              Create Binance Account →
            </a>
          </UiButton>
        </div>
        <div className="bridge">
          <img src={bridge} alt="bridge"/>
          <h3>Bridge AMB</h3>
          <p>
            Securely bridge AMB between AirDAO and compatible blockchains.
          </p>
          <UiButton withBorder className="bridge__btn">
            <a href="/bridge">
              AMB Bridge
            </a>
          </UiButton>
        </div>
      </section>
      <section id="community" className="community community--swap">
        <img className="community__img" src={swap} alt="community"/>
        <div className="community__content community__content--swap">
          <span className="firepot-dex">DEX</span>
          <img src={firepot} alt="firepot" className="firepot-logo"/>
          <h3 className="swap-title">FirepotSwap</h3>
          <p>
            Buy and trade AMB and other crypto with FirepotSwap,
            AirDAO’s native decentralized exchange.
          </p>
          <UiButton withBorder className="swap-btn">
            <a href="/firepot/swap">Use FirepotSwap</a>
          </UiButton>
        </div>
      </section>
      <section id="staking" className="earn">
        <h3>Stake AMB</h3>
        <p style={{ marginTop: 15 }}>
          Start earning AMB rewards in seconds using the AirDAO Staking platform.
        </p>
        <div className="earn__list">
          <span className="earn__list-item">
            <img src={check} alt="check"/>
            <span>Starting at 1000 AMB</span>
          </span>
          <span className="earn__list-item">
            <img src={check} alt="check"/>
            <span>No technical expertise needed</span>
          </span>
          <span className="earn__list-item">
            <img src={check} alt="check"/>
            <span>Receive rewards <br/> every 6 hours</span>
          </span>
          <span className="earn__list-item">
            <img style={{ top: '14px' }} src={check} alt="check"/>
            <span>Unstake at any time</span>
          </span>
        </div>
        <UiButton withBorder className="about-us__btn">
          <a href="/staking">Start Earning</a>
        </UiButton>
        <UiButton>
          <a href="https://blog.ambrosus.io/ambrosus-arcadia-a-complete-guide-to-ambrosus-ecosystems-simple-staking-service-53e9ad6c107d" target="_blank">
            How it works →
          </a>
        </UiButton>
      </section>
      <section id="earn" className="validator">
        <div className="validator-left">
          <div>
            <p className="validator-left__big">15,000+</p>
            <p className="validator-left__small">Total AMB Holders</p>
          </div>
          <div>
            <p className="validator-left__big">120+</p>
            <p className="validator-left__small">
              Validators
            </p>
          </div>
        </div>
        <div className="validator-right">
          <h3>Become a Validator</h3>
          <p>
            Earn AMB and help power the AirDAO ecosystem by setting up and operating an Ambrosus Network validator node.
          </p>
          <UiButton withBorder className="validator-right__btn">
            <a href="https://github.com/ambrosus/ambrosus-nop" target="_blank">
              Setup Node
            </a>
          </UiButton>
        </div>
      </section>
      <section id="bridge" className="content__semi-wrapper ambrosus">
        <div className="timeline">
          <img className="timeline__img" src={roadmap} alt="roadmap"/>
          <h3 className="timeline__title-main">Roadmap</h3>
          <p className="timeline__text">Discover future developments <br/> and user-friendly DeFi products.</p>
          <UiButton withBorder>
            <a href="https://air-dao.notion.site/Roadmap-ded5934b02244bdca65af75ce82fe0aa" target="_blank">
              Read →
            </a>
          </UiButton>
        </div>
        <div className="ambassador">
          <img src={ambassador} alt="new"/>
          <h3>Ambassador Program</h3>
          <p>
            Do you believe in AirDAO?<br/>Join the community and help <br/> build the ecosystem.
          </p>
          <UiButton className="ambassador__btn">
            <a href="https://air-dao.notion.site/Ambassador-Program-168a4cff7d46414a95887a219c6469cc">
              Learn more →
            </a>
          </UiButton>
        </div>
      </section>
      <section id="network" className="ambrosus">
        <img className="ambrosus__highlight" src={highlight} alt="highlight"/>
        <div className="ambrosus-content">
          <img className="ambrosus-content__img" src={amb} alt="ambrosus"/>
          <div>
            <h3>Ambrosus Network</h3>
            <p>
              AirDAO is powered by the Ambrosus Network, an ultra-secure and
              lightning-fast Layer-1 blockchain with minimal transactions costs.
            </p>
            <UiButton withBorder className="ambrosus-content__btn">
              <a href="https://ambrosus.io/" target="_blank">AMB Technology</a>
            </UiButton>
          </div>
        </div>
      </section>
      <div className="community-mobile">
        <h3>Community</h3>
        <p>
          The AirDAO community is the foundation of supporters, contributors
          and developers supporting the ecosystem. Join the discussion, follow
          us on social media, and become a part of the AirDAO community today.
        </p>
      </div>
      <section id="community" className="community">
        <img className="community__img" src={community} alt="community"/>
        <div className="community__content community__content_low">
          <h3>Community</h3>
          <p>
            The AirDAO community is the foundation of supporters, contributors
            and developers supporting the ecosystem. Join the discussion, follow
            us on social media, and become a part of the AirDAO community today.
          </p>
          <a className="community__link" href="https://twitter.com/airdao_io" target="_blank">
            Twitter →
          </a>
          <a className="community__link" href="https://t.me/airDAO_official" target="_blank">
            Telegram →
          </a>
          <a className="community__link" href="https://blog.airdao.io" target="_blank">
            Medium →
          </a>
          <a className="community__link" href="https://www.reddit.com/r/AirDAO/" target="_blank">
            Reddit →
          </a>
          <a className="community__link" href="https://discussions.airdao.io/" target="_blank">
            Discussion →
          </a>
        </div>
      </section>
      <Contact/>
    </div>
  );
};

export default Content;
