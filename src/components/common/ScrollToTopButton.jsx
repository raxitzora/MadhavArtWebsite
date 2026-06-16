import { useState,useEffect  } from "react";
import { ArrowUp, Bike } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function ScrollToTopButton() {
  const [showBike, setShowBike] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setVisible(window.scrollY > 300);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const handleClick = () => {
    setShowBike(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setShowBike(false);
    }, 1200);
  };

  return (
    <>
     <AnimatePresence>
  {visible && (
    <motion.button
      className="scroll-top-btn"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <ArrowUp size={24} />
    </motion.button>
  )}
</AnimatePresence>

      <AnimatePresence>
        {showBike && (
        <motion.div
  className="bike-animation"
  initial={{
    y: 0,
    rotate: -90,
  }}
  animate={{
    y: -window.innerHeight,
    rotate: -25,
  }}
  transition={{
    duration: 1.2,
    ease: "easeInOut",
  }}
>
  <Bike size={50} />
</motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ScrollToTopButton;