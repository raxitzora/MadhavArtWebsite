import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { HiX, HiOutlineArrowRight } from "react-icons/hi";
import { MdFilterList } from "react-icons/md";

// ─── Gallery data ─────────────────────────────────────────────────────────────
const ALL_ITEMS = [
  { id: 1,  cat: "radium-art",      img: "/assets/gallery/radium-1.jpg",   title: "Neon Skulls Radium Art",   label: "Radium Art" },
  { id: 2,  cat: "radium-art",      img: "/assets/gallery/radium-2.jpg",   title: "Flame Radium Tank",        label: "Radium Art" },
  { id: 3,  cat: "radium-art",      img: "/assets/gallery/radium-3.jpg",   title: "Galaxy Glow Art",          label: "Radium Art" },
  { id: 4,  cat: "radium-art",      img: "/assets/gallery/radium-4.jpg",   title: "Dragon Radium Design",     label: "Radium Art" },
  { id: 5,  cat: "graphics",        img: "/assets/gallery/graphics-1.jpg", title: "Tiger Stripe Graphics",    label: "Bike Graphics" },
  { id: 6,  cat: "graphics",        img: "/assets/gallery/graphics-2.jpg", title: "Carbon Tribal Kit",        label: "Bike Graphics" },
  { id: 7,  cat: "graphics",        img: "/assets/gallery/graphics-3.jpg", title: "Lightning Wrap",           label: "Bike Graphics" },
  { id: 8,  cat: "graphics",        img: "/assets/gallery/graphics-4.jpg", title: "Matte Black Stripes",      label: "Bike Graphics" },
  { id: 9,  cat: "customize-bikes", img: "/assets/gallery/bike-1.jpg",     title: "Royal Blue Restoration",   label: "Color Restoration" },
  { id: 10, cat: "customize-bikes", img: "/assets/gallery/bike-2.jpg",     title: "Cafe Racer Makeover",      label: "Color Restoration" },
  { id: 11, cat: "customize-bikes", img: "/assets/gallery/bike-3.jpg",     title: "Chrome Chopper Build",     label: "Color Restoration" },
  { id: 12, cat: "customize-bikes", img: "/assets/gallery/bike-4.jpg",     title: "Vintage Bobber Restore",   label: "Color Restoration" },
  { id: 13, cat: "vehicle-touchup", img: "/assets/gallery/touchup-1.jpg",  title: "White Pearl Makeover",     label: "Vehicle Touch-Up" },
  { id: 14, cat: "vehicle-touchup", img: "/assets/gallery/touchup-2.jpg",  title: "Matte War Machine",        label: "Cars" },
  { id: 15, cat: "vehicle-touchup", img: "/assets/gallery/touchup-3.jpg",  title: "Scooter Pearl Finish",     label: "Vehicle Touch-Up" },
  { id: 16, cat: "vehicle-touchup", img: "/assets/gallery/touchup-4.jpg",  title: "Jeep Matte Wrap",          label: "Cars" },
  { id: 17, cat: "custom-designs",  img: "/assets/gallery/custom-1.jpg",   title: "Dragon Body Art",          label: "Custom Designs" },
  { id: 18, cat: "custom-designs",  img: "/assets/gallery/custom-2.jpg",   title: "Samurai Tank Art",         label: "Custom Designs" },
  { id: 19, cat: "custom-designs",  img: "/assets/gallery/custom-3.jpg",   title: "Phoenix Wing Design",      label: "Custom Designs" },
  { id: 20, cat: "custom-designs",  img: "/assets/gallery/custom-4.jpg",   title: "Mandala Fuel Tank",        label: "Custom Designs" },
];

