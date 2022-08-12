import {useEffect, useState} from 'react';
import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';
import Footer from './Footer';

const navItems = ['about', 'get-amb', 'staking', 'community', 'network', 'bridge', 'contact', 'earn'];

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [anchor, setAnchor] = useState('');

  const handleOpen = () => setIsOpen((state) => !state);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsOpen(window.innerWidth > 480);
    };
    window.addEventListener('resize', handleResize, true);

    const bodyOffset = document.body.getBoundingClientRect().top;

    const scrollData = navItems.map((id) => {
      const section = document.getElementById(id);
      return { id, top: section.getBoundingClientRect().top - bodyOffset };
    });

    const handleScroll = () => {
      let currentAnchor = '';

      scrollData.forEach((el) => {
        if (window.scrollY > el.top - 400) {
          currentAnchor = el.id
        }
      })
      setAnchor(currentAnchor);
    }
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])



  return (
    <header className={`header${isOpen && isMobile ? ' header_expanded' : ''}`}>
      <img className="header__logo" src={logo} alt="logo"/>
      {isMobile && (
        <img
          className="header__menu"
          src={isOpen ? close : menu}
          alt="menu"
          onClick={handleOpen}
        />
      )}
      {isOpen && (
        <nav className="header__nav">
          <ul>
            <li>
              <a
                className={`header__nav-link${anchor === 'about' ? ' header__nav-link_active' : ''}`}
                href="#about"
                onClick={() => setAnchor('about')}
              >
                About us
              </a>
            </li>
            <li>
              <a
                className={`header__nav-link${anchor === 'get-amb' ? ' header__nav-link_active' : ''}`}
                href="#get-amb"
                onClick={() => setAnchor('get-amb')}
              >
                get amb
              </a>
            </li>
            <li>
              <a
                className={`header__nav-link${anchor === 'staking' ? ' header__nav-link_active' : ''}`}
                href="#staking"
                onClick={() => setAnchor('staking')}
              >
                staking
              </a>
            </li>
            <li>
              <a
                className={`header__nav-link${anchor === 'community' ? ' header__nav-link_active' : ''}`}
                href="#community"
                onClick={() => setAnchor('community')}
              >
                community
              </a>
            </li>
            <li>
              <a
                className={`header__nav-link${anchor === 'network' ? ' header__nav-link_active' : ''}`}
                href="#network"
                onClick={() => setAnchor('network')}
              >
                ambrosus network
              </a>
            </li>
            <li>
              <a
                className={`header__nav-link${anchor === 'bridge' ? ' header__nav-link_active' : ''}`}
                href="#bridge"
                onClick={() => setAnchor('bridge')}
              >
                bridge
              </a>
            </li>
            <li>
              <a
                className={`header__nav-link${anchor === 'contact' ? ' header__nav-link_active' : ''}`}
                href="#contact"
                onClick={() => setAnchor('contact')}
              >
                contact
              </a>
            </li>
            <li>
              <a
                className={`header__nav-link${anchor === 'earn' ? ' header__nav-link_active' : ''}`}
                href="#earn"
                onClick={() => setAnchor('earn')}
              >
                earn amb
              </a>
            </li>
          </ul>
        </nav>
      )}
      {isMobile && isOpen && (
        <div className="header__footer">
          <Footer/>
        </div>
      )}
    </header>
  )
};

export default Header;
