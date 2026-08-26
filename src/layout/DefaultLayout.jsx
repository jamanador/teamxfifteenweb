import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Footer from './Footer';
import Navbar from './Navbar';

const DefaultLayout = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-stone-100 flex flex-col font-['Inter',sans-serif] selection:bg-[#80142B] selection:text-amber-200">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
