import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACTS = [
  { icon: Phone,  label: "Phone",    value: "9624196196",              href: "tel:9624196196" },
  { icon: Mail,   label: "Email",    value: "rameshzora@gmail.com",    href: "mailto:rameshzora@gmail.com" },
  { icon: MapPin, label: "Location", value: "Madhavpur Ghed, Porbandar, Gujarat", href: null },
];


const fadeUp = (i = 0) => ({
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function Introduction() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#050505] text-white px-5 sm:px-8 lg:px-14 xl:px-20 py-20 lg:py-28"
    >
<div className="max-w-5xl mx-auto flex flex-col items-center text-center">

  <motion.div
    variants={fadeUp(0)}
    initial="hidden"
    animate={inView ? "show" : "hidden"}
    className="mb-6"
  >
    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-[#ff8c42] uppercase border border-[#ff8c42]/25 bg-[#ff8c42]/8 rounded-full px-4 py-2">
      <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c42]" />
      About MadhavArt
    </span>
  </motion.div>

  <motion.h1
    variants={fadeUp(1)}
    initial="hidden"
    animate={inView ? "show" : "hidden"}
    className="font-bebas text-6xl sm:text-7xl xl:text-8xl leading-[0.95] tracking-wide uppercase text-center max-w-5xl font-bold"
  >
    Transforming Vehicles Into{" "}
    <span className="text-orange-500">
      Rolling Masterpieces
    </span>
  </motion.h1>

  <motion.p
    variants={fadeUp(2)}
    initial="hidden"
    animate={inView ? "show" : "hidden"}
    className="text-[#a1a1aa] text-lg leading-relaxed max-w-3xl mx-auto mt-6"
  >
    MadhavArt is a premium bike customization and radium art studio
    located in Madhavpur Ghed, Porbandar. We specialize in custom
    graphics, stickers, color transformations, and complete vehicle
    personalization.
  </motion.p>
  <motion.div
  variants={fadeUp(3)}
  initial="hidden"
  animate={inView ? "show" : "hidden"}
  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-4xl"
>
  {CONTACTS.map(({ icon: Icon, label, value, href }, index) => (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="group"
    >
      {href ? (
        <a href={href}>
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm transition-all duration-300 hover:border-[#ff8c42]/50">
            <div className="flex justify-center mb-4">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.15 }}
                className="w-12 h-12 rounded-xl bg-[#ff8c42]/10 flex items-center justify-center"
              >
                <Icon size={22} className="text-[#ff8c42]" />
              </motion.div>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-[#ff8c42] mb-2">
              {label}
            </p>

            <p className="text-white font-medium wrap-break-words">
              {value}
            </p>
          </div>
        </a>
      ) : (
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm hover:border-[#ff8c42]/50 transition-all duration-300">
          <div className="flex justify-center mb-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.15 }}
              className="w-12 h-12 rounded-xl bg-[#ff8c42]/10 flex items-center justify-center"
            >
              <Icon size={22} className="text-[#ff8c42]" />
            </motion.div>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#ff8c42] mb-2">
            {label}
          </p>

          <p className="text-white font-medium">
            {value}
          </p>
        </div>
      )}
    </motion.div>
  ))}
</motion.div>

</div>
    </section>
  );
}




