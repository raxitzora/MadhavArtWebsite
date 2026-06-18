import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { HiX, HiOutlineArrowRight } from "react-icons/hi";
import { MdFilterList } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";



const E = [0.25, 0.46, 0.45, 0.94];

// ─── Lightweight grid item variant ───────────────────────────────────────────
// Only opacity — NO scale/y on 20 items. Scale on many items = heavy compositor work.
const gridItem = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
};

export default function GalleryImages() {


  const [imageLoading, setImageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox,  setLightbox]  = useState(null);
const [selectedVariant, setSelectedVariant] = useState(0);
const [allItems, setAllItems] = useState([]);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
    const TABS = [
  {
    key: "all",
    label: "All Work",
    count: allItems.length,
  },
  {
    key: "radium-art",
    label: "Radium Art",
    count: allItems.filter(
      (i) => i.cat === "radium-art"
    ).length,
  },
  {
    key: "graphics",
    label: "Graphics",
    count: allItems.filter(
      (i) => i.cat === "graphics"
    ).length,
  },
  {
    key: "customize-bikes",
    label: "Customize Bikes",
    count: allItems.filter(
      (i) => i.cat === "customize-bikes"
    ).length,
  },
  {
    key: "vehicle-touchup",
    label: "Vehicle Touch-Up",
    count: allItems.filter(
      (i) => i.cat === "vehicle-touchup"
    ).length,
  },
  {
    key: "custom-designs",
    label: "Custom Designs",
    count: allItems.filter(
      (i) => i.cat === "custom-designs"
    ).length,
  },
];



useEffect(() => {
  if (lightbox) {
    setImageLoading(true);
  }
}, [lightbox, selectedVariant]);

useEffect(() => {
  const fetchGallery = async () => {
    try {
      const res = await axios.get(
        "https://madhavartbackend.onrender.com/api/gallery",
      );
    

      const formattedData =
        res.data.data.map((item) => ({
          id: item._id,
          cat: item.category,
        img: item.thumbnail.url.replace(
  "/upload/",
  "/upload/f_auto,q_auto,w_600,c_fill/"
),

fullImg: item.thumbnail.url.replace(
  "/upload/",
  "/upload/f_auto,q_auto,w_1400/"
),
          title: item.title,
          label: item.label,
          variants:
            item.variants?.map(
              (v) => v.url.replace(
  "/upload/",
  "/upload/f_auto,q_auto,w_900/"
)
            ) || [],
        }));

      setAllItems(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchGallery();
  
}, []);

 useEffect(() => {
  if (!lightbox) return;

  const currentIndex = items.findIndex(
    (i) => i.id === lightbox.id
  );
  
  

  const nextItem =
    items[(currentIndex + 1) % items.length];

  const prevItem =
    items[
      (currentIndex - 1 + items.length) %
      items.length
    ];

  [nextItem, prevItem].forEach((item) => {
    if (!item) return;

    const img = new Image();
    img.src = item.fullImg;

    item.variants?.forEach((url) => {
      const v = new Image();
      v.src = url;
    });
  });
}, [lightbox]);
const items =
  activeTab === "all"
    ? allItems
    : allItems.filter(
        (i) => i.cat === activeTab
      );

const navigateLightbox = (dir) => {
  setImageLoading(true);

  const currentGalleryIndex =
    items.findIndex(
      (i) => i.id === lightbox.id
    );

  const totalVariants =
    lightbox.variants?.length || 0;

  if (dir === 1) {

    if (
      selectedVariant <
      totalVariants
    ) {
      setSelectedVariant(
        prev => prev + 1
      );
      return;
    }

    const nextGalleryIndex =
      (currentGalleryIndex + 1) %
      items.length;

    setLightbox(
      items[nextGalleryIndex]
    );

    setSelectedVariant(0);

    return;
  }

  if (dir === -1) {

    if (selectedVariant > 0) {
      setSelectedVariant(
        prev => prev - 1
      );
      return;
    }

    const prevGalleryIndex =
      (currentGalleryIndex - 1 +
        items.length) %
      items.length;

    const previousItem =
      items[prevGalleryIndex];

    setLightbox(previousItem);

    setSelectedVariant(
      previousItem.variants.length
    );
  }
};

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
  <motion.div
  layout
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-5
"
>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={gridItem}
              initial="hidden"
              animate="show"
              exit="exit"
             onClick={() => {
  setImageLoading(true);
  setLightbox(item);
  setSelectedVariant(0);
}}
              className="
relative
group
cursor-pointer
overflow-hidden
rounded-xl
bg-[#1a1a1a]
border
border-white/5
"
            >
           <img
  src={item.img}
  alt={item.title}
  loading={
  items.indexOf(item) < 4
    ? "eager"
    : "lazy"
}
  decoding="async"
  className="
w-full
aspect-[4/2.8]
object-cover
transition-transform
duration-500
group-hover:scale-[1.02]
"
  onError={(e) => {
    e.target.style.opacity = "0.3";
  }}
/>

              {/* Hover overlay — pure CSS, zero JS cost */}
<div
  className="
  flex
  items-center
  justify-between
  p-4
  bg-[#151515]
"
>
  <div className="min-w-0">
    <p className="text-orange-500 text-[11px] font-bold uppercase tracking-[0.18em]">
      {item.label}
    </p>

    <h3 className="text-white text-lg font-semibold truncate mt-1">
      {item.title}
    </h3>
  </div>

  <div
    className="
    shrink-0
    ml-4
    w-10
    h-10
    rounded-lg
    border
    border-white/10
    flex
    items-center
    justify-center
    text-white
    transition-all
    duration-300
    group-hover:border-orange-500
    group-hover:text-orange-500
    "
  >
    <HiOutlineArrowRight
      size={18}
      className="-rotate-45"
    />
  </div>
</div>
            </motion.div>
          ))}
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

<>
 <div
  className="
  relative
  w-full
min-h-62.5 sm:min-h-87.5 lg:min-h-112.5  flex
  items-center
  justify-center
  "
>
 {imageLoading && (
  <div
    className="
    absolute
    inset-0
    rounded-2xl
    overflow-hidden
    bg-zinc-800
    animate-pulse
    "
  >
    <div
      className="
      absolute
      inset-0
      bg-linear-to-r
      from-transparent
      via-white/5
      to-transparent
      animate-[shimmer_1.5s_infinite]
      "
    />
  </div>
)}

  <img
    src={
      selectedVariant === 0
        ? lightbox.fullImg
        : lightbox.variants[selectedVariant - 1]
    }
    alt={lightbox.title}
    onLoad={() => setImageLoading(false)}
    onError={() => setImageLoading(false)}
    className={`
      w-full
      max-h-[75vh]
      object-contain
      rounded-2xl
      transition-opacity
      duration-300
      ${
        imageLoading
          ? "opacity-0"
          : "opacity-100"
      }
    `}
  />
</div>
</>

   


              <div className="flex items-center justify-between mt-3 px-1">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-orange-500 uppercase">
                    {lightbox.label}
                  </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">{lightbox.title}</h2>
                </div>

  <motion.button
  whileHover={{
    scale: 1.12,
    x: -4,
  }}
  whileTap={{
    scale: 0.92,
  }}
  transition={{
    duration: 0.2,
  }}
  onClick={() =>
    navigateLightbox(-1)
  }
  className="
  absolute
  left-4
  top-1/2
  -translate-y-1/2
  w-12
  h-12
  rounded-full
  bg-black/60
  backdrop-blur-md
  border
  border-white/10
  text-white
  text-3xl
  hover:border-orange-500/50
"
>
  ‹
</motion.button>

<motion.button
  whileHover={{
    scale: 1.12,
    x: 4,
  }}
  whileTap={{
    scale: 0.92,
  }}
  transition={{
    duration: 0.2,
  }}
  onClick={() =>
    navigateLightbox(1)
  }
  className="
  absolute
  right-4
  top-1/2
  -translate-y-1/2
  w-12
  h-12
  rounded-full
  bg-black/60
shadow-[0_0_25px_rgba(249,115,22,0.15)]
  backdrop-blur-md
  border
  border-white/10
  text-white
  text-3xl
  hover:border-orange-500/50
"
>
  ›
</motion.button>
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