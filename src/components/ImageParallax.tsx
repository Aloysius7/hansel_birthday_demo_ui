import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import hanselPhoto from "@/assets/hansel-photo.jpeg";

interface ImageParallaxProps {
  onPoemOpen: () => void;
}

const ImageParallax = ({ onPoemOpen }: ImageParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [bookOpening, setBookOpening] = useState(false);
  const [bookDone, setBookDone] = useState(false);

  useEffect(() => {
    const handler = () => {
      setBookDone(false);
      setBookOpening(false);
    };
    window.addEventListener("birthday-restart", handler);
    return () => window.removeEventListener("birthday-restart", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  const handlePoemClick = () => {
    const outer = document.getElementById("main-scroll-container") as HTMLElement | null;
    if (outer) outer.style.overflow = "hidden";

    setBookOpening(true);
    setTimeout(() => {
      setBookDone(true);
      onPoemOpen(); // triggers React render of PoemSection

      setTimeout(() => {
        if (!outer) return;
        // Disable snap so it can't fight our jump
        outer.style.overflowY = "scroll";
        outer.style.scrollSnapType = "none";

        // Wait two frames for React to flush PoemSection into the DOM
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const poemEl = document.getElementById("poem-section");
            if (poemEl) {
              outer.scrollTop = poemEl.offsetTop; // instant jump, no snap interference
            }
            // Re-enable snap after positioning
            outer.style.scrollSnapType = "y mandatory";
          });
        });
      }, 100);
    }, 1800);
  };

  return (
    <>
      <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 gradient-hero" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden shadow-soft mb-20"
            style={{ y, scale }}
            whileInView={{ boxShadow: "0 24px 60px hsla(22,30%,30%,0.25)" }}
            viewport={{ once: false }}
          >
            <img
              src={hanselPhoto}
              alt="Hansel"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {!bookDone && (
          <motion.button
            className="btn-birthday"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            whileHover={{
              scale: 1.07,
              y: -4,
              boxShadow: "0 12px 32px hsla(22,50%,40%,0.35), 0 0 0 3px hsla(37,70%,65%,0.4)",
            }}
            whileTap={{ scale: 0.96, y: 0 }}
            onClick={handlePoemClick}
            transition={{ duration: 0.7, delay: 0.3 }}
            disabled={bookOpening}
          >
            A poem for you, Teacher 📜
          </motion.button>
        )}
      </section>

      {/* Book Opening Animation Overlay */}
      <AnimatePresence>
        {bookOpening && !bookDone && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "hsl(var(--cream))" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96" style={{ perspective: "1200px" }}>
              {/* Book spine */}
              <div className="absolute inset-0 rounded-lg shadow-soft" style={{ background: "hsl(var(--warm-brown))" }} />

              {/* Right page (static) */}
              <motion.div
                className="absolute inset-0 rounded-r-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(37, 63%, 95%), hsl(33, 50%, 92%))",
                  transformOrigin: "left center",
                }}
              >
                <p className="font-script text-2xl md:text-3xl text-center px-6" style={{ color: "hsl(var(--warm-brown))" }}>
                  A poem<br />for you,<br />Teacher ✨
                </p>
              </motion.div>

              {/* Left page (opens) */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--warm-brown)), hsl(var(--soft-brown)))",
                  transformOrigin: "left center",
                  backfaceVisibility: "hidden",
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -160 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">📖</span>
                </div>
              </motion.div>
            </div>

            {/* Sparkles */}
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageParallax;
