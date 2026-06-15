import { motion } from "framer-motion";

// ─── Gallery data – swap image paths with your /public/assets/ files ──────────
const FEATURED = {
  img:      "/assets/ourworkimages/bike-restoration.png",
  eyebrow:  "Before / After",
  title:    "Bike Restoration",
};

const GRID = [
  { img: "/assets/ourworkimages/radium-art.png",label: "Radium Art"},
  { img: "/assets/ourworkimages/color-transformation.png",label: "Color Transformation" },
  { img: "/assets/ourworkimages/custom-design.png",       label: "Custom Design"},
];

// Shared fade-up for scroll-triggered reveals
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut", delay } },
});

export default function OurWorkComp() {
  return (
    <section className="w-full bg-[#111111] text-white px-5 sm:px-8 lg:px-14 py-16 lg:py-20">

      {/* ── Section header ── */}
      <motion.div
  variants={fadeUp(0)}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="mb-12 text-center flex flex-col items-center"
>
  <p className="text-sm font-bold tracking-[0.3em] text-orange-500 uppercase mb-4">
    Our Work
  </p>

  <h2
    className="
      font-bebas
      text-center
      font-extrabold
      leading-[0.95]
      tracking-wider
      uppercase
    "
    style={{
      fontSize: "clamp(2.5rem, 7vw, 6rem)",
    }}
  >
    From Ordinary
    <br />
    <span className="text-orange-500">
      To Extraordinary
    </span>
  </h2>
</motion.div>

      {/* ── Gallery: large featured left + 2×2 grid right ── */}
     {/* ── Gallery: large featured left + 2×2 grid right ── */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

  {/* Featured Project */}
  <motion.div
    variants={fadeUp(0.1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-[#0c0c0c] border border-white/5 group"
  >
    <div className="h-75 sm:h-112.5 lg:h-162.5 flex items-center justify-center p-4">
      <img
        src={FEATURED.img}
        alt={FEATURED.title}
        className="
          w-full
          h-full
          object-contain
          transition-all
          duration-700
          group-hover:scale-105
        "
      />
    </div>

    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />

    <div className="absolute bottom-6 left-6">
      <p className="text-orange-500 uppercase tracking-[0.25em] text-xs font-bold mb-2">
        {FEATURED.eyebrow}
      </p>

      <h3 className="font-bebas text-3xl md:text-5xl tracking-wider">
        {FEATURED.title}
      </h3>
    </div>
  </motion.div>

  {/* Right Side Cards */}
  <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">

    {GRID.map(({ img, label }, i) => (
      <motion.div
        key={label}
        variants={fadeUp(0.15 + i * 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-[#0c0c0c]
          border
          border-white/5
          group
        "
      >
        <div className="h-65 sm:h-80 lg:h-75 flex items-center justify-center p-4">
          <img
            src={img}
            alt={label}
            className="
              w-full
              h-full
              object-contain
              transition-all
              duration-700
              group-hover:scale-105
            "
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

        <p className="
          absolute
          bottom-4
          left-4
          text-white
          font-semibold
          text-sm
          sm:text-base
        ">
          {label}
        </p>
      </motion.div>
    ))}
  </div>

</div>
    </section>
  );
}