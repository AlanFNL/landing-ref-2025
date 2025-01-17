import React, { useRef } from "react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";

function TitleSlide() {
  const containerRef = useRef();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const backgroundTextX = useTransform(scrollYProgress, [0.15, 1], [-100, 0]);
  const asteriskRotate = useTransform(scrollYProgress, [0.15, 0.8], [0, 720]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        x: backgroundTextX,
      }}
      className="pointer-events-none select-none -mt-12 -mb-18 w-full flex justify-center z-30"
    >
      <div className="flex items-center gap-4 opacity-10">
        <span className="text-[12vw] font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600/90 animate-gradient whitespace-nowrap">
          Reforce
        </span>
        <motion.span
          style={{ rotate: asteriskRotate }}
          className="text-[6vw] text-white"
        ></motion.span>
        <span className="text-[12vw] font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600/90 animate-gradient whitespace-nowrap">
          Infinity
        </span>
      </div>
    </motion.div>
  );
}

export default TitleSlide;
