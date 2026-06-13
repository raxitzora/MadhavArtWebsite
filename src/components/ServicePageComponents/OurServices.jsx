import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { NavLink } from "react-router-dom";

const SERVICES = [
  {
    number: "01",
    title: "Custom Radium Art",
    desc: "Custom reflective radium designs that improve both night-time visibility. Hand-drawn to match your style and unique to your vehicle.",
    features: ["Unique appearance", "Customisable", "Night visibility", "Premium finish"],
    img: "/assets/radium-art.jpg",
  },
  {
    number: "02",
    title: "Bike Graphics & Sticker Design",
    desc: "Personalised graphics and sticker work designed specifically for your motorcycle. Built to complement your bike's shape and character.",
    features: ["Custom look", "Premium materials", "Modern styling", "Long-lasting finish"],
    img: "/assets/bike-graphics.jpg",
  },
  {
    number: "03",
    title: "Full Bike Color Restoration",
    desc: "Restore sun-faded, scratched, or damaged bikes with a completely refreshed appearance that brings your machine back to life.",
    features: ["Paint appearance", "Improved mechanics", "Surface restoration", "Complete transformation"],
    img: "/assets/color-restoration.jpg",
  },
  {
    number: "04",
    title: "Vehicle Touch-Up Work",
    desc: "Repair scratches, faded sections, and damaged visual areas by doing custom work in the — a finishing and craftsmanship.",
    features: ["Discreet restoration", "Professional detailing", "Affordable restoration", "Improved aesthetics"],
    img: "/assets/touch-up.jpg",
  },
  {
    number: "05",
    title: "Car Graphics & Styling",
    desc: "Custom graphics and styling solutions for your car. We cater to full wraps, unique designs that makes your car impossible to ignore.",
    features: ["Unique identity", "Precision design", "Professional application", "Tailored measurements"],
    img: "/assets/car-graphics.jpg",
  },
  {
    number: "06",
    title: "Complete Vehicle Customization",
    desc: "Personalised customisation solutions tailored to your vision and style preferences. From concept to completion, we bring to life.",
    features: ["One of a kind design", "Professional consultation", "Premium craftsmanship", "Result and appearance"],
    img: "/assets/full-custom.jpg",
  },
];

const E = [0.25, 0.46, 0.45, 0.94];

export default function OurServices() {
  return (
    <section className="w-full bg-[#111111] text-white px-5 sm:px-8 lg:px-14 py-16 flex flex-col gap-0">
      {SERVICES.map((service, i) => (
        <ServiceRow key={service.number} service={service} reverse={i % 2 !== 0} />
      ))}
    </section>
  );
}

// ─── Single alternating row ───────────────────────────────────────────────────
function ServiceRow({ service, reverse }) {
  const { number, title, desc, features, img } = service;

  const rowRef   = useRef(null);
  const inView   = useInView(rowRef, { once: true, margin: "-60px" });

  // Text slides in from the side it sits on; image from the opposite side
  const textX  = reverse ? 24 : -24;
  const imageX = reverse ? -24 : 24;

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-0 border-b border-white/5 last:border-0`}
    >
      {/* ── Text side ── */}
      <motion.div
        initial={{ opacity: 0, x: textX }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: textX }}
        transition={{ duration: 0.55, ease: E }}
        className="w-full lg:w-1/2 flex flex-col gap-5 py-12 lg:py-16 px-0 lg:px-8 xl:px-14"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: E, delay: 0.1 }}
          className="text-[10px] font-bold tracking-[0.22em] text-orange-500 uppercase"
        >
          Service — {number}
        </motion.p>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: E, delay: 0.15 }}
          className="font-bebas text-2xl sm:text-3xl font-extrabold leading-snug -tracking-tighter"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.42, ease: E, delay: 0.2 }}
          className="text-sm text-gray-400 leading-relaxed max-w-md"
        >
          {desc}
        </motion.p>

        {/* Features list — staggered dots */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
          {features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.35, ease: E, delay: 0.26 + i * 0.06 }}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              {f}
            </motion.li>
          ))}
        </ul>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.38, ease: E, delay: 0.42 }}
        >
          <NavLink
            to="/contact"
            className="group flex items-center gap-2 text-sm font-bold text-orange-500 border-b border-orange-500/40 pb-1 w-fit mt-2 transition-colors duration-200 hover:border-orange-500"
          >
            Enquire About This Service
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.18 }}
            >
              →
            </motion.span>
          </NavLink>
        </motion.div>
      </motion.div>

      {/* ── Image side ── */}
      <motion.div
        initial={{ opacity: 0, x: imageX }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageX }}
        transition={{ duration: 0.55, ease: E }}
        className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-[420px] overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <motion.img
          src={img}
          alt={title}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
          style={{ willChange: "transform" }}
        />
      </motion.div>
    </div>
  );
}