import { createBrowserRouter } from 'react-router-dom';
import Content from './components/Content';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Content />,
  },
]);

export default router;
