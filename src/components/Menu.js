import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { ReactComponent as Twitter } from '../assets/twitter.svg';
import { ReactComponent as Telegram } from '../assets/telegram.svg';
import { ReactComponent as Reddit } from '../assets/reddit.svg';
import { ReactComponent as Circles } from '../assets/circles.svg';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';
import metamask from '../assets/metamask.svg';
import copy from '../assets/copy.svg';
import logout from '../assets/logout.svg';
import house from '../assets/house.svg';
import docs from '../assets/docs.svg';
import message from '../assets/message-plus.svg';
import book from '../assets/book.svg';
import question from '../assets/circle-question-mark.svg';
import { utils } from 'ethers';

const ambMainNetChainId = 22040;

const changeChainId = async () => {
  const chainId = utils.hexValue(ambMainNetChainId);

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (switchError) {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId,
          chainName: 'Ambrosus',
          nativeCurrency: {
            name: 'Amber',
            symbol: 'AMB',
            decimals: 18,
          },
          rpcUrls: ['https://network.ambrosus.io/'],
          blockExplorerUrls: ['https://explorer.ambrosus.io/'],
        },
      ],
    });
  }
};

// eslint-disable-next-line react/prop-types
const AddressBlock = ({ address, setAddress }) => {
  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(address);
    }
  };

  const logoutUser = () => setAddress('');

  return (
    <div className="address-block">
      <img className="address-block__metamask-icon" src={metamask} alt="metamask" />
      <span>{`${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`}</span>
      <button onClick={logoutUser} type="button">
        <img src={logout} alt="log out" />
      </button>
      <button onClick={copyToClipboard} type="button" className="address-block__copy">
        <img src={copy} alt="copy" />
      </button>
    </div>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1050);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1050);
    };
    window.addEventListener('resize', handleResize, true);

    if (window.ethereum) {
      window.ethereum.on('chainChanged', (networkId) => {
        if (networkId !== ambMainNetChainId.toString()) {
          setAddress('');
        }
      });
    }
  }, []);

  const handleMetamask = async () => {
    const getAddress = () => {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => setAddress(accounts[0]));
    };

    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.networkVersion === ambMainNetChainId.toString()) {
        getAddress();
      } else {
        await changeChainId();
        getAddress();
      }
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  const handleOpen = () => setIsOpen((state) => !state);

  return (
    <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
      <div className="side-menu__mobile-wrapper">
        <img className="side-menu__logo" src={logo} alt="logo" />
        <button onClick={handleOpen} className="side-menu__hamburger">
          <img src={isOpen ? close : menu} alt="menu" />
        </button>
      </div>
      {isOpen && (
        <>
          <div className="side-menu__content">
            {address ? (
              <AddressBlock address={address} setAddress={setAddress} />
            ) : (
              <button
                type="button"
                className='side-menu__connect-wallet'
                onClick={handleMetamask}
              >
                Connect wallet
              </button>
            )}
            <ul className="side-menu__list">
              <li>
                <a href="/">Firepot Swap</a>
              </li>
              <li>
                <a href="/">Firepot Pool</a>
              </li>
              <li>
                <a className="side-menu__list-link" href="https://airdao.io/staking/">
                  Stake
                </a>
              </li>
              <li>
                <a className="side-menu__list-link" href="https://airdao.io/bridge/">
                  Bridge
                </a>
              </li>
              <li>
                <a className="side-menu__list-link" href="https://explorer-beta.ambrosus.io/">
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
                <img src={house} alt="main"/>
                <a href="/">AIRDAO Main</a>
              </li>
              <li>
                <img src={docs} alt="docs"/>
                <a href="/">Docs</a>
              </li>
              <li>
                <img src={message} alt="message"/>
                <a href="/">Feedback</a>
              </li>
              <li>
                <img src={book} alt="book"/>
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
          <a href="/" className="side-menu__guide">
            <img src={question} alt="question"/>
            Bridge Guide
          </a>
        </>
      )}
    </div>
  );
};

export default Menu;
