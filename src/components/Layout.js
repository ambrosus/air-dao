import Menu from 'airdao-menu';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children, address, login, logout }) => {
  return (
    <>
      <div className='page-wrapper'>
        <Menu {...{ address, login, logout }} />
        {children}
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
