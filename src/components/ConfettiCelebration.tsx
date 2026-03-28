import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const confettiColors = ["#A98B76", "#BFA28C", "#F3E4C9", "#BABF94", "#e8d5b7", "#d4a574"];
const balloonEmojis = ["🎈", "🎈", "🎈", "🎉", "🎊", "⭐"];

const ConfettiCelebration = () => {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-400, 0, 0, -400]);
  const xRight = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [400, 0, 0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {show && (
        <>
          {Array.from({ length: 60 }, (_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute top-0"
              style={{
                left: `${Math.random() * 100}%`,
                width: Math.random() * 10 + 4,
                height: Math.random() * 10 + 4,
                backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: "100vh", opacity: [0, 1, 1, 0], rotate: 720 }}
              transition={{ duration: 3 + Math.random() * 3, delay: Math.random() * 2, ease: "easeIn" }}
            />
          ))}

          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`balloon-${i}`}
              className="absolute bottom-0 text-3xl md:text-4xl"
              style={{ left: `${10 + Math.random() * 80}%` }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: "-120vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6 + Math.random() * 4, delay: Math.random() * 3 }}
            >
              {balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)]}
            </motion.div>
          ))}
        </>
      )}

      <motion.div className="text-center z-10 px-4" style={{ y: yParallax }}>
        <motion.h2
          className="text-5xl md:text-7xl font-display font-bold"
          style={{ x: xLeft, opacity, color: "hsl(var(--warm-brown))" }}
        >
          🎉 Cheers! 🎉
        </motion.h2>
        <motion.p
          className="font-script text-2xl md:text-3xl mt-4"
          style={{ x: xRight, opacity, color: "hsl(var(--soft-brown))" }}
        >
          Here's to another amazing year, Hansel!
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ConfettiCelebration;
