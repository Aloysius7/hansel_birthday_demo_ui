import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 3.4) % 100,
  y: (i * 5.1) % 100,
  size: 4 + (i % 4) * 2,
  duration: 3 + (i % 3),
  delay: (i * 0.2) % 2.5,
}));

// Candle dots along the progress bar
const CANDLE_COUNT = 5;

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-hero"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `hsl(${35 + (p.id % 3) * 8}, 55%, ${72 + (p.id % 3) * 6}%)`,
            }}
            animate={{ y: [0, -28, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          />
        ))}

        {/* Cake icon */}
        <motion.div
          className="text-6xl mb-6 select-none"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <motion.span
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            🎂
          </motion.span>
        </motion.div>

        {/* Loading message */}
        <motion.p
          className="font-script text-3xl md:text-4xl text-warm-brown mb-8 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Preparing something special...
        </motion.p>

        {/* Progress bar container */}
        <div className="flex flex-col items-center gap-3 w-64">
          {/* Candle markers */}
          <div className="relative w-full flex justify-between px-1">
            {Array.from({ length: CANDLE_COUNT }, (_, i) => {
              const threshold = ((i + 1) / CANDLE_COUNT) * 100;
              const lit = progress >= threshold;
              return (
                <motion.span
                  key={i}
                  className="text-base select-none"
                  animate={lit ? { scale: [1, 1.4, 1], opacity: 1 } : { opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                >
                  {lit ? "🕯️" : "○"}
                </motion.span>
              );
            })}
          </div>

          {/* Bar */}
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsla(22,22%,56%,0.2)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(37,70%,62%), hsl(22,40%,52%), hsl(40,75%,60%))",
                boxShadow: "0 0 8px hsla(37,70%,62%,0.6)",
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="font-body text-sm"
            style={{ color: "hsl(22,22%,50%)" }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Sparkle row */}
        <motion.div
          className="mt-6 text-lg tracking-widest"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✨ ✦ ✨
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
