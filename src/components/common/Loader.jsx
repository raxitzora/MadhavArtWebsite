import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CircleCheckBig } from "lucide-react";

// ─── Realistic Motorcycle SVG ─────────────────────────────────────────────────
const RealisticMotorcycleSVG = ({
  prepProgress = 0,
  paintProgress = 0,
  scene,
  decalProgress = 0,
  shineProgress = 0
}) => {
  const paintClipId = "madhav-paint-clip";

  return (
    <svg
      viewBox="0 0 660 350"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-160"
      style={{
        filter:
          scene >= 5
            ? "drop-shadow(0 0 32px #f9731680) drop-shadow(0 4px 20px #00000099)"
            : "drop-shadow(0 4px 16px #00000080)",
        transition: "filter 0.8s ease",
      }}
    >
      <defs>
        <filter id="silverPrep">
  <feColorMatrix
    type="matrix"
    values="
      0.3 0.3 0.3 0 0
      0.3 0.3 0.3 0 0
      0.3 0.3 0.3 0 0
      0   0   0   1 0"
  />
</filter>
        {/* Paint reveal clip — sweeps left to right */}
       <clipPath id="prepClip">
  <rect
    x="0"
    y="0"
    width={660 * prepProgress}
    height="350"
  />
</clipPath>

<clipPath id={paintClipId}>
  <rect
    x="0"
    y={350 - 350 * paintProgress}
    width="660"
    height={350 * paintProgress}
  />
</clipPath>

<linearGradient id="prepGreyGrad" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#9ca3af" />
  <stop offset="50%" stopColor="#6b7280" />
  <stop offset="100%" stopColor="#374151" />
</linearGradient>
        {/* Orange paint gradient — premium MadhavArt */}
        <linearGradient id="orangePaintGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>

        {/* Chrome shine sweep */}
        <linearGradient id="madhavShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset={`${Math.max(0, shineProgress * 100 - 10)}%`} stopColor="#ffffff" stopOpacity="0" />
          <stop offset={`${shineProgress * 100}%`} stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset={`${Math.min(100, shineProgress * 100 + 10)}%`} stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Headlight glow */}
        <radialGradient id="headlightGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef9c3" stopOpacity={scene >= 5 ? "1" : "0"} />
          <stop offset="50%" stopColor="#f97316" stopOpacity={scene >= 5 ? "0.65" : "0"} />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>

        {/* Ambient glow scene 5 */}
        <radialGradient id="bikeGlowGrad" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#f97316" stopOpacity={scene >= 5 ? "0.2" : "0"} />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>

        {/* White decal sheen */}
        <linearGradient id="decalSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e2e2" />
        </linearGradient>
      </defs>

      {/* ── AMBIENT GLOW (scene 5+) ── */}
      <ellipse cx="330" cy="310" rx="310" ry="70" fill="url(#bikeGlowGrad)" />

      {/* ── BASE LAYER: dark matte gray ── */}
      <image
  href="/assets/bike.svg"
  x="0"
  y="0"
  width="660"
  height="350"
/>
      

      

{/* PREPARATION GREY LAYER */}
{/* PREPARATION GREY LAYER */}
<g clipPath="url(#prepClip)">
  <image
    href="/assets/bike-silver.svg"
    x="0"
    y="0"
    width="660"
    height="350"
    style={{
      filter:
        "grayscale(1) brightness(1.35) contrast(1.15)"
    }}
  />
</g>


      {/* ── ORANGE PAINT LAYER (clip-revealed) ── */}
      <g clipPath={`url(#${paintClipId})`}>
  <image
    href="/assets/bike.svg"
    x="0"
    y="0"
    width="660"
    height="350"
    style={{
      filter:
        "sepia(1) saturate(8) hue-rotate(-15deg) brightness(1.1)"
    }}
  />
  
  
</g>
  

      {/* ── DECALS (scene 4+) ── */}
      {scene >= 4 && (
       <g>
  {/* Moving application strip */}
<motion.rect
  x={295 - decalProgress * 140}
  y={118}
  width={220}
  height={40}
  fill="#ffffff"
  opacity="0.45"
/>

  {/* Sticker reveal */}
  <g
    style={{
      clipPath: `inset(0 0 0 ${100 - decalProgress * 100}%)`
    }}
  >
    <rect
      x="295"
      y="120"
      width="130"
      height="24"
      rx="3"
      fill="#000000"
      opacity="0.22"
    />

    <text
      x="360"
      y="145"
      textAnchor="middle"
      fontSize="18"
      fontWeight="900"
      letterSpacing="4"
fill="#ffffff"    >
      MADHAVART
    </text>
  </g>
</g>
      )}

      {/* ── CHROME SHINE SWEEP (scene 5+) ── */}
      {scene >= 5 && shineProgress < 1.15 && (
        <rect x="0" y="0" width="660" height="350" fill="url(#madhavShine)" opacity="0.75" />
      )}

      {/* ── HEADLIGHT CONE (scene 5+) ── */}
      {scene >= 5 && (
        <>
          {/* Headlight source */}
          <ellipse cx="88" cy="198" rx="22" ry="18" fill="url(#headlightGrad)" />
          {/* Light cone */}
          <path
            d="M 68 195 L 0 170 L 0 230 Z"
            fill="#fef9c3"
            opacity={scene >= 5 ? "0.15" : "0"}
            style={{ transition: "opacity 0.6s ease" }}
          />
        </>
      )}
    </svg>
  );
};

