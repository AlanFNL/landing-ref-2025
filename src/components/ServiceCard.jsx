import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function ServiceCard({
  title,
  description,
  index,
  lottieUrl,
  ctaText,
  ctaUrl,
  scrollToSection,
}) {
  const cardRef = useRef(null);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Increased rotation range for stronger effect
  const rotateX = useTransform(y, [-0.5, 0.5], ["13deg", "-13deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-13deg", "13deg"]);

  // Glare effect position
  const glareX = useTransform(x, [-0.5, 0.5], ["30%", "-30%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["30%", "-30%"]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const imgRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease-out",
      }}
      className="relative flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-purple-800/70 via-purple-900/70 to-purple-500/10 backdrop-blur-xl border border-white/10 w-[350px] min-h-[400px] hover:bg-secondary/70 transition-all duration-300 overflow-hidden perspective-1000 group"
    >
      {/* Multiple diagonal lines for glare effect */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            background: `
              linear-gradient(
                105deg,
                transparent ${70 + i * 2}%,
                rgba(255, 255, 255, ${0.1 - i * 0.02}) ${75 + i * 2}%,
                transparent ${80 + i * 2}%
              )
            `,
            transform: `translate(${glareX}, ${glareY}) translateZ(${
              i * 10
            }px)`,
            mixBlendMode: "overlay",
            transitionProperty: "transform, opacity",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "300ms",
          }}
        />
      ))}

      {/* Content with 3D effect */}
      <div
        className="w-full mb-4 rounded-lg overflow-hidden bg-transparent transition-transform duration-300"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/50 z-10" />
        <DotLottieReact
          src={lottieUrl}
          loop
          autoplay
          className="w-full h-[160px] object-cover"
        />
      </div>

      <h3
        className="text-xl text-center text-white font-semibold mb-2 transition-transform duration-300"
        style={{ transform: "translateZ(50px)" }}
      >
        {title}
      </h3>

      <p
        className="text-gray-300 text-center mb-4 transition-transform duration-300 text-sm"
        style={{ transform: "translateZ(50px)" }}
      >
        {description}
      </p>

      <motion.a
        onClick={() => {
          scrollToSection("contact");
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto select-none cursor-pointer bg-white text-purple-800 font-bold hover:shadow-2xs hover:shadow-[#f5e5ff] border-[#ffffff52] border transition-all duration-300 px-6 py-2 rounded-full tracking-wide z-50 text-sm"
      >
        {ctaText}
      </motion.a>
    </motion.div>
  );
}
