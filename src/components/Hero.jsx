import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import AnimatedText from "./AnimatedText";
import youshift from "../assets/youshift.webp";
import ycombinator from "../assets/y-combinator.png";
import laurel from "../assets/laurel.webp";

function Hero({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [slideX, setSlideX] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const [t, i18n] = useTranslation("global");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language;
      if (browserLang && browserLang.startsWith("es")) {
        i18n.changeLanguage("es");
      } else {
        i18n.changeLanguage("en");
      }
      setAnimationKey((prev) => prev + 1);
    }
  }, [i18n]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.documentElement.style.overflow = "visible";
    };
  }, [isOpen]);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            // Reset scroll position when coming back into view
            setPrevScrollPos(window.scrollY);
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isInView) return;

      const currentScrollPos = window.scrollY;
      const scrollDelta = currentScrollPos - prevScrollPos;

      // Throttle the animation updates
      window.requestAnimationFrame(() => {
        setSlideX((prev) => {
          // Reduce the movement range and make it smoother
          const newX = prev - scrollDelta * 0.15; // Reduced multiplier
          return Math.min(Math.max(newX, -500), 500); // Reduced range
        });
      });

      setPrevScrollPos(currentScrollPos);
    };

    // Throttle scroll events
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, [prevScrollPos, isInView]);

  const heroHeaderRef = useRef();

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="w-screen min-h-fit h-[100dvh] bg-[url('./assets/gradient-1.webp')] bg-cover overflow-hidden flex flex-col justify-center relative"
    >
      <div
        className="max-w-[1200px] mx-auto px-4 md:px-8 pt-24 md:pt-38 z-10 flex flex-col items-center"
        ref={heroHeaderRef}
      >
        {/* Featured Badge with Laurel */}
        <motion.div
          key={`featured-${animationKey}`}
          initial={
            typeof window === "undefined" ? false : { opacity: 0, y: -10 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-center bg-white/10 border-2 border-white/10 px-2 py-1 md:px-4 md:py-2 rounded-full"
        >
          <p className="text-white text-sm md:text-base mr-1 opacity-80">★</p>

          <div className="flex gap-2 items-center text-white/90 text-sm md:text-base font-medium">
            <span className="flex items-center justify-center gap-2">
              {t("hero.featured_on_bookface")}{" "}
              <img
                src={ycombinator}
                className="size-4 md:size-6"
                alt="Y Combinator logo"
              />{" "}
              Combinator
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="text-center mb-6">
          <AnimatedText
            animationKey={animationKey}
            text={t("about.1")}
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-6xl"
            delay={0.1}
            lines={3}
            lineDelay={0.1}
            style={{ minHeight: "calc(6.5rem * 3)" }}
          />
        </div>

        {/* Subheadline */}
        <div className="mb-8">
          <AnimatedText
            animationKey={animationKey}
            text={t("about.2")}
            className="text-md md:text-2xl text-white/80 font-medium max-w-3xl text-center"
            delay={0.4}
            lines={2}
            lineDelay={0.05}
            style={{ minHeight: "calc(3rem * 2)" }}
          />
        </div>

        <motion.div
          key={`cta-${animationKey}`}
          className="mt-2"
          initial={
            typeof window === "undefined" ? false : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.2,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group relative flex justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                window.open(
                  "https://calendly.com/reforceinfinity-info/30min",
                  "_blank"
                )
              }
              className="button font-medium transition-all text-base md:text-lg lg:text-xl px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5"
              aria-label={t("about.cta")}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(
                    "https://calendly.com/reforceinfinity-info/30min",
                    "_blank"
                  );
                }
              }}
            >
              <div className="dots_border"></div>
              <div className="sparkle">
                <Sparkles className="w-5 h-5" style={{ color: "#9810fa" }} />
              </div>
              <span className="text_button font-medium">{t("about.cta")}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Trusted by Y Combinator Startups */}
        <motion.div
          key={`trusted-${animationKey}`}
          initial={
            typeof window === "undefined" ? false : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-8 text-center pb-16"
        >
          <p className="text-white/70 text-sm md:text-base mb-6 font-medium tracking-wide flex gap-2">
            {t("hero.trusted_by_startups")}{" "}
            <img
              src={ycombinator}
              className="size-4 md:size-6"
              alt="Y Combinator logo"
            />{" "}
            Combinator Startups
          </p>
          <div className="flex justify-center items-center gap-10 md:gap-16">
            {/* Placeholder logo 1 */}
            <div className="w-20 h-10 md:w-24 md:h-12 flex items-center justify-center">
              <svg
                width="890"
                height="228"
                viewBox="0 0 890 228"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="!w-20 md:!w-28 !h-full"
              >
                <path
                  d="M282.486 182V45.2727H370.077V66.0355H307.254V103.155H364.068V123.918H307.254V182H282.486ZM450.507 138.872V79.4545H474.675V182H451.242V163.774H450.174C447.859 169.516 444.054 174.211 438.757 177.861C433.506 181.51 427.03 183.335 419.33 183.335C412.609 183.335 406.667 181.844 401.505 178.862C396.386 175.836 392.381 171.452 389.488 165.71C386.595 159.924 385.148 152.937 385.148 144.747V79.4545H409.316V141.009C409.316 147.507 411.096 152.67 414.657 156.497C418.217 160.325 422.891 162.239 428.676 162.239C432.237 162.239 435.686 161.371 439.025 159.635C442.363 157.899 445.1 155.318 447.236 151.891C449.417 148.419 450.507 144.08 450.507 138.872ZM580.575 106.56L558.544 108.963C557.921 106.738 556.83 104.646 555.273 102.688C553.759 100.729 551.712 99.1491 549.131 97.9474C546.549 96.7457 543.389 96.1449 539.651 96.1449C534.621 96.1449 530.393 97.2353 526.966 99.4162C523.583 101.597 521.914 104.423 521.959 107.895C521.914 110.877 523.005 113.303 525.23 115.172C527.5 117.041 531.239 118.577 536.446 119.778L553.938 123.517C563.64 125.609 570.85 128.925 575.568 133.464C580.33 138.004 582.734 143.946 582.778 151.29C582.734 157.743 580.842 163.44 577.104 168.381C573.41 173.277 568.269 177.104 561.682 179.864C555.095 182.623 547.528 184.003 538.983 184.003C526.432 184.003 516.329 181.377 508.673 176.125C501.018 170.829 496.456 163.463 494.987 154.027L518.554 151.757C519.622 156.386 521.892 159.88 525.364 162.239C528.835 164.598 533.353 165.777 538.916 165.777C544.658 165.777 549.264 164.598 552.736 162.239C556.252 159.88 558.01 156.964 558.01 153.493C558.01 150.555 556.875 148.13 554.605 146.216C552.38 144.302 548.908 142.833 544.19 141.81L526.699 138.138C516.863 136.09 509.586 132.641 504.868 127.79C500.15 122.894 497.813 116.707 497.858 109.23C497.813 102.91 499.527 97.4356 502.999 92.8068C506.515 88.1335 511.388 84.5284 517.619 81.9915C523.895 79.41 531.127 78.1193 539.317 78.1193C551.334 78.1193 560.792 80.6785 567.69 85.7969C574.634 90.9152 578.929 97.8362 580.575 106.56ZM648.104 184.003C637.823 184.003 628.944 181.866 621.467 177.594C614.034 173.277 608.315 167.179 604.309 159.301C600.303 151.379 598.3 142.054 598.3 131.328C598.3 120.78 600.303 111.522 604.309 103.555C608.359 95.544 614.012 89.313 621.266 84.8622C628.521 80.3669 637.044 78.1193 646.836 78.1193C653.156 78.1193 659.12 79.143 664.728 81.1903C670.38 83.1932 675.365 86.3087 679.683 90.5369C684.044 94.7651 687.471 100.151 689.964 106.693C692.456 113.191 693.702 120.936 693.702 129.926V137.337H609.65V121.047H670.536C670.492 116.418 669.49 112.301 667.532 108.696C665.574 105.046 662.836 102.176 659.32 100.084C655.849 97.9919 651.799 96.946 647.17 96.946C642.229 96.946 637.89 98.1477 634.151 100.551C630.413 102.91 627.497 106.026 625.406 109.898C623.358 113.725 622.312 117.931 622.268 122.516V136.736C622.268 142.7 623.358 147.818 625.539 152.091C627.72 156.319 630.769 159.568 634.685 161.838C638.602 164.063 643.186 165.176 648.438 165.176C651.954 165.176 655.137 164.687 657.985 163.707C660.834 162.684 663.304 161.193 665.396 159.234C667.487 157.276 669.067 154.85 670.136 151.957L692.701 154.494C691.277 160.458 688.562 165.666 684.556 170.116C680.595 174.523 675.521 177.95 669.335 180.398C663.148 182.801 656.071 184.003 648.104 184.003ZM732.775 182H706.337L754.472 45.2727H785.049L833.25 182H806.813L770.294 73.3125H769.226L732.775 182ZM733.642 128.391H805.745V148.286H733.642V128.391ZM876.028 45.2727V182H851.259V45.2727H876.028Z"
                  fill="white"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M102.5 24.6667C102.5 17.1188 108.619 11 116.167 11H191.333C198.881 11 205 17.1188 205 24.6667V65.6667C205 73.2146 198.881 79.3333 191.333 79.3333H119.583H116.167C108.619 79.3333 102.5 85.4521 102.5 93V134C102.5 141.548 108.619 147.667 116.167 147.667H119.583H191.333C198.881 147.667 205 153.785 205 161.333V202.333C205 209.881 198.881 216 191.333 216H116.167C108.619 216 102.5 209.881 102.5 202.333V181.833V161.333C102.5 153.785 96.3812 147.667 88.8333 147.667H85.4167H13.6667C6.11877 147.667 0 141.548 0 134V93C0 85.4521 6.11878 79.3333 13.6667 79.3333H85.4167H88.8333C96.3812 79.3333 102.5 73.2146 102.5 65.6667V45.1667V24.6667Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            {/* Placeholder logo 2 */}
            <div className="w-20 h-10 md:w-24 md:h-12 flex items-center justify-center">
              <img
                src={youshift}
                alt="YouShift YCombinator"
                className="filter saturate-0 invert"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero slide at bottom of screen */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <motion.div
          className="hero-slide mx-auto"
          style={{
            x: slideX,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 40,
            mass: 0.2,
            restDelta: 0.001,
          }}
        />
      </div>
    </motion.section>
  );
}

export default Hero;
