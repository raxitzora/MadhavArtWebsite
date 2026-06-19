import { useNavigate } from "react-router-dom";
import { ArrowRight, Bike, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const IMAGES = {
  radiumArt:    "/assets/heroimages/radium-art.png",
  restoration:  "/assets/heroimages/restoration.png",
  bikeStickers: "/assets/heroimages/bike-stickers.png",
  beforeBike:   "/assets/heroimages/before-bike.png",
  afterBike:    "/assets/heroimages/after-bike.png",
};

const SERVICES = [
  "Custom Radium Art",
  "Bike Graphics",
  "Color Restoration",
  "Vehicle Touch-Up",
  "Car Styling",
];

const E = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: E, delay },
  }),
};

export default function HeroComp() {
  const navigate = useNavigate();
  const [animateBike, setAnimateBike] = useState(false);
  const [fillButton, setFillButton] = useState(false);

  const leftRef = useRef(null);
  const gridRef = useRef(null);

  const leftInView = useInView(leftRef, { once: true, amount: 0 });
  const gridInView = useInView(gridRef, { once: true, amount: 0 });

  return (
    <section className="relative w-full min-h-screen bg-[#111111] text-white overflow-hidden px-4 sm:px-8 lg:px-14 pt-22.5 pb-10 lg:pb-16 flex items-center">

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 w-125 h-125 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #ff6a00 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* ════════ LEFT COLUMN ════════ */}
        <div ref={leftRef} className="flex flex-col gap-5 max-w-lg w-full">

          {/* Location badge */}
          <motion.p
            variants={fadeUp} custom={0}
            initial="hidden" animate={leftInView ? "visible" : "hidden"}
            className="flex items-center gap-2 text-xs text-white tracking-wide font-bold"
          >
            <span className="text-orange-500">📍</span>
            Madhavpur Ghed, Porbandar, Gujarat
          </motion.p>

          {/* Eyebrow */}
          <motion.div
            variants={fadeUp} custom={0.07}
            initial="hidden" animate={leftInView ? "visible" : "hidden"}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={leftInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, ease: E, delay: 0.15 }}
              style={{ originX: 0, display: "block" }}
              className="w-8 h-px bg-linear-to-r from-[#ff8c42] via-[#ff9f1c] to-[#ffb703]"
            />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-orange-500 uppercase">
              Vehicle Customization Workshop
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} custom={0.13}
            initial="hidden" animate={leftInView ? "visible" : "hidden"}
            className="font-bebas text-4xl sm:text-5xl xl:text-7xl leading-tight tracking-[0.01em]"
          >
            We Turn Bikes {" "}
            <span className="text-orange-500 font-extrabold underline">Rolling</span>{" "}
            Masterpieces
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={fadeUp} custom={0.2}
            initial="hidden" animate={leftInView ? "visible" : "hidden"}
            className="text-base md:text-lg text-gray-300 leading-8 max-w-lg"
          >
            Every detail matters. From precision graphics to complete color makeovers,
            we create vehicles that reflect your personality and style.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeUp} custom={0.27}
            initial="hidden" animate={leftInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-4 mt-1"
          >
            <button
              onClick={() => {
                setAnimateBike(true);
                setFillButton(true);
                setTimeout(() => navigate("/gallery"), 1300);
              }}
              className="
                group relative overflow-hidden w-full sm:w-120 h-14 rounded-xl
                font-semibold text-white
                bg-[#181818] border border-[#ff8c42]/20
                shadow-lg shadow-blue-500/20
                transition-all duration-300
                hover:scale-105
                hover:shadow-[0_0_30px_rgba(249,115,22,0.55)]
              "
            >
              <div
                className={`
                  absolute inset-0
                  bg-linear-to-r from-[#ffb36b] via-[#ff9a3d] to-[#ff7a18]
                  origin-left z-0
                  transition-transform duration-1300 ease-in-out
                  ${fillButton ? "scale-x-100" : "scale-x-0"}
                `}
              />
              <span className="relative z-20 flex items-center justify-center gap-3">
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                Explore Our Work
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              {animateBike && (
                <Bike
  size={30}
  className="absolute top-1/2 -translate-y-1/2 text-orange-500 animate-bikeRide z-30"
/>
              )}
            </button>
          </motion.div>

          {/* Service pills */}
          <motion.div
            variants={fadeUp} custom={0.33}
            initial="hidden" animate={leftInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2 mt-2"
          >
            <div className="w-full flex items-center gap-3 mb-2">
              <div className="h-0.5 w-10 bg-linear-to-r from-[#ff8c42] via-[#ff9f1c] to-[#ffb703]" />
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white">What We Do</h3>
              <div className="h-0.5 flex-1 bg-linear-to-r from-[#ff8c42]/50 to-transparent" />
            </div>

            {SERVICES.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  leftInView
                    ? { opacity: 1, y: 0, transition: { duration: 0.35, ease: E, delay: 0.38 + i * 0.06 } }
                    : { opacity: 0, y: 10 }
                }
                whileHover={{
                  y: -3,
                  borderColor: "rgba(249,115,22,0.55)",
                  backgroundColor: "#222",
                  transition: { duration: 0.18 },
                }}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-full
                  bg-[#1a1a1a] border border-orange-500/20
                  text-white font-semibold text-xs cursor-default
                "
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp} custom={0.55}
            initial="hidden" animate={leftInView ? "visible" : "hidden"}
            className="text-[11px] text-gray-500 italic mt-2"
          >
            "Every ride, a rolling masterpiece."
          </motion.p>
        </div>

        {/* ════════ RIGHT: Responsive Image Grid ════════ */}
        <div ref={gridRef} className="w-full flex flex-col gap-3">

          {/* TOP ROW — 3 small preview cards */}
          <div className="grid grid-cols-3 gap-3 h-35 sm:h-45 lg:h-50">
            <ImageCell
              img={IMAGES.radiumArt}
              label="Custom Art"
              imageFit="cover"
              inView={gridInView}
              index={0}
              className="rounded-xl col-span-1"
            />
            <ImageCell
              img={IMAGES.restoration}
              label="Restoration"
              imageFit="cover"
              inView={gridInView}
              index={1}
              className="rounded-xl col-span-1"
            />
            <ImageCell
              img={IMAGES.bikeStickers}
              label="Bike Stickers"
              imageFit="cover"
              inView={gridInView}
              index={2}
              className="rounded-xl col-span-1"
            />
          </div>

          {/* BOTTOM — Before/After slider, full width */}
          <BeforeAfterSlider
            before={IMAGES.beforeBike}
            after={IMAGES.afterBike}
            className="rounded-xl w-full h-60 sm:h-80 lg:h-105"
            inView={gridInView}
            index={3}
          />
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BEFORE / AFTER SLIDER
───────────────────────────────────────────── */
function BeforeAfterSlider({ before, after, className = "", inView, index = 0 }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  /* Touch drag support */
  const handlePointerMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, transition: { duration: 0.5, ease: E, delay: index * 0.055 } }
          : { opacity: 0, scale: 0.97 }
      }
      className={`relative overflow-hidden select-none touch-none ${className}`}
      onMouseMove={(e) => isDragging && handlePointerMove(e.clientX)}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
    >
      {/* Base — AFTER (right side) */}
      <img
        src={after}
        alt="After"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Clipped — BEFORE (left side) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt="Before"
          draggable={false}
          className="absolute inset-y-0 left-0 h-full object-cover"
          style={{ width: `${(10000 / position).toFixed(2)}%` }}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white z-20 shadow-[0_0_12px_rgba(255,255,255,0.9)] cursor-ew-resize"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Knob */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize">
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M4 7H1M1 7L3 5M1 7L3 9" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 7H13M13 7L11 5M13 7L11 9" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* BEFORE badge */}
      <div className="absolute top-3 left-3 z-30 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold tracking-wide shadow-md">
          BEFORE
        </span>
      </div>

      {/* AFTER badge */}
      <div className="absolute top-3 right-3 z-30 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full bg-green-500/90 text-white text-[10px] font-bold tracking-wide shadow-md">
          AFTER
        </span>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/70 text-white text-[10px] font-semibold whitespace-nowrap backdrop-blur-sm">
          ← Drag to compare →
        </span>
      </div>

      {/* Invisible range input fallback */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 opacity-0 cursor-ew-resize z-10"
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   IMAGE CELL
───────────────────────────────────────────── */
function ImageCell({ img, label, imageFit = "cover", labelPos = "bottom", className = "", inView, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, transition: { duration: 0.4, ease: E, delay: index * 0.055 } }
          : { opacity: 0, scale: 0.97 }
      }
      whileHover={{ scale: 1.03, transition: { duration: 0.22, ease: "easeOut" } }}
      className={`relative overflow-hidden group ${className}`}
      style={{ willChange: "transform" }}
    >
      <img
        src={img}
        alt={label || "vehicle work"}
        className={`w-full h-full ${
          imageFit === "contain" ? "object-contain p-2" : "object-cover"
        } transition-transform duration-500 group-hover:scale-105`}
        loading="lazy"
      />
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
      {/* Subtle gradient at bottom always */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
      {label && (
        <span
          className={`
            absolute ${labelPos === "bottom" ? "bottom-2" : "top-2"} left-2
            text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-orange-400
            transition-all duration-300
          `}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}