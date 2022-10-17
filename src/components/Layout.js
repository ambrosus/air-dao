import bg from '../assets/background.png';
import Menu from 'airdao-menu';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children, address, login, logout }) => {
  return (
    <>
      <div className='page-wrapper'>
        <img className='background' src={bg} alt='background' />
        <Menu {...{ address, login, logout }} />
        <div className='white-overlay' />
        <div className='container'>{children}</div>
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  address: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func,
};

export default Layout;
