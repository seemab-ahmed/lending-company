import './App.css';
import './css/fonts.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader'; // Importing Loader component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to check if images have loaded
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
              setLoading(false); // All images loaded
            }
          };
        }
      });

      // If all images are already loaded
      if (images.length === loaded) {
        setLoading(false);
      }
    };

    // Ensure window.onload is triggered and image loading is handled
    const handleLoad = () => {
      setTimeout(() => {
        checkAllImagesLoaded();
      }, 3000); // Optional delay for smooth transition
    };

    if (document.readyState === 'complete') {
      handleLoad(); // if already loaded
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
