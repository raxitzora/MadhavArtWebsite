import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiPhone, BiMap } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { Bike } from "lucide-react";
import { useState } from "react";
// ─── Data ────────────────────────────────────────────────────────────────────
const QUICK_LINKS = ["Home", "Services", "Gallery", "Process", "About", "Contact"];

const SERVICES = [
  "Custom Radium Art",
  "Bike Graphics",
  "Full Bike Color Change",
  "Vehicle Touch-Up",
  "Car Graphics",
  "Custom Design Consultation",
];

// Fade-up for scroll reveals
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay } },
});

export default function Footer() {
  const [animateBike, setAnimateBike] = useState(false);
  return (
    <footer className="w-full bg-[#111111] text-white">

      {/* ════════════════ CTA BANNER ════════════════ */}
      <div className="relative overflow-hidden">

        {/* Full-bleed background image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/cta-bike.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/65" />

        {/* CTA content — centred */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center text-center px-5 py-20 sm:py-28 gap-6 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight font-bebas tracking-[0.03em] text-white">
            Ready To Give Your Vehicle{" "}
            <span className="text-orange-500">A New Identity?</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
            Whether you need custom radium art, graphics, restoration, or a complete
            makeover — MadhavArt is ready to transform your ride.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
           
            <NavLink
              to="/contact"
              className="border border-white/30 hover:border-orange-500  text-white font-bold text-sm px-8 py-3 rounded-full transition-all duration-200"
            >
              Contact Us
            </NavLink>
          </div>
        </motion.div>
      </div>

      {/* ════════════════ FOOTER COLUMNS ════════════════ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand */}
        <motion.div
          variants={fadeUp(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {/* Logo block */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center font-extrabold text-black text-xl shadow-[0_0_16px_rgba(249,115,22,0.4)]">
              M
            </div>
            <div>
              <p className="font-extrabold text-lg leading-tight">MadhavArt</p>
              <p className="text-[10px] tracking-[0.18em] text-gray-400 uppercase">Bike/Car Color Customization</p>
              <p className="text-[10px] tracking-[0.18em] text-gray-400 uppercase">Radium Art</p>

            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Premium vehicle customization, radium art, and color restoration workshop in
            Madhavpur Ghed, Gujarat.
          </p>

          {/* WhatsApp button */}
    <a
  href="#"
  onClick={(e) => {
    e.preventDefault();

    setAnimateBike(true);

    setTimeout(() => {
      window.open(
        "https://wa.me/919624196196",
        "_blank"
      );
    }, 1000);
  }}
  className="
    group
    relative
    overflow-hidden
    flex
    items-center
    gap-3
    w-fit
    px-6
    py-3
    rounded-xl
    font-semibold
    text-white
    bg-linear-to-r
    from-[#0f172a]
    via-[#1e293b]
    to-[#334155]
    shadow-lg
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-[0_0_25px_rgba(37,211,102,0.45)]
  "
>
  {/* Shine */}
  <span
    className="
      absolute
      inset-0
      -translate-x-full
      bg-linear-to-r
      from-transparent
      via-white/20
      to-transparent
      group-hover:translate-x-full
      transition-transform
      duration-700
    "
  />

  {/* Bike */}
 {animateBike && (
  <Bike
    size={18}
    className="
      absolute
      top-1/2
      -translate-y-1/2
      animate-bikeRide
      z-20
    "
  />
)}

  <FaWhatsapp
    size={20}
    className="relative z-10 text-[#25D366]"
  />

  <span className="relative z-10">
    WhatsApp Us
  </span>
</a>
        </motion.div>

        {/* Col 2 — Quick Links */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h4 className="text-xs font-bold tracking-[0.18em] text-gray-400 uppercase mb-5">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((name) => (
              <li key={name}>
                <NavLink
                  to={`/${name.toLowerCase()}`}
                  className="text-sm text-gray-300 hover:text-orange-500 transition-colors duration-200 font-bebas leading-tight tracking-[0.06em]"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 3 — Services */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h4 className="text-xs font-bold tracking-[0.18em] text-gray-400 uppercase mb-5">
            Services
          </h4>
          <ul className="flex flex-col gap-3">
            {SERVICES.map((s) => (
              <li key={s}>
                <NavLink
                  to="/services"
                  className="text-sm text-gray-300 hover:text-orange-500 transition-colors duration-200 font-bebas leading-tight tracking-[0.06em]"
                >
                  {s}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 4 — Contact */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h4 className="text-xs font-bold tracking-[0.18em] text-gray-400 uppercase mb-1">
            Contact Us
          </h4>

          {/* Address */}
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <HiLocationMarker size={18} className="text-orange-500 shrink-0 mt-0.5" />
            <span>Infront of Bapasitaram Mandir, Madhavpur ghed, Porbandar<br />Gujarat, India</span>
          </div>

          {/* Phone */}
          <a
            href="tel:+919624196196"
            className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            <BiPhone size={18} className="text-orange-500 shrink-0" />
            +91 96241 96196
          </a>

          {/* Google Maps link */}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors duration-200"
          >
            <BiMap size={18} className="shrink-0" />
            View on Google Maps
          </a>
        </motion.div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-5 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MadhavArt. All rights reserved.
      </div>

    </footer>
  );
}