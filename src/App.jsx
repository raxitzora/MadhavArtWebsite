
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";
import ScrollToTopButton from "./components/common/ScrollToTopButton.jsx";

import Navbar from "./components/common/Navbar";
import Loader from "./components/common/Loader";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ServicePage from "./pages/ServicePage/ServicePage.jsx";
import GalleryPage from "./pages/GalleryPage/GalleryPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./admin/pages/components/ProtectedRoute.jsx";

import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  const [showLoader, setShowLoader] = useState(() => {
    if (isAdminRoute) return false;

    return sessionStorage.getItem("madhavart-loader") !== "done";
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("madhavart-loader", "done");
    setShowLoader(false);
  };

  return (
    <>
      {/* Loader Overlay */}

      {!isAdminRoute && showLoader && (
        <Loader
          onComplete={handleLoaderComplete}
        />
      )}

      {/* Website */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <ScrollToTop />

        {!isAdminRoute && <Navbar />}

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#181818",
              color: "#fff",
              border: "1px solid rgba(249,115,22,.2)",
            },
          }}
        />

        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/services"
            element={<ServicePage />}
          />

          <Route
            path="/gallery"
            element={<GalleryPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {!isAdminRoute && (
          <ScrollToTopButton />
        )}
      </motion.div>
    </>
  );
}

export default App;

