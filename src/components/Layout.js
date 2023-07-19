import { Menu } from 'airdao-components-and-tools/components';
import {
  metamaskConnector,
  walletconnectConnector,
} from 'airdao-components-and-tools/utils';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <div className='page-wrapper'>
        <div className='menu-wrapper'>
          <Menu
            metamaskConnector={metamaskConnector}
            walletconnectConnector={walletconnectConnector}
          />
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
