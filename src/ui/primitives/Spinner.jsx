// function Spinner() {
//   return (
//     <div className="h-full min-h-[300px] flex items-center justify-center">
//       <div
//         className="w-24 h-24 rounded-full animate-spin"
//         style={{
//           background: "conic-gradient(#0000 10%, #023047)", // your dark blue
//           WebkitMask:
//             "radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)",
//           mask: "radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)",
//           animationDuration: "1.5s",
//           animationTimingFunction: "linear",
//           animationIterationCount: "infinite",
//         }}
//       />
//     </div>
//   );
// }

// export default Spinner;

"use client";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

function Spinner({ bgColor = "" }) {
  const transition = (x) => {
    return {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop",
      delay: x * 0.2,
      ease: "easeInOut",
    };
  };
  return (
    <div
      className={cn(`flex flex-1 min-h-[300px] items-center justify-center`)}
    >
      <div
        className="flex items-center justify-center gap-2 px-2 py-4 rounded-2xl"
        style={{ backgroundColor: bgColor }}
      >
        <motion.div
          initial={{
            y: 0,
          }}
          animate={{
            y: [-5, 5, -5],
          }}
          transition={transition(0)}
          className="h-7 w-7 rounded-full border border-bright-yellow bg-radial from-orange to-bright-yellow"
        />
        <motion.div
          initial={{
            y: 0,
          }}
          animate={{
            y: [-5, 5, -5],
          }}
          transition={transition(1)}
          className="h-7 w-7 rounded-full border border-bright-red bg-radial from-main-red to-bright-red"
        />
        <motion.div
          initial={{
            y: 0,
          }}
          animate={{
            y: [-5, 5, -5],
          }}
          transition={transition(2)}
          className="h-7 w-7 rounded-full border border-light-blue bg-radial from-dark-blue to-light-blue"
        />
      </div>
    </div>
  );
}

export default Spinner;
