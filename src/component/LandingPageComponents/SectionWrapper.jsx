// src/components/common/SectionWrapper.jsx
import { motion } from "framer-motion";

const SectionWrapper = ({ children, delay = 0 }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay,
      }}
      viewport={{ once: true, amount: 0.25 }} // triggers once when 25% visible
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
