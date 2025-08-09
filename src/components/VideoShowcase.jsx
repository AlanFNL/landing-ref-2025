import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  lazy,
  Suspense,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Play, X, ChevronRight } from "./icons";

// Import thumbnails
import thumb1 from "../assets/videos/1.webp";
import thumb2 from "../assets/videos/2.webp";
import thumb3 from "../assets/videos/3.webp";
import thumb4 from "../assets/videos/4.webp";
import thumb5 from "../assets/videos/5.webp";

// Import videos properly instead of using URL strings
import video1 from "../assets/videos/1.mp4";
import video2 from "../assets/videos/2.mp4";
import video3 from "../assets/videos/3.mp4";
import video4 from "../assets/videos/4.mp4";
import video5 from "../assets/videos/5.mp4";

// Video data using imported files
const videoData = [
  {
    id: 1,
    title: "FuseAI",
    description: "",
    thumbnail: thumb1,
    videoUrl: video1,
    isHighlighted: true,
    badge: "Y Combinator",
  },
  {
    id: 2,
    title: "YouShift",
    description: "",
    thumbnail: thumb2,
    videoUrl: video2,
    isHighlighted: true,
    badge: "Y Combinator",
  },
  {
    id: 3,
    title: "SudX",
    description: "",
    thumbnail: thumb3,
    videoUrl: video3,
    isHighlighted: false,
  },
  {
    id: 4,
    title: "Shulspace",
    description: "",
    thumbnail: thumb4,
    videoUrl: video4,
    isHighlighted: false,
  },
  {
    id: 5,
    title: "UNAJE",
    description: "",
    thumbnail: thumb5,
    videoUrl: video5,
    isHighlighted: false,
  },
];

// Loading indicator component
const LoadingIndicator = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black">
    <div className="w-16 h-16 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
  </div>
);

// Video Modal Component
const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const videoRef = useRef(null);
  const modalContentRef = useRef(null);
  const videoUrlRef = useRef(videoUrl); // Store video URL in a ref to avoid reload if already cached

  useEffect(() => {
    // Only update the ref when videoUrl actually changes
    if (isOpen && videoUrl) {
      videoUrlRef.current = videoUrl;
    }
  }, [isOpen, videoUrl]);

  useEffect(() => {
    const videoElement = videoRef.current;
    let handleClickOutsideListener;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVideoLoaded(false);
      setLoadError(null); // Reset error on open

      // Explicitly set src and load when modal opens
      if (videoUrlRef.current && videoElement) {
        videoElement.src = videoUrlRef.current;
        videoElement.load();
      }

      // Handle click outside - Define inside effect to avoid stale closure issues
      handleClickOutsideListener = (event) => {
        if (
          modalContentRef.current &&
          !modalContentRef.current.contains(event.target)
        ) {
          handleCloseModal();
        }
      };

      document.addEventListener("mousedown", handleClickOutsideListener);
    } else {
      document.body.style.overflow = "auto";
      if (videoElement) {
        // Ensure video is fully stopped
        videoElement.pause();
        videoElement.currentTime = 0;
        // Unload the video source to free resources
        if (videoElement.src) {
          // Check if src exists before removing
          videoElement.removeAttribute("src");
          videoElement.load(); // Effectively clear the pipeline
        }
        setIsVideoLoaded(false); // Ensure loader is reset for next open
      }
    }

    return () => {
      document.body.style.overflow = "auto";
      if (handleClickOutsideListener) {
        document.removeEventListener("mousedown", handleClickOutsideListener);
      }

      // Clean up video element to prevent memory leaks
      // Ensure cleanup happens even if modal was closed abruptly, or isOpen changes quickly
      if (videoElement) {
        videoElement.pause();
        if (videoElement.src) {
          // Check if src exists
          videoElement.removeAttribute("src");
          videoElement.load();
        }
      }
    };
  }, [isOpen]); // onClose is stable, videoUrlRef.current is stable for this effect

  const handleVideoCanPlay = () => {
    if (isOpen && videoRef.current) {
      setIsVideoLoaded(true);
      setLoadError(null); // Clear any previous error if it now can play
      // Attempt to play, catch errors (e.g., autoplay blocked by browser)
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay was prevented by the browser:", error);
        // User will need to click play manually. Controls are visible.
        // Optionally, you could set a message: setLoadError("Autoplay blocked. Please press play.");
      });
    }
  };

  const handleVideoError = (e) => {
    const videoElement = e.target;
    let errorMessage = "An unknown error occurred while loading the video.";

    if (videoElement.error) {
      console.error(
        "Video Error Code:",
        videoElement.error.code,
        "Message:",
        videoElement.error.message
      );
      switch (videoElement.error.code) {
        case 1: // MEDIA_ERR_ABORTED
          errorMessage = "The video loading was aborted.";
          break;
        case 2: // MEDIA_ERR_NETWORK
          errorMessage =
            "A network error caused the video download to fail. Please check your connection.";
          break;
        case 3: // MEDIA_ERR_DECODE
          errorMessage =
            "The video playback was aborted due to a corruption problem or because the video used features your browser does not support.";
          break;
        case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
          errorMessage =
            "The video could not be loaded. The format may not be supported by your browser, or there might be a server/network issue.";
          break;
        default:
          errorMessage = `Failed to load video. (Error code: ${videoElement.error.code})`;
      }
    } else {
      console.error("Video Error: Unknown error structure", e);
    }

    setLoadError(errorMessage);
    setIsVideoLoaded(true); // Hide loading indicator, show error message (and controls if possible)
  };

  const handleCloseModal = () => {
    // Stop video immediately before animation starts
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      // Remove the source immediately to prevent brief playback on close
      if (videoRef.current.src) {
        // Check if src exists
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
      setLoadError(null); // Clear error on close
    }
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            ref={modalContentRef}
            className="relative w-full max-w-6xl mx-4 aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
              aria-label="Close video"
              tabIndex={0}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Conditional rendering for loader and error message */}
            {!isVideoLoaded && !loadError && <LoadingIndicator />}
            {loadError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-6 text-center">
                <p className="text-red-500 text-lg mb-2 font-semibold">
                  Video Unavailable
                </p>
                <p className="text-gray-300 text-sm">{loadError}</p>
              </div>
            )}

            <video
              ref={videoRef}
              // src is now managed by useEffect when isOpen becomes true
              className={`absolute inset-0 w-full h-full object-contain ${
                isVideoLoaded && !loadError ? "opacity-100" : "opacity-0" // Show video if loaded and no error
              }`}
              controls
              autoPlay // Attempt to autoplay when ready
              playsInline
              preload="metadata"
              onCanPlay={handleVideoCanPlay}
              onError={handleVideoError} // Add error handler
              onEnded={handleCloseModal}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Video Thumbnail Component
