import { useRef } from "react";
import { motion, useInView } from "motion/react";

const SERVICES = [
  {
    icon: "⚡",
    title: "Custom Radium Art",
    desc: "Glow-in-the-dark custom radium artwork that makes your vehicle unmistakable at night.",
  },
  {
    icon: "🗂️",
    title: "Bike Graphics",
    desc: "Bold, precise graphics tailored to every bike model — from sport to cruiser.",
  },
  {
    icon: "🔄",
    title: "Full Bike Color Change",
    desc: "Complete color restoration and repainting to refresh or totally transform your bike.",
  },
  {
    icon: "🔧",
    title: "Vehicle Touch-Up",
    desc: "Professional touch-up work to fix scratches, fading, and worn surfaces.",
  },
  {
    icon: "🚗",
    title: "Car Graphics",
    desc: "Custom car wraps, decals, and graphic kits for a distinct, head-turning look.",
  },
  {
    icon: "✏️",
    title: "Custom Design Consultation",
    desc: "Sit down with our team to plan the exact look you want for your vehicle.",
  },
];

const E = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: E, delay },
  }),
};

export default function WhatWeDoComp() {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const gridInView   = useInView(gridRef,   { once: true, margin: "-50px" });

  return (
    <section className="w-full bg-[#111111] text-white px-5 sm:px-8 lg:px-14 py-16 lg:py-20">

      {/* ── Header ── */}
      <div ref={headerRef} className="mb-12 text-center">

        <motion.p
          variants={fadeUp} custom={0}
          initial="hidden" animate={headerInView ? "visible" : "hidden"}
          className="text-sm font-bold tracking-[0.3em] text-orange-500 uppercase mb-4"
        >
          What We Do
        </motion.p>

        <motion.h2
          variants={fadeUp} custom={0.08}
          initial="hidden" animate={headerInView ? "visible" : "hidden"}
          className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-none font-bebas tracking-[0.06em]"
        >
          Services That Make <br />
          <span className="text-orange-500">Vehicles Stand Out</span>
        </motion.h2>

      </div>

      {/* ── Cards grid ── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} {...service} index={i} inView={gridInView} />
        ))}
      </div>

    </section>
  );
}

// ─── Single service card ──────────────────────────────────────────────────────
function ServiceCard({ icon, title, desc, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        inView
          ? { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.07 } }
          : { opacity: 0, y: 20 }
      }
      whileHover={{
        y: -5,
        borderColor: "rgba(249,115,22,0.4)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="flex flex-col gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 cursor-default"
      style={{ willChange: "transform" }}
    >
      {/* Icon box */}
      <motion.div
        whileHover={{ backgroundColor: "rgba(249,115,22,0.22)", transition: { duration: 0.2 } }}
        className="w-11 h-11 flex items-center justify-center rounded-lg bg-orange-500/15 text-orange-500 text-xl"
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-base font-bold text-white">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed flex-1">{desc}</p>

    </motion.div>
  );
}