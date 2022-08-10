import twitter from '../assets/twitter.svg';
import telegram from '../assets/telegram.svg';
import reddit from '../assets/reddit.svg';
import circles from '../assets/circles.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__wrapper">
        <div className="footer__left">
          <a className="footer__link" href="">Privacy policy</a>
          <a className="footer__link" href="">Terms ad conditions</a>
          <a className="footer__mail" href= "mailto:contact@airdao.io">contact@airdao.io</a>
        </div>
        <div className="footer__right">
          <div className="footer__socials">
            <img src={twitter} alt="twitter"/>
            <img src={telegram} alt="telegram"/>
            <img src={reddit} alt="reddit"/>
            <img src={circles} alt="circles"/>
          </div>
          <p>©2021 AirDAO</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
