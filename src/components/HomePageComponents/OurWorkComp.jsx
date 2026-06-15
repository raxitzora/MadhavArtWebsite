import { motion } from "framer-motion";

// ─── Gallery data – swap image paths with your /public/assets/ files ──────────
const FEATURED = {
  img:      "/assets/bike-restoration.jpg",
  eyebrow:  "Before / After",
  title:    "Bike Restoration",
};

const GRID = [
  { img: "/assets/radium-art.jpg",          label: "Radium Art"           },
  { img: "/assets/car-graphics.jpg",        label: "Car Graphics"         },
  { img: "/assets/color-transformation.jpg",label: "Color Transformation" },
  { img: "/assets/custom-design.jpg",       label: "Custom Design"        },
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
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3">

        {/* Featured large card */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl group aspect-4/3 lg:aspect-auto"
        >
          <img
            src={FEATURED.img}
            alt={FEATURED.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bottom-left label overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="text-[10px] font-bold tracking-[0.18em] text-orange-500 uppercase mb-1">
              {FEATURED.eyebrow}
            </p>
            <h3 className="text-xl font-extrabold text-white">{FEATURED.title}</h3>
          </div>
        </motion.div>

        {/* 2×2 small cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {GRID.map(({ img, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp(0.15 + i * 0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl group aspect-square"
            >
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient + label */}
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 text-[11px] sm:text-xs font-bold tracking-wide text-white">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}