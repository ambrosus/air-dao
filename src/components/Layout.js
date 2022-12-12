// import { Menu } from 'airdao-components-and-tools/components';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <div className='page-wrapper'>
        {/*<Menu {...{ web3ReactInstance }} />*/}
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  web3ReactInstance: PropTypes.object,
};

export default Layout;
