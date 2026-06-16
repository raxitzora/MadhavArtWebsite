import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { motion } from "motion/react";
import { Bike, CheckCircle2, X } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: "radium-art",      label: "Radium Art" },
  { value: "graphics",        label: "Graphics" },
  { value: "customize-bikes", label: "Customize Bikes" },
  { value: "vehicle-touchup", label: "Vehicle Touch-Up" },
  { value: "custom-designs",  label: "Custom Designs" },
];

const INPUT_CLS =
  "w-full rounded-xl border border-orange-500/10 bg-[#111111] px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-orange-500 transition-colors text-sm sm:text-base";

// ─── Loading Overlay ──────────────────────────────────────────────────────────

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center">
      <div className="relative w-[280px] h-[120px] overflow-hidden">
        {/* Road */}
        <div className="absolute bottom-6 left-0 right-0 h-[2px] bg-zinc-700" />
        {/* Bike */}
        <motion.div
          animate={{ x: ["-30%", "110%"] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          className="absolute bottom-3"
        >
          <Bike size={70} className="text-orange-500" />
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="text-white text-xl font-semibold mt-6"
      >
        Updating Project...
      </motion.p>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-4"
      >
        <CheckCircle2 size={90} className="text-green-500" />
        <h2 className="text-white text-2xl font-bold">Project Updated</h2>
      </motion.div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function EditGalleryModal({ isOpen, onClose, item, onSuccess }) {
  const [form, setForm]       = useState({ title: "", category: "", label: "" });
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  // Sync form when item changes
  useEffect(() => {
    if (item) {
      setForm({ title: item.title, category: item.category, label: item.label });
    }
  }, [item]);

  // Reset overlay states when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(false);
      setUpdated(false);
    }
  }, [isOpen]);

  const handleChange = useCallback(
    (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/gallery/${item._id}`, form);
      onSuccess?.();
      setLoading(false);
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
        onClose();
      }, 1200);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Update Failed");
    }
  };

  // ── Overlay states must come after all hooks ──
  if (loading)  return <LoadingOverlay />;
  if (updated)  return <SuccessScreen />;
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl border border-orange-500/20 bg-[#181818] p-6 sm:p-8 shadow-[0_0_40px_rgba(249,115,22,0.15)] overflow-hidden">

        {/* Glow */}
        <div
          className="absolute -top-20 -left-20 w-56 h-56 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ff6a00 0%, transparent 70%)" }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <p className="text-orange-500 uppercase tracking-[0.2em] text-xs font-bold mb-3">
          MadhavArt CMS
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Edit Project</h2>
        <p className="text-gray-400 text-sm mb-8">Update project information.</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange("title")}
            className={INPUT_CLS}
          />

          <select
            value={form.category}
            onChange={handleChange("category")}
            className={INPUT_CLS}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-[#111111]">
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Label"
            value={form.label}
            onChange={handleChange("label")}
            className={INPUT_CLS}
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-500/90 py-3 font-semibold text-white transition-all text-sm sm:text-base"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-orange-500/20 bg-[#111111] py-3 font-semibold text-white hover:border-orange-500/40 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}