import { motion } from "framer-motion";

const bubbles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: 5 + (i * 4.3) % 90,
  size: 6 + (i % 5) * 4,
  duration: 3.5 + (i % 4) * 0.8,
  delay: (i * 0.35) % 4,
}));

const CheersSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(33,50%,88%), hsl(37,63%,92%))",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      {/* Champagne bubbles — always animate */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full"
            style={{
              left: `${b.left}%`,
              bottom: "-10%",
              width: b.size,
              height: b.size,
              background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(255,220,100,0.25))",
              border: "1px solid rgba(255,200,80,0.4)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8)",
            }}
            animate={{
              y: [0, -(550 + b.size * 10)],
              x: [0, (b.id % 2 === 0 ? 1 : -1) * (8 + b.id % 8)],
              opacity: [0, 0.9, 0.9, 0],
              scale: [0.5, 1, 1.1, 0.8],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Golden shimmer overlay at base */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, hsla(40,70%,80%,0.3))" }}
      />

      {/* Heading */}
      <div className="text-center px-4 relative z-10">
        <motion.h2
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-center"
          style={{ color: "hsl(var(--warm-brown))" }}
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Cheers
        </motion.h2>
        <motion.h2
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-center"
          style={{ color: "hsl(var(--soft-brown))" }}
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          to you 🥂
        </motion.h2>
        <motion.p
          className="font-script text-xl md:text-2xl mt-6"
          style={{ color: "hsl(22, 22%, 50%)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          May your day be as golden as champagne ✨
        </motion.p>
      </div>
    </section>
  );
};

export default CheersSection;
