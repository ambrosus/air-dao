const Footer = () => {
  return (
    <footer
      className={`footer 
      ${window.location.pathname.includes('binance') ? 'footer_binance' : ''}
      ${window.location.pathname.includes('mexc') ? 'footer_mexc' : ''}
      ${
        window.location.pathname.includes('ambassadors')
          ? 'footer_ambassadors'
          : ''
      }
      ${window.location.pathname.includes('airdrop') ? 'footer_claim' : ''}
      ${
        window.location.pathname.includes('bond-marketplace')
          ? 'footer_bond-marketplace'
          : ''
      }
      ${
        window.location.pathname.includes('transition-to-dao')
          ? 'footer_transition-to-community'
          : ''
      } 
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
