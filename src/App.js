import './App.css';
import './css/fonts.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import BridgingFinance from './pages/BridgingFinance';
import BuytoLet from './pages/BuytoLet';
import ResidentialMortgages from './pages/ResidentialMortgages';
import CommercialMortgages from './pages/CommercialMortgages';
import Home from './pages/Home';
import FixedRateReminder from './pages/FixedRateReminder';
import Configure from './pages/Configure';
import UrgentRemortgage from "./pages/UrgentRemortgage";
import FirstTimeBuyers from "./pages/FirstTimeBuyers";
import FAQs from "./pages/FAQs";
import BlogPage from './pages/blog';
import MortgageProtection from './pages/MortgageProtection';
import ForeignNationals from './pages/ForeignNationals';

import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-in-out',
    });

    // Image loading
    const checkAllImagesLoaded = () => {
      const images = document.getElementsByTagName('img');
      let loaded = 0;

      Array.from(images).forEach((image) => {
        if (image.complete) {
          loaded++;
        } else {
          image.onload = () => {
            loaded++;
            if (loaded === images.length) {
              setLoading(false);
            }
          };
        }
      });

      if (images.length === loaded) {
        setLoading(false);
      }
    };

    const handleLoad = () => {
      setTimeout(() => {
        checkAllImagesLoaded();
      }, 3000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS on route/component updates
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bridging-finance" element={<BridgingFinance />} />
          <Route path="/buy-to-let" element={<BuytoLet />} />
          <Route path="/residential-mortgages" element={<ResidentialMortgages />} />
          <Route path="/commercial-mortgages" element={<CommercialMortgages />} />
          <Route path="/configure" element={<Configure />} />
          <Route path="/fixed-rate-reminder" element={<FixedRateReminder />} />
          <Route path="/urgent-remortgage" element={<UrgentRemortgage />} />
          <Route path="/first-time-buyers" element={<FirstTimeBuyers />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/mortgage-protection" element={<MortgageProtection />} /> 
          <Route path="/mortgage-protection" element={<MortgageProtection />} /> 
          <Route path="/foreign-nationals" element={<ForeignNationals />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
