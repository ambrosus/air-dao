import { useWeb3React } from '@web3-react/core';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router-dom';
import router from './router';
// import { useAutoLogin } from 'airdao-components-and-tools/hooks';

function App() {
  const web3ReactInstance = useWeb3React();
  // const isLoaded = useAutoLogin(web3ReactInstance);

  return (
    true && (
      <Layout {...{ web3ReactInstance }}>
        <RouterProvider router={router} />
      </Layout>
    )
  );
}

export default App;
