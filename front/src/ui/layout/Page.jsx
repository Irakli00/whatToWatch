import { motion } from "framer-motion";

function Page({ children, className, bgColor = "" }) {
  return (
    <motion.main
      className={className}
      // initial={{ opacity: 0, x: 100 }}
      // animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </motion.main>
  );
}

export default Page;
