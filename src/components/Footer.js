import {useLocation} from 'react-router';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className={`footer ${location.pathname.includes('binance') ? 'footer_binance': ''}`}>
      <div className='container footer__wrapper'>
        <div className='footer__left'>
          <p className='footer__grey footer__grey--margin'>©2022 AirDAO</p>
          <p className='footer__grey'>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
