import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const MobileHomeCapsule = () => {
  return (
    <Link
      to="/"
      className="
      md:hidden
      fixed
      top-20
      left-1/2
      -translate-x-1/2
      z-[9999]
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      text-white
      text-sm
      font-medium
      shadow-xl
      active:scale-95
      transition-all
      duration-300
      "
    >
      <Home size={16} />
      Visit Home
    </Link>
  );
};

export default MobileHomeCapsule;