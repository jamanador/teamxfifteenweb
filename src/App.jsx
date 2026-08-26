import { RouterProvider } from 'react-router-dom';
import './index.css';
import { routes } from './router/routes';

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
