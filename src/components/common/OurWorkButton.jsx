import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMotorcycle } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export default function OurWorkButton() {
const navigate = useNavigate();
const [animating, setAnimating] = useState(false);

const handleClick = () => {
if (animating) return;


setAnimating(true);

setTimeout(() => {
  navigate("/gallery");
}, 500);


};

return (
<motion.button
onClick={handleClick}
whileHover={{
y: -6,
rotate: -1,
}}
whileTap={{
scale: 0.98,
}}
className="
group
relative
overflow-hidden
w-[420px]
rounded-3xl
border
border-white/10
bg-white/[0.03]
backdrop-blur-xl
p-7
text-left
"
>
{/* glow */} <div
     className="
       absolute
       inset-0
       opacity-0
       group-hover:opacity-100
       transition-opacity
       duration-500
       bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.25),transparent_70%)]
     "
   />

```
  {/* animated top border */}
  <div
    className="
      absolute
      top-0
      left-[-100%]
      h-[2px]
      w-full
      bg-gradient-to-r
      from-transparent
      via-orange-500
      to-transparent
      group-hover:left-[100%]
      transition-all
      duration-1000
    "
  />

  {/* motorcycle */}
  {animating && (
    <motion.div
      initial={{ x: -120 }}
      animate={{ x: 350 }}
      transition={{ duration: 0.5 }}
      className="
        absolute
        top-1/2
        -translate-y-1/2
        z-30
        text-orange-500
      "
    >
      <FaMotorcycle size={26} />
    </motion.div>
  )}

  <div className="relative z-20">
    <div className="flex items-center justify-between mb-4">
      <span
        className="
          text-[11px]
          uppercase
          tracking-[0.25em]
          text-orange-500
          font-bold
        "
      >
        Gallery
      </span>

      <motion.div
        animate={{ rotate: [0, 12, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <FiArrowUpRight
          size={22}
          className="
            text-white
            group-hover:text-orange-500
            transition-colors
          "
        />
      </motion.div>
    </div>

    <h3
      className="
        text-xl
        font-bold
        text-white
        mb-2
      "
    >
      Explore Our Work
    </h3>

    <p
      className="
        text-sm
        leading-relaxed
        text-gray-400
      "
    >
      Bikes • Cars • Radium Art
      <br />
      Recent transformations & custom builds.
    </p>

    <motion.div
      className="
        mt-5
        h-[4px]
        rounded-full
        bg-orange-500
        origin-left
      "
      whileHover={{ scaleX: 1.2 }}
    />
  </div>
</motion.button>


);
}
