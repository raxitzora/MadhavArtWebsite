import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";

import Navbar from "./components/common/Navbar";
import Loader from "./components/common/Loader";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ServicePage from "./pages/ServicePage/ServicePage.jsx";
import GalleryPage from "./pages/GalleryPage/GalleryPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import "./App.css";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Navbar />
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/gallery"  element={<GalleryPage />} />
            <Route path="/about"    element={<AboutPage />} />
            <Route path="/contact"  element={<ContactPage />} />
          </Routes>
        </motion.div>
      )}
    </>
  );
}

export default App;