import { Sparkles, Eye, RefreshCcw } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const cards = [
  {
    image: "/assets/custom-design.jpg",
    icon: Sparkles,
    title: "Custom Designs",
    description:
      "Every vehicle receives unique design treatment tailored to the owner's personality and vision.",
  },
  {
    image: "/assets/detail-work.jpg",
    icon: Eye,
    title: "Attention to Detail",
    description:
      "Professional finishing, clean application, and quality workmanship on every single project.",
  },
  {
    image: "/assets/restoration.jpg",
    icon: RefreshCcw,
    title: "Restore & Revive",
    description:
      "Bring old, faded, and damaged vehicles back to life with expert restoration and touch-up work.",
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

export default function WhyMadhavArtComp() {
  const headerRef = useRef(null);
  const cardsRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const cardsInView  = useInView(cardsRef,  { once: true, margin: "-50px" });

  return (
    <section className="bg-black text-white py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-20 text-center flex flex-col items-center">
          <div className="max-w-5xl mx-auto px-4">

            <motion.p
              variants={fadeUp} custom={0}
              initial="hidden" animate={headerInView ? "visible" : "hidden"}
              className="text-orange-500 text-xs font-medium tracking-[0.25em] uppercase mb-4"
            >
              Why MadhavArt
            </motion.p>

            <motion.h2
              variants={fadeUp} custom={0.08}
              initial="hidden" animate={headerInView ? "visible" : "hidden"}
              className="font-bebas font-extrabold uppercase text-center leading-[0.9] tracking-[0.02em] wrap-break-words"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
            >
              More Than Customization.
              <br />
              <span className="text-orange-500">It's Vehicle Transformation.</span>
            </motion.h2>

          </div>
        </div>

        {/* ── Cards ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                animate={
                  cardsInView
                    ? { opacity: 1, y: 0, transition: { duration: 0.45, ease: E, delay: i * 0.1 } }
                    : { opacity: 0, y: 22 }
                }
                whileHover={{
                  y: -8,
                  borderColor: "rgba(249,115,22,0.3)",
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                className="
                  group bg-[#080808] border border-white/10
                  rounded-2xl overflow-hidden
                  font-bebas tracking-[0.04em]
                  cursor-default
                "
                style={{ willChange: "transform" }}
              >
                {/* Image */}
                <div className="h-60 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Icon box – subtle glow on hover */}
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(249,115,22,0.18)", transition: { duration: 0.2 } }}
                    className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5"
                  >
                    <Icon size={20} className="text-orange-500" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-400 leading-7">{card.description}</p>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}