// ─── Scene Label ─────────────────────────────────────────────────────────────
const SceneLabel = ({ line1, line2, visible }) => (
  <AnimatePresence mode="wait">
    {visible && (
      <motion.div
        key={`${line1}-${line2}`}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center select-none pointer-events-none"
        initial={{ opacity: 0, y: 20, clipPath: "inset(100% 0 0 0)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
        exit={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[14px] sm:text-[16px] tracking-[0.35em] text-orange-400 font-medium uppercase mb-2">{line1}</p>
        <p className="text-[20px] sm:text-[26px] tracking-[0.18em] text-white/80 font-medium uppercase">{line2}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Particles ────────────────────────────────────────────────────────────────
const Particles = ({ active }) => {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i, cx: 15 + (i * 41 % 70), cy: 15 + (i * 53 % 70),
    r: 0.8 + (i % 3) * 0.5, dur: 1.2 + (i % 3) * 0.4, delay: (i * 0.13) % 1,
  }));
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full opacity-40">
        {particles.map(p => (
          <motion.circle key={p.id} cx={`${p.cx}%`} cy={`${p.cy}%`} r={p.r} fill="#f97316"
            animate={{ opacity: [0, 0.8, 0], y: [0, -20, -40] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </svg>
    </div>
  );
};

// ─── Loader ───────────────────────────────────────────────────────────────────
export default function Loader({ onComplete }) {
  const [scene, setScene] = useState(0);
  const [paintProgress, setPaintProgress] = useState(0);
  const [prepProgress, setPrepProgress] = useState(0);

  const [decalProgress, setDecalProgress] = useState(0);
  const [shineProgress, setShineProgress] = useState(0);
  const [bikeExiting, setBikeExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const TOTAL = 5000;
const sceneBreaks = [
  0,     // Intro
  0,
  1000,  // Cleaning
  2200,  // Painting
  3400,  // Graphics
  4300,  // Ready
  4800   // Exit
];
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;

      let s = 0;
      for (let i = sceneBreaks.length - 1; i >= 0; i--) {
        if (elapsed >= sceneBreaks[i]) { s = i; break; }
      }
      setScene(s);

      // Paint (scene 3: 2000–3000ms)
if (elapsed >= 1000 && elapsed < 2200)
  setPrepProgress((elapsed - 1000) / 1200);
else if (elapsed >= 2200)
  setPrepProgress(1);

      // Decal (scene 4: 3200–4000ms, delayed start for drama)
if (elapsed >= 2200 && elapsed < 3400)
  setPaintProgress((elapsed - 2200) / 1200);
else if (elapsed >= 3400)
  setPaintProgress(1);

if (elapsed >= 3400 && elapsed < 4300)
  setDecalProgress((elapsed - 3400) / 900);
else if (elapsed >= 4300)
  setDecalProgress(1);

      // Shine sweep (scene 5: 4000–5000ms)
  if (elapsed >= 3800 && elapsed < 4600)
  setShineProgress((elapsed - 3800) / 800);
else if (elapsed >= 4600)
  setShineProgress(1.2);// past edge = done

      // Bike exit (5000ms+)
      if (elapsed >= 4700 && !bikeExiting)
  setBikeExiting(true);

      if (elapsed < TOTAL) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        setTimeout(() => onComplete?.(), 250);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [bikeExiting, onComplete]);

  const sceneLabels = {
    1: { line1: "Step 01", line2: "Welcome to Madhavart" },
    2: { line1: "Step 02", line2: "Cleaning & Preparation" },
    3: { line1: "Step 03", line2: "Custom Painting" },
    4: { line1: "Step 04", line2: "Custom Graphics" },
    5: { line1: "Step 05", line2: "Vehicle Ready" },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 bg-[#090909] overflow-hidden flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          {/* ── SCENE 1: MADHAVART INTRO ── */}
          <AnimatePresence>
            {scene === 1 && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none"
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute w-1 h-1 rounded-full bg-orange-500"
                  style={{ top: "50%", left: "50%" }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: [1, 60, 0], opacity: [1, 0.4, 0] }}
                  transition={{ duration: 0.7, ease: [0.2, 0, 0.8, 1] }}
                />
                <div className="relative text-center overflow-hidden px-6">
                  <motion.p className="text-[10px] sm:text-xs tracking-[0.5em] text-orange-500 font-light uppercase mb-4"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    WELCOME TO
                  </motion.p>
                  <div className="overflow-hidden">
                    <motion.h1
                      className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white leading-none"
                      style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
                      initial={{ y: "100%", clipPath: "inset(0 0 100% 0)" }}
                      animate={{ y: "0%", clipPath: "inset(0 0 0% 0)" }}
                      transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >MADHAV</motion.h1>
                  </div>
                  <div className="overflow-hidden">
                    <motion.h1
                      className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none"
                      style={{ fontFamily: "'Arial Black', 'Impact', sans-serif", WebkitTextStroke: "2px #f97316", color: "transparent" }}
                      initial={{ y: "100%", clipPath: "inset(0 0 100% 0)" }}
                      animate={{ y: "0%", clipPath: "inset(0 0 0% 0)" }}
                      transition={{ delay: 0.5, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >ART</motion.h1>
                  </div>
                  <motion.div className="h-0.5 bg-linear-to-r from-transparent via-orange-500 to-transparent mt-4"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }} />
                </div>
                <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-orange-500/50" />
                <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-orange-500/50" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-orange-500/50" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-orange-500/50" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── SCENES 2–6: MOTORCYCLE STAGE ── */}
          {scene >= 2 && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Ceiling spotlights */}
              <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none">
                {[0, 1, 2, 3].map(i => (
                  <motion.div key={i} className="flex flex-col items-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}>
                    <div className="w-px h-6 bg-orange-500/30" />
                    <div className="w-16 h-1 bg-orange-500/20 rounded" />
                    <motion.div className="w-12 h-24 rounded-b-full"
                      style={{ background: "radial-gradient(ellipse at top, #f9731618 0%, transparent 80%)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
                  </motion.div>
                ))}
              </div>

              {/* Motorcycle — exits right on scene 6 */}
              <motion.div
                className="w-full max-w-125 sm:max-w-150 relative"
                animate={
                  scene >= 6
                    ? { x: ["0%", "5%", "15%", "50%", "180%"],
 rotate: [0, 0, -1, -3, -6], opacity: [1, 1, 0] }
                    : { x: 0, rotate: 0, opacity: 1 }
                }
                transition={
                  scene >= 6
                    ? { duration: 2.2, ease: [0.22, 1, 0.36, 1], opacity: { times: [0, 0.55, 1] } }
                    : {}
                }
              >
                {/* Scene 2: Surface wipe */}
                {scene === 2 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(210,210,210,0.07) 50%, transparent 100%)" }}
                    animate={{ x: [-200, 680] }}
                    transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
                  />
                )}
                {/* Scene 3: Paint roller warmth */}
                {scene === 3 && paintProgress < 1 && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.2) 50%, transparent 100%)",
                      left: `${paintProgress * 100 - 15}%`,
                      width: "15%",
                    }}
                  />
                )}
                {/* Scene 4: Vinyl flash */}
                {scene === 4 && decalProgress < 0.25 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.18, 0] }}
                    transition={{ duration: 0.45, times: [0, 0.4, 1] }}
                    style={{ background: "radial-gradient(ellipse at center, #ffffff14 0%, transparent 70%)" }}
                  />
                )}

               <RealisticMotorcycleSVG
  prepProgress={prepProgress}
  paintProgress={paintProgress}
  scene={scene}
  decalProgress={decalProgress}
  shineProgress={shineProgress}
/>

                {/* Scene 5: Check */}
                {scene >= 5 && scene < 6 && (
                  <motion.div
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <CircleCheckBig size={20} className="text-orange-500" />
                    <span className="text-xs tracking-[0.3em] text-orange-400 uppercase font-medium">
                      Inspection Complete
                    </span>
                  </motion.div>
                )}
              </motion.div>

              {/* Exit speed lines */}
              {scene >= 6 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i}
                      className="absolute h-px"
                      style={{
                        top: `${25 + i * 7}%`,
                        left: 0,
                        width: `${40 + i * 5}%`,
                        background: "linear-gradient(90deg, rgba(249,115,22,0.5) 0%, transparent 100%)",
                      }}
                      initial={{ scaleX: 0, opacity: 0, transformOrigin: "left" }}
                      animate={{ scaleX: 1, opacity: [0, 0.7, 0] }}
                      transition={{ duration: 0.7, delay: i * 0.035, ease: "easeOut" }}
                    />
                  ))}
                </div>
              )}

              {/* Floor line */}
              <div className="absolute bottom-20 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />

              <Particles active={scene === 5} />
            </motion.div>
          )}

          {/* Scene labels */}
          {Object.entries(sceneLabels).map(([s, label]) => (
            <SceneLabel key={s} {...label} visible={scene === Number(s)} />
          ))}

          {/* Progress bar */}
          {scene >= 1 && scene <= 5 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <motion.div key={s} className="h-0.5 rounded-full"
                  animate={{ backgroundColor: s <= scene ? "#f97316" : "#2a2a2a", width: s === scene ? 24 : 8 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          )}

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 100%, #f9731608 0%, transparent 70%)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}