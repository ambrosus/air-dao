import { useWeb3React } from '@web3-react/core';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import {
  useAuthorization,
  useAutoLogin,
} from 'airdao-components-and-tools/hooks';

function App() {
  const web3React = useWeb3React();
  const isLoaded = useAutoLogin(web3React);
  const { loginMetamask, logout } = useAuthorization(web3React);
  console.log(1);
  return (
    isLoaded && (
      <Layout {...{ address: web3React.account, logout, login: loginMetamask }}>
        <RouterProvider router={router} />
      </Layout>
    )
  );
}

export default App;
