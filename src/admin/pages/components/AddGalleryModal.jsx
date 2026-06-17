import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { Upload, ImageIcon, X, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Bike } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const INPUT_CLS =
  "w-full rounded-xl border border-orange-500/10 bg-[#111111] px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-orange-500 transition-colors text-sm sm:text-base";

const CATEGORIES = [
  { value: "radium-art",      label: "Radium Art" },
  { value: "graphics",        label: "Graphics" },
  { value: "customize-bikes", label: "Customize Bikes" },
  { value: "vehicle-touchup", label: "Vehicle Touch-Up" },
  { value: "custom-designs",  label: "Custom Designs" },
];

const INITIAL_FORM = { title: "", category: "customize-bikes", label: "" };

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ type, message }) {
  if (!message) return null;
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
        isSuccess
          ? "bg-green-500/10 border border-green-500/30 text-green-400"
          : "bg-red-500/10 border border-red-500/30 text-red-400"
      }`}
    >
      {isSuccess ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

// ─── FileField ───────────────────────────────────────────────────────────────

function FileField({ label, multiple = false, onChange, hasError }) {
  return (
    <label
      className={`
        group relative flex flex-col items-center justify-center gap-2 sm:gap-3
        p-5 sm:p-8 rounded-2xl border border-dashed cursor-pointer overflow-hidden
        transition-all duration-300
        ${
          hasError
            ? "border-red-500/60 bg-red-500/5"
            : "border-orange-500/20 bg-[#111111] hover:border-orange-500/60 hover:shadow-[0_0_25px_rgba(255,106,0,0.15)]"
        }
      `}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,106,0,0.08), transparent 70%)",
        }}
      />

      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Upload size={22} className="text-orange-500 sm:hidden" />
        <Upload size={26} className="text-orange-500 hidden sm:block" />
      </div>

      <div className="text-center">
        <p className="text-white font-semibold text-sm sm:text-base leading-snug">{label}</p>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">Click to browse images</p>
      </div>

      <input
        type="file"
        multiple={multiple}
        accept="image/jpeg,image/png,image/webp"
        onChange={onChange}
        className="hidden"
      />

      <div className="flex gap-2 items-center">
        <ImageIcon size={14} className="text-orange-500 sm:hidden" />
        <ImageIcon size={18} className="text-orange-500 hidden sm:block" />
        <span className="text-xs text-gray-500">JPG, PNG, WEBP</span>
      </div>
    </label>
  );
}

// ─── Loading Overlay ──────────────────────────────────────────────────────────

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="relative w-70 h-30 overflow-hidden">
        {/* Road */}
        <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-zinc-700" />
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
        Uploading Project...
      </motion.p>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
<div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4">      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CheckCircle size={72} className="text-green-400" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white text-xl font-semibold"
      >
        Project Uploaded!
      </motion.p>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function AddGalleryModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm]           = useState(INITIAL_FORM);
  const [thumbnail, setThumbnail] = useState(null);
  const [variants, setVariants]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [uploaded, setUploaded]   = useState(false);
  const [toast, setToast]         = useState({ type: "", message: "" });
  const [errors, setErrors]       = useState({});

  

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
  if (!uploaded) return;

  const timer = setTimeout(() => {
    resetModal();
    onClose();
  }, 1400);

  return () => clearTimeout(timer);
}, [uploaded]);

  // Reset state when modal opens
  const resetModal = () => {
  setForm(INITIAL_FORM);
  setThumbnail(null);
  setVariants([]);
  setToast({ type: "", message: "" });
  setErrors({});
  setUploaded(false);
  setLoading(false);
};

  const handleChange = useCallback(
    (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
    []
  );

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title     = true;
    if (!form.label.trim()) next.label     = true;
    if (!thumbnail)         next.thumbnail = true;
    if (!variants.length)   next.variants  = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setToast({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    formData.append("thumbnail", thumbnail);
    variants.forEach((file) => formData.append("variants", file));

    setLoading(true);
    setToast({ type: "", message: "" });

    try {
      await api.post("/gallery", formData);
      onSuccess?.();
      setLoading(false);
      setUploaded(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setToast({ type: "error", message: "Upload failed. Please try again." });
    }
  };

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    resetModal();
    onClose();
  }
};

  if (!isOpen) return null;

  // ── Overlay states (rendered outside the modal box, above everything) ──
  if (loading)  return <LoadingOverlay />;
  if (uploaded) return <SuccessScreen />;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[95dvh] flex flex-col rounded-2xl sm:rounded-3xl border border-orange-500/20 bg-[#181818] shadow-[0_0_40px_rgba(249,115,22,0.15)] overflow-hidden">

        {/* Glow accent */}
        <div
          className="absolute -top-20 -left-20 w-56 h-56 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ff6a00 0%, transparent 70%)" }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={() => {
  resetModal();
  onClose();
}}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto scrollbar-hide flex-1 p-5 sm:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8 pr-8">
            <p className="text-orange-500 uppercase tracking-[0.2em] text-xs font-bold mb-2 sm:mb-3">
              MadhavArt CMS
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
              Add New Project
            </h2>
            <p className="text-gray-400 text-sm">Upload a new customization project.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
            <input
              type="text"
              placeholder="Project Title *"
              value={form.title}
              onChange={handleChange("title")}
              className={`${INPUT_CLS} ${errors.title ? "border-red-500/60" : ""}`}
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
              placeholder="Label *"
              value={form.label}
              onChange={handleChange("label")}
              className={`${INPUT_CLS} ${errors.label ? "border-red-500/60" : ""}`}
            />

            <FileField
              label={thumbnail ? thumbnail.name : "Thumbnail Image *"}
              onChange={(e) => {
                setThumbnail(e.target.files[0] ?? null);
                setErrors((prev) => {
  const rest = { ...prev };
  delete rest.thumbnail;
  return rest;
});
              }}
              hasError={!!errors.thumbnail}
            />

            <FileField
              label={
                variants.length
                  ? `${variants.length} Image${variants.length > 1 ? "s" : ""} Selected`
                  : "Variant Images *"
              }
              multiple
              onChange={(e) => {
                setVariants(Array.from(e.target.files));
                setErrors((prev) => {
  const rest = { ...prev };
  delete rest.variants;
  return rest;
});
              }}
              hasError={!!errors.variants}
            />

            {toast.message && <Toast type={toast.type} message={toast.message} />}

            <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-1">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-500/90 py-3 font-semibold text-white transition-all text-sm sm:text-base"
              >
                Upload Project
              </button>
             <button
  type="button"
  onClick={() => {
    resetModal();
    onClose();
  }}
>
  Cancel
</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}