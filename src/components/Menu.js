import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Twitter } from '../assets/twitter.svg';
import { ReactComponent as Telegram } from '../assets/telegram.svg';
import { ReactComponent as Reddit } from '../assets/reddit.svg';
import { ReactComponent as Circles } from '../assets/circles.svg';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';
import { ReactComponent as Metamask } from '../assets/metamask.svg';
import { ReactComponent as Copy } from '../assets/copy.svg';
import { ReactComponent as Logout } from '../assets/logout.svg';
import house from '../assets/house.svg';
import docs from '../assets/docs.svg';
import message from '../assets/message-plus.svg';
import book from '../assets/book.svg';
import useAuthorization from "../hooks/useAuthorization";
import {useWeb3React} from "@web3-react/core";

// eslint-disable-next-line react/prop-types
const AddressBlock = ({ address = '' }) => {
  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(address);
    }
    return null;
  };
  const { logout } = useAuthorization();

  return (
      <div className="address-block">
        <div className="address-block__metamask-icon">
          <Metamask />
        </div>
        <span>{`${address.slice(0, 4)}...${address.slice(
            address.length - 4,
            address.length,
        )}`}</span>
        <button onClick={logout} type="button" style={{ marginLeft: 'auto' }}>
          <Logout />
        </button>
        <button
            onClick={copyToClipboard}
            type="button"
            className="address-block__copy"
        >
          <Copy />
        </button>
      </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1050);
  const { loginMetamask } = useAuthorization();
  const { account: address } = useWeb3React();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1050);
    };
    window.addEventListener('resize', handleResize, true);
  }, []);

  const handleOpen = () => setIsOpen((state) => !state);

  return (
      <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
        <div className="side-menu__mobile-wrapper">
          <div className="side-menu__logo">
            <Logo />
          </div>
          <button
              type="button"
              onClick={handleOpen}
              className="side-menu__hamburger"
          >
            <img src={isOpen ? close : menu} alt="menu" />
          </button>
        </div>
        {isOpen && (
            <>
              <div className="side-menu__content">
                {address ? (
                    <AddressBlock address={address} />
                ) : (
                    <button
                        type="button"
                        className="side-menu__connect-wallet"
                        onClick={loginMetamask}
                    >
                      Connect wallet
                    </button>
                )}
                <ul className="side-menu__list">
                  <li>
                    <a href="/firepot/swap">Firepot Swap</a>
                  </li>
                  <li>
                    <a href="/firepot/pool">Firepot Pool</a>
                  </li>
                  <li>
                    <a className="side-menu__list-link" href="/staking">
                      Stake
                    </a>
                  </li>
                  <li>
                    <a className="side-menu__list-link" href="/bridge">
                      Bridge
                    </a>
                  </li>
                  <li>
                    <a
                        className="side-menu__list-link"
                        href="https://explorer-beta.ambrosus.io/"
                    >
                      AMB Network Explorer
                    </a>
                  </li>
                  <li className="side-menu__list-vote">
                    <span>DAO Tools</span>
                    <span>Coming Soon</span>
                  </li>
                </ul>
                <ul className="side-menu__list side-menu__list_small">
                  <li>
                    <img src={house} alt="main" />
                    <a href="/">AIRDAO Main</a>
                  </li>
                  <li>
                    <img src={docs} alt="docs" />
                    <a href="/">Docs</a>
                  </li>
                  <li>
                    <img src={message} alt="message" />
                    <a href="/">Feedback</a>
                  </li>
                  <li>
                    <img src={book} alt="book" />
                    <a href="/">Brand materials</a>
                  </li>
                </ul>
                <ul className="side-menu__list side-menu__list_socials">
                  <li>
                    <a href="/">
                      <Twitter />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <Telegram />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <Reddit />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <Circles />
                    </a>
                  </li>
                </ul>
              </div>
            </>
        )}
      </div>
  );
};

export default Header;
