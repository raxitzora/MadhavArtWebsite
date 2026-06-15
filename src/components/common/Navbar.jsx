import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiPhone } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { name: "Home",     path: "/" },
  { name: "Services", path: "/services" },
  { name: "Gallery",  path: "/gallery" },
  { name: "About",    path: "/about" },
  { name: "Contact",  path: "/contact" },
];

// Reusable active-link class helper
const linkClass = (isActive) =>
  `relative font-semibold text-[0.95rem] tracking-wide transition-colors duration-200 group ${
    isActive ? "text-orange-500" : "text-gray-300 hover:text-white"
  }`;

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  // Track scroll position to darken navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Sticky Header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a] shadow-[0_4px_32px_rgba(0,0,0,0.7)]" : "bg-[#0d0d0d]"
        }`}
      >
        {/* Subtle orange accent line at bottom of navbar */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-18">

          {/* Logo */}
          <NavLink to="/" onClick={closeMenu} className="flex items-center gap-3 shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 380, damping: 14 }}
              className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-extrabold text-black text-xl shadow-[0_0_18px_rgba(249,115,22,0.45)]"
            >
              M
            </motion.div>
            <span className="text-[1.65rem] font-extrabold leading-none tracking-tight">
              <span className="text-white">Madhav</span>
              <span className="text-orange-500">Art</span>
            </span>
          </NavLink>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map(({ name, path }) => (
              <NavLink key={path} to={path} className={({ isActive }) => linkClass(isActive)}>
                {({ isActive }) => (
                  <>
                    {name}
                    {/* Animated underline */}
                    <span className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-orange-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+91 9624196196" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
              {/* Phone icon rings on interval */}
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.55 }}
                className="text-orange-500"
              >
                <BiPhone size={20} />
              </motion.span>
              <span className="font-semibold text-sm">+91 9624196196</span>
            </a>

            <NavLink
              to="/contact"
              className="bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all duration-200"
            >
              Get a Quote
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:text-orange-500 hover:bg-white/5 transition-all duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate:  90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            />

            {/* Slide-down panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y:  0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-18 left-0 right-0 z-50 lg:hidden bg-[#0d0d0d] border-b border-white/8 shadow-[0_16px_48px_rgba(0,0,0,0.65)]"
            >
              {/* Nav links */}
              <ul className="flex flex-col px-5 pt-4 pb-2">
                {NAV_LINKS.map(({ name, path }, i) => (
                  <motion.li
                    key={path}
                    initial={{ x: -14, opacity: 0 }}
                    animate={{ x: 0,   opacity: 1 }}
                    transition={{ delay: i * 0.055, duration: 0.28, ease: "easeOut" }}
                  >
                    <NavLink
                      to={path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 ${
                          isActive ? "text-orange-500" : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                            isActive ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" : "bg-gray-600"
                          }`} />
                          {name}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mx-5 border-t border-white/8" />

              {/* Phone + CTA row */}
              <div className="flex flex-col sm:flex-row gap-3 px-5 py-4">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 hover:text-white border border-white/10 hover:border-orange-500/40 rounded-full px-5 py-2.5 transition-all duration-200"
                >
                  <BiPhone size={17} className="text-orange-500" />
                  +91 9624196196
                </a>
                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-200 sm:ml-auto"
                >
                  Get a Quote
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}