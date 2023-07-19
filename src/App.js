import Layout from './components/Layout';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useAutoLogin } from 'airdao-components-and-tools/hooks';
import { metamaskConnector } from 'airdao-components-and-tools/utils';

function App() {
  const isLoaded = useAutoLogin(metamaskConnector);

  return (
    isLoaded && (
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    )
  );
}

export default App;