const VideoThumbnail = ({ video, index, parallaxValue, onClick, isMobile }) => {
  const { t } = useTranslation("global");
  const cardRef = useRef(null);
  const isInView = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Create a slightly different parallax effect for each card - only applied on non-mobile
  const offset = index % 2 === 0 ? 1 : -1;
  const y = useTransform(
    parallaxValue,
    [0, 1],
    [0, 60 * offset * (1 + (index % 3) * 0.2)]
  );

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
        video.isHighlighted
          ? "md:col-span-2 lg:row-span-1 xl:row-span-2 aspect-video md:aspect-[16/9]"
          : "aspect-square"
      }`}
      style={isMobile ? {} : { y }}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      aria-label={`Play video ${video.id}`}
    >
      {/* Thumbnail Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />

      {/* Background glow effect on hover */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-purple-500/0 z-0 transition-colors duration-300"
        initial={false}
        whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.05)" }}
      />

      <img
        src={video.thumbnail}
        alt={`Video ${video.id} thumbnail`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Play Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
        <motion.div
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all duration-300"
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:text-purple-300 transition-colors" />
        </motion.div>
      </div>

      {/* Title, Description, and Badge */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        {/* Badge */}
        {video.isHighlighted && video.badge && (
          <motion.div
            className="mb-2 sm:mb-3 bg-purple-500/80 text-white font-medium text-xs py-1 px-3 rounded-full backdrop-blur-sm w-fit"
            initial={
              typeof window === "undefined" ? false : { opacity: 0, y: 10 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {video.badge}
          </motion.div>
        )}
        {/* Title */}
        {video.title && (
          <motion.h3
            className="text-lg sm:text-xl font-bold text-white mb-1"
            initial={
              typeof window === "undefined" ? false : { opacity: 0, y: 10 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {video.title}
          </motion.h3>
        )}
        {/* Description (if needed in the future) */}
        {video.description && (
          <motion.p
            className="text-xs text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {video.description}
          </motion.p>
        )}
      </div>

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 z-20 rounded-2xl border-2 border-transparent pointer-events-none"
        initial={false}
        whileHover={{ borderColor: "rgba(168, 85, 247, 0.3)" }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const VideoShowcase = () => {
  const isServer = typeof window === "undefined";
  const [t] = useTranslation("global");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Check if screen is mobile on component mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind is 640px
    };

    // Check on mount
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Wrap video selection in startTransition to prevent suspense errors
  const handleVideoSelect = (video) => {
    startTransition(() => {
      setSelectedVideo(video);
    });
  };

  return (
    <section className="w-full bg-black py-16 md:py-20 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-purple-500/20"></div>
          ))}
        </div>
      </div>

      {/* Glow Effect */}

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
            initial={
              typeof window === "undefined" ? false : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("videos.title")}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
            initial={typeof window === "undefined" ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("videos.subtitle") ||
              "Visual storytelling through dynamic motion graphics and captivating animations."}
          </motion.p>
        </div>

        {/* Loading indicator when transitioning */}
        {isPending && (
          <div className="fixed top-4 right-4 z-50">
            <div className="w-6 h-6 border-2 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Video Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          initial={isServer ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {videoData.map((video, index) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              index={index}
              parallaxValue={scrollYProgress}
              onClick={() => handleVideoSelect(video)}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={selectedVideo !== null}
        onClose={() => startTransition(() => setSelectedVideo(null))}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
      />
    </section>
  );
};

export default VideoShowcase;
