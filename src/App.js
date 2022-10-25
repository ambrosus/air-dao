import { useWeb3React } from '@web3-react/core';
import useAutoLogin from './hooks/useAutoLogin';
import useAuthorization from './hooks/useAuthorization';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  const isLoaded = useAutoLogin();
  const { account: address } = useWeb3React();
  const { loginMetamask, logout } = useAuthorization();

  return (
    isLoaded && (
      <Layout {...{ address, logout, login: loginMetamask }}>
        <RouterProvider router={router} />
      </Layout>
    )
  );
}

export default App;
