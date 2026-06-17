import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Bike } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import AddGalleryModal from "./components/AddGalleryModal";
import EditGalleryModal from "./components/EditGalleryModal";
import api from "./services/api";

// ─── Loading Overlay ──────────────────────────────────────────────────────────

function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="relative w-70 h-30 overflow-hidden">
        <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-zinc-700" />
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
        {message}
      </motion.p>
    </div>
  );
}





// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [deleting, setDeleting]         = useState(false);
  const [modal, setModal]               = useState({ type: null, item: null });
const [activeFilter, setActiveFilter] =
  useState("all");


const getCount = (category) => {
  if (category === "all")
    return galleryItems.length;

  return galleryItems.filter(
    (item) =>
      item.category === category
  ).length;
};

const filteredItems =
  activeFilter === "all"
    ? galleryItems
    : galleryItems.filter(
        (item) =>
          item.category === activeFilter
      );


  const openModal  = (type, item = null) => setModal({ type, item });
  const closeModal = () => setModal({ type: null, item: null });

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");
      setGalleryItems(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery item?")) return;
    setDeleting(true);
    try {
      await api.delete(`/gallery/${id}`);
      setGalleryItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Project deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  useEffect(() => {
  let mounted = true;

  const loadGallery = async () => {
    try {
      const res = await api.get("/gallery");

      if (mounted) {
        setGalleryItems(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch gallery");
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  loadGallery();

  return () => {
    mounted = false;
  };
}, []);
const FILTERS = [
  {
    label: "All Work",
    value: "all",
  },
  {
    label: "Radium Art",
    value: "radium-art",
  },
  {
    label: "Graphics",
    value: "graphics",
  },
  {
    label: "Customize Bikes",
    value: "customize-bikes",
  },
  {
    label: "Vehicle Touch-Up",
    value: "vehicle-touchup",
  },
  {
    label: "Custom Designs",
    value: "custom-designs",
  },
];


  return (
    <div className="min-h-screen bg-[#111111] text-white px-4 sm:px-8 lg:px-14 py-10">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#181818",
            color: "#fff",
            border: "1px solid rgba(249,115,22,.2)",
          },
        }}
      />

      {deleting && <LoadingOverlay message="Deleting Project..." />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold">MadhavArt Admin</h1>
        <div className="flex gap-3">
          <button
            onClick={() => openModal("add")}
            className="bg-orange-500 hover:bg-orange-500/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Image
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-600/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-8">
  {FILTERS.map((filter) => (
    <button
      key={filter.value}
      onClick={() =>
        setActiveFilter(filter.value)
      }
      className={`
        whitespace-nowrap
        px-5 py-3
        rounded-full
        border
        transition-all
        ${
          activeFilter === filter.value
            ? "bg-orange-500 border-orange-500 text-white"
            : "border-zinc-700 text-zinc-300"
        }
      `}
    >
      {filter.label}

      <span className="ml-2 bg-black/20 px-2 py-1 rounded-full text-xs">
        {getCount(filter.value)}
      </span>
    </button>
  ))}
</div>
      {loading ? (
        <p className="text-zinc-400">Loading gallery...</p>
      ) : galleryItems.length === 0 ? (
        <p className="text-zinc-400">No gallery items found.</p>
      ) : (
        <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-3
  gap-6
"
>
          {filteredItems.map((item) => (
            
            <GalleryCard
              key={item._id}
              item={item}
              onEdit={() => openModal("edit", item)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      )}

      <AddGalleryModal
        isOpen={modal.type === "add"}
        onClose={closeModal}
        onSuccess={fetchGallery}
      />
      <EditGalleryModal
        isOpen={modal.type === "edit"}
        item={modal.item}
        onClose={closeModal}
        onSuccess={fetchGallery}
      />
    </div>
  );
}

// ─── GalleryCard ──────────────────────────────────────────────────────────────

function GalleryCard({ item, onEdit, onDelete }) {
  return (
    <div className="border border-zinc-800 rounded-xl p-4 sm:p-5 bg-zinc-900">
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={item.thumbnail.url}
          alt={item.title}
          className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold truncate">{item.title}</h2>
          <p className="text-zinc-400 text-sm mt-1">Category: {item.category}</p>
          <p className="text-zinc-400 text-sm">Label: {item.label}</p>
          <p className="text-zinc-400 text-sm">Variants: {item.variants.length}</p>
        </div>
        <div className="flex sm:flex-col gap-2 sm:justify-start">
          <button
            onClick={onEdit}
            className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-500/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-600/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}