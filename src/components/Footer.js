const Footer = () => {
  return (
    <footer
      className={`footer 
      ${window.location.pathname.includes('binance') ? 'footer_binance' : ''}
      ${window.location.pathname.includes('mexc') ? 'footer_mexc' : ''}
      ${window.location.pathname.includes('ambassadors') ? 'footer_ambassadors' : ''}
      ${window.location.pathname.includes('claim') ? 'footer_claim' : ''}
      `}
    >
      <div className='container footer__wrapper'>
        <div className='footer__left'>
          <p className='footer__grey footer__grey--margin'>©2023 AirDAO</p>
          <p className='footer__grey'>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
