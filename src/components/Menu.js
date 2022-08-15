import logo from '../assets/logo.svg';
import UiButton from './UiButton';
import twitter from '../assets/twitter.svg';
import telegram from '../assets/telegram.svg';
import reddit from '../assets/reddit.svg';
import circles from '../assets/circles.svg';
import link from '../assets/link.svg';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';
import {useEffect, useState} from 'react';

const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsOpen(window.innerWidth > 480);
    };
    window.addEventListener('resize', handleResize, true);
  });

  const handleOpen = () => setIsOpen((state) => !state);

  return (
    <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
      <div className="side-menu__mobile-wrapper">
        <img className="side-menu__logo" src={logo} alt="logo"/>
        <UiButton
          withBorder={isMobile}
          className={isMobile ? 'side-menu__connect-mobile' : 'side-menu__connect-wallet'}>
          Connect wallet
        </UiButton>
        {isMobile && (
          <UiButton onClick={handleOpen} className="side-menu__hamburger">
            <img src={isOpen ? close : menu} alt="menu"/>
          </UiButton>
        )}
      </div>
      {isOpen && (
        <div className="side-menu__content">
          <span className="side-menu__title">Products</span>
          <ul className="side-menu__list">
            <li className="side-menu__blue"><b>Firepot</b> Swap</li>
            <li><b>Firepot</b> Pool</li>
            <li>
              <a className="side-menu__list-link" href="/">
                Stake
                <img src={link} alt="link"/>
              </a>
            </li>
            <li>
              <a className="side-menu__list-link" href="/">
                Bridge
                <img src={link} alt="link"/>
              </a>
            </li>
            <li>
              <a className="side-menu__list-link" href="/">
                AMB Network Explorer
                <img src={link} alt="link"/>
              </a>
            </li>
            <li className="side-menu__list-vote">
              <span>Vote</span>
              <span>Coming Soon</span>
            </li>
          </ul>
          <span className="side-menu__title">Explore</span>
          <ul className="side-menu__list side-menu__list_small">
            <li >AirDAO main</li>
            <li>Docs</li>
            <li>Feedback</li>
            <li>Brand Materials</li>
          </ul>
          <ul className="side-menu__list side-menu__list_socials">
            <li>
              <a href="/">
                <img src={twitter} alt="twitter"/>
              </a>
            </li>
            <li>
              <a href="/">
                <img src={telegram} alt="telegram"/>
              </a>
            </li>
            <li>
              <a href="/">
                <img src={reddit} alt="reddit"/>
              </a>
            </li>
            <li>
              <a href="/">
                <img src={circles} alt="circles"/>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
