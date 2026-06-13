import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { Sparkles, Bike } from "lucide-react";
import { useState } from "react";

const E = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: E, delay },
  }),
};

export default function GalleryHeroComp() {
  const [animateBike, setAnimateBike] = useState(false);
  const [fillButton, setFillButton]   = useState(false);

  const scrollToGallery = () => {
    setAnimateBike(true);
    setFillButton(true);

    setTimeout(() => {
      const section = document.getElementById("gallery-images");
      if (!section) return;

      const top = section.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });

      setAnimateBike(false);
      setFillButton(false);
    }, 1800);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d]">

      {/* Full-bleed background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/gallery-hero-bike.jpg')" }}
      />

      {/* Overlay — centre-focused so text on all sides stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-black/30" />

      {/* ── Main content — centred ── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-5 sm:px-10 lg:px-16 gap-6 max-w-3xl mx-auto">

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp} custom={0}
          initial="hidden" animate="show"
          className="text-[10px] sm:text-xs font-bold tracking-[0.28em] text-orange-500 uppercase"
        >
          MadhavArt — Gallery
        </motion.p>

        {/* Headline */}
        <h1 className="font-bebas text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.02] tracking-wide">
          <motion.span
            variants={fadeUp} custom={0.08}
            initial="hidden" animate="show"
            className="block text-white"
          >
            Every Vehicle
          </motion.span>
          <motion.span
            variants={fadeUp} custom={0.18}
            initial="hidden" animate="show"
            className="block text-orange-500"
          >
            Has A Story.
          </motion.span>
          <motion.span
            variants={fadeUp} custom={0.28}
            initial="hidden" animate="show"
            className="block text-white"
          >
            Here's Ours.
          </motion.span>
        </h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp} custom={0.38}
          initial="hidden" animate="show"
          className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm sm:max-w-md"
        >
          Explore custom radium art, bike graphics, vehicle restorations, color
          transformations, and personalized designs crafted at MadhavArt.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp} custom={0.46}
          initial="hidden" animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          {/* ── Primary button – 100% ORIGINAL, untouched ── */}
          <button
            onClick={scrollToGallery}
            className="
              group relative overflow-hidden
              w-full sm:w-[420px] h-14 rounded-xl
              font-semibold text-white
              bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155]
              shadow-lg shadow-blue-500/20
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(249,115,22,0.55)]
            "
          >
            <div
              className={`
                absolute inset-0
                bg-gradient-to-r from-[#ff8c42] via-[#ff9f1c] to-[#ffb703]
                origin-left z-0
                transition-transform duration-[1000ms] ease-in-out
                ${fillButton ? "scale-x-100" : "scale-x-0"}
              `}
            />
            <span className="relative z-20 flex items-center justify-center gap-3 h-full">
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              View Transformations
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
            {animateBike && (
              <Bike size={28} className="absolute top-1/2 -translate-y-1/2 animate-bikeRide z-30" />
            )}
          </button>

          {/* Secondary CTA */}
          <motion.div whileHover={{ borderColor: "rgba(249,115,22,1)" }} transition={{ duration: 0.2 }}>
            <NavLink
              to="/contact"
              className="block border border-white/40 hover:border-orange-500 active:scale-95 transition-all duration-200 text-white font-bold text-sm px-7 py-3 rounded-md"
            >
              Get A Quote
            </NavLink>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Scroll indicator — bottom center ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: E }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
  
      
      </motion.div>

    </section>
  );
}