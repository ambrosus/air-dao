import { Menu } from 'airdao-components-and-tools/components';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children, web3ReactInstance }) => {
  return (
    <>
      <div className='page-wrapper'>
        <div className='menu-wrapper'>
          <Menu {...{ web3ReactInstance }} />
        </div>
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
