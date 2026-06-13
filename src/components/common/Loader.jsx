import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Easing curves ─────────────────────────────────────────────────────────────
const E_OUT   = [0.25, 0.46, 0.45, 0.94];
const E_EXPO  = [0.16, 1, 0.3, 1];

// ─── Spark particle config ─────────────────────────────────────────────────────
const SPARKS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i / 12) * 360,
  distance: 55 + (i % 3) * 18,
  delay: (i / 12) * 0.4,
  size: i % 3 === 0 ? 3 : 2,
}));

// ─── Loading steps ─────────────────────────────────────────────────────────────
const STEPS = [
  "Warming up the workshop…",
  "Loading your designs…",
  "Applying the finishing coat…",
  "Ready to roll.",
];

export default function Loader({ onComplete }) {
  const [progress, setProgress]     = useState(0);
  const [stepIndex, setStepIndex]   = useState(0);
  const [sparksOn, setSparksOn]     = useState(false);
  const [exiting, setExiting]       = useState(false);

  // ── Drive progress bar over 3.4s, sparks fire at 60% ─────────────────────────
  useEffect(() => {
    const start = performance.now();
    const DURATION = 3400;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(Math.round(p * 100));

      // Step label: update at 0%, 30%, 65%, 95%
      if (p >= 0.95)      setStepIndex(3);
      else if (p >= 0.65) setStepIndex(2);
      else if (p >= 0.30) setStepIndex(1);
      else                setStepIndex(0);

      if (p >= 0.6) setSparksOn(true);

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        // Short pause, then fade out
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onComplete?.(), 600);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: E_OUT } }}
          className="fixed inset-0 z-[9999] bg-[#0e0e0e] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* ── Ambient radial glow – static, cheap ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(255,106,0,0.10) 0%, transparent 70%)",
            }}
          />

          {/* ── Horizontal scan line that sweeps once ── */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0, opacity: 0.18 }}
            animate={{ scaleX: 1, opacity: [0.18, 0.08, 0] }}
            transition={{ duration: 1.8, ease: E_EXPO, delay: 0.2 }}
            style={{ originX: 0 }}
            className="pointer-events-none absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />

          {/* ── Central content ── */}
          <div className="relative flex flex-col items-center gap-10 px-6">

            {/* Logo mark + spark ring */}
            <div className="relative flex items-center justify-center">

              {/* Spark particles – appear at 60% progress */}
              <AnimatePresence>
                {sparksOn && SPARKS.map((s) => (
                  <motion.span
                    key={s.id}
                    aria-hidden
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale:   [0, 1, 0.4],
                      x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
                      y: Math.sin((s.angle * Math.PI) / 180) * s.distance,
                    }}
                    transition={{
                      duration: 0.9,
                      ease: E_EXPO,
                      delay: s.delay * 0.2,
                      repeat: Infinity,
                      repeatDelay: 0.7,
                    }}
                    className="absolute rounded-full bg-orange-400"
                    style={{ width: s.size, height: s.size }}
                  />
                ))}
              </AnimatePresence>

              {/* Outer ring – slow rotation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                aria-hidden
                className="absolute w-28 h-28 rounded-full"
                style={{
                  border: "1px solid rgba(249,115,22,0.15)",
                  borderTopColor: "rgba(249,115,22,0.7)",
                  borderRightColor: "rgba(249,115,22,0.35)",
                }}
              />

              {/* Inner ring – counter-rotation */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                aria-hidden
                className="absolute w-20 h-20 rounded-full"
                style={{
                  border: "1px dashed rgba(249,115,22,0.2)",
                  borderTopColor: "rgba(249,115,22,0.5)",
                }}
              />

              {/* Logo box */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: E_EXPO, delay: 0.1 }}
                className="relative z-10 w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-orange-500/25 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.12)]"
              >
                {/* M letter mark */}
                <span
                  className="font-bebas text-3xl text-orange-500 leading-none select-none"
                  style={{ letterSpacing: "0.02em" }}
                >
                  M
                </span>

                {/* Tiny corner accents */}
                <span aria-hidden className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-orange-500/60 rounded-tl" />
                <span aria-hidden className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-orange-500/60 rounded-tr" />
                <span aria-hidden className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-orange-500/60 rounded-bl" />
                <span aria-hidden className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-orange-500/60 rounded-br" />
              </motion.div>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: E_OUT, delay: 0.25 }}
              className="flex flex-col items-center gap-1"
            >
              <h1
                className="font-bebas text-5xl sm:text-6xl tracking-[0.12em] text-white leading-none select-none"
              >
                MADHAV<span className="text-orange-500">ART</span>
              </h1>
              <p className="text-[10px] tracking-[0.35em] uppercase text-gray-500 font-medium">
                Vehicle Customization Workshop
              </p>
            </motion.div>

            {/* Progress bar + percentage */}
            <div className="w-64 sm:w-80 flex flex-col gap-2.5">
              {/* Track */}
              <div className="relative w-full h-[3px] rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #ff8c42, #ffb703)",
                    boxShadow: "0 0 8px rgba(249,115,22,0.55)",
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                {/* Shimmer dot at leading edge */}
                <motion.div
                  aria-hidden
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-300"
                  style={{ left: `calc(${progress}% - 3px)` }}
                />
              </div>

              {/* Label row */}
              <div className="flex items-center justify-between">
                {/* Animated step label */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stepIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25, ease: E_OUT }}
                    className="text-[11px] text-gray-500 tracking-wide"
                  >
                    {STEPS[stepIndex]}
                  </motion.p>
                </AnimatePresence>

                {/* Percentage */}
                <span className="text-[11px] font-bold text-orange-500 tabular-nums">
                  {progress}%
                </span>
              </div>
            </div>

          </div>

          {/* ── Bottom tagline ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: E_OUT, delay: 0.5 }}
            className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase text-gray-600 select-none"
          >
            Every ride, a rolling masterpiece.
          </motion.p>

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}