const TABS = [
  { key: "all",             label: "All Work",         count: ALL_ITEMS.length },
  { key: "radium-art",      label: "Radium Art",       count: ALL_ITEMS.filter(i => i.cat === "radium-art").length },
  { key: "graphics",        label: "Graphics",         count: ALL_ITEMS.filter(i => i.cat === "graphics").length },
  { key: "customize-bikes", label: "Customize Bikes",  count: ALL_ITEMS.filter(i => i.cat === "customize-bikes").length },
  { key: "vehicle-touchup", label: "Vehicle Touch-Up", count: ALL_ITEMS.filter(i => i.cat === "vehicle-touchup").length },
  { key: "custom-designs",  label: "Custom Designs",   count: ALL_ITEMS.filter(i => i.cat === "custom-designs").length },
];

const E = [0.25, 0.46, 0.45, 0.94];

// ─── Lightweight grid item variant ───────────────────────────────────────────
// Only opacity — NO scale/y on 20 items. Scale on many items = heavy compositor work.
const gridItem = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
};

export default function GalleryImages() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox,  setLightbox]  = useState(null);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  const items = activeTab === "all"
    ? ALL_ITEMS
    : ALL_ITEMS.filter(i => i.cat === activeTab);

  const navigateLightbox = useCallback((dir) => {
    const idx  = items.findIndex(i => i.id === lightbox.id);
    const next = (idx + dir + items.length) % items.length;
    setLightbox(items[next]);
  }, [items, lightbox]);

  return (
    <section
      id="gallery-images"
      className="w-full bg-[#111111] text-white px-5 sm:px-8 lg:px-14 py-16"
    >

      {/* ── Header ── */}
      <div
        ref={headerRef}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42, ease: E }}
        >
          <h2 className="font-bebas text-4xl sm:text-5xl font-extrabold leading-tight tracking-wide">
            Explore <br />
            <span className="text-orange-500">Our Work</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: E, delay: 0.12 }}
          className="flex items-center gap-1.5 text-xs text-gray-400"
        >
          <MdFilterList size={15} className="text-orange-500" /> Filter by category
        </motion.p>
      </div>

      {/* ── Filter tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.38, ease: E, delay: 0.18 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {TABS.map(({ key, label, count }) => (
          <motion.button
            key={key}
            onClick={() => setActiveTab(key)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-colors duration-200 ${
              activeTab === key
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-white/15 text-gray-400 hover:border-orange-500/50 hover:text-white"
            }`}
          >
            {label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === key ? "bg-black/30 text-white" : "bg-white/10 text-gray-400"
            }`}>
              {count}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* ── Image grid ── */}
      {/*
        Performance strategy:
        - AnimatePresence mode="popLayout" for smooth filter transitions
        - Only opacity animated (no scale/transform on 20 items — too heavy)
        - willChange omitted intentionally — browser handles GPU layer per item automatically
        - CSS hover effects (group-hover) for image zoom — cheaper than whileHover on 20 nodes
      */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={gridItem}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => setLightbox(item)}
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square bg-[#1a1a1a]"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.style.opacity = "0.3"; }}
              />

              {/* Hover overlay — pure CSS, zero JS cost */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-[9px] font-bold tracking-[0.18em] text-orange-400 uppercase mb-0.5">
                  {item.label}
                </p>
                <p className="text-xs font-bold text-white truncate">{item.title}</p>
              </div>

              {/* Arrow icon */}
              <div className="absolute top-2 right-2 w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <HiOutlineArrowRight size={14} className="text-white -rotate-45" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-100 bg-black/92 flex items-center justify-center px-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              <img
                src={lightbox.img}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />

              <div className="flex items-center justify-between mt-3 px-1">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-orange-500 uppercase">
                    {lightbox.label}
                  </p>
                  <p className="text-sm font-bold text-white">{lightbox.title}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigateLightbox(-1)}
                    className="w-8 h-8 rounded-lg border border-white/20 hover:border-orange-500 text-white hover:text-orange-500 transition-colors duration-200 flex items-center justify-center font-bold"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => navigateLightbox(1)}
                    className="w-8 h-8 rounded-lg border border-white/20 hover:border-orange-500 text-white hover:text-orange-500 transition-colors duration-200 flex items-center justify-center font-bold"
                  >
                    ›
                  </button>
                </div>
              </div>

              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center transition-colors duration-200"
              >
                <HiX size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}