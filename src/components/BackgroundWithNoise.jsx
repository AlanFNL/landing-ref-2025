import React, { useEffect, useRef } from "react";

const GradientBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create noise pattern
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255 * 0.05; // Reduce opacity of noise
        data[i] = value; // r
        data[i + 1] = value; // g
        data[i + 2] = value; // b
        data[i + 3] = 255; // alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    createNoise();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark to-purple-light" />

      {/* Noise overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
      />
    </div>
  );
};

export default GradientBackground;
