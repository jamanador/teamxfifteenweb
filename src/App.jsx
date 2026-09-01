import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import { routes } from './router/routes';

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors theme="dark" closeButton />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
