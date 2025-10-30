// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Page({ children, className, bgColor = "" }) {
  return (
    <motion.main
      className={cn(`pt-header-height flex flex-col ${className ?? ""}`)}
      // className={`pt-header-height flex flex-col ${className ?? ""}`}
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
