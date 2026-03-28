import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import hanselImg from "@/assets/hansel.png";

const confettiColors = ["#A98B76", "#BFA28C", "#F3E4C9", "#BABF94", "#e8d5b7", "#d4a574", "#f0c060"];

const ConfettiPiece = ({ delay, index }: { delay: number; index: number }) => {
  const color = confettiColors[index % confettiColors.length];
  const left = (index * 2.5) % 100;
  const size = 5 + (index % 5);

  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${left}%`,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: index % 2 === 0 ? "50%" : "2px",
      }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ y: "100vh", opacity: [0, 1, 1, 0], rotate: 720 }}
      transition={{ duration: 3 + (index % 3), delay, ease: "easeIn" }}
    />
  );
};

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 5.3) % 100,
  size: 4 + (i % 4) * 3,
  duration: 4 + (i % 3),
  delay: (i * 0.3) % 3,
}));

const HeroSection = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      {/* Rich radial spotlight behind the image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 40%, hsla(37,80%,85%,0.7) 0%, transparent 70%)",
        }}
      />

      {/* Floating particles — more visible */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${30 + (p.id % 4) * 8}, 55%, ${72 + (p.id % 3) * 6}%)`,
          }}
          animate={{ y: ["100vh", "-10vh"], opacity: [0, 0.65, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
        />
      ))}

      {/* Confetti */}
      {showConfetti &&
        Array.from({ length: 40 }, (_, i) => (
          <ConfettiPiece key={i} delay={i * 0.08} index={i} />
        ))}

      {/* Image with glowing ring */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.3, opacity: 0, filter: "blur(10px)" }}
        whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "transparent",
            boxShadow:
              "0 0 40px 16px hsla(37,80%,70%,0.45), 0 0 80px 30px hsla(37,80%,70%,0.2)",
            borderRadius: "50%",
            top: "10%",
            bottom: "10%",
            left: "10%",
            right: "10%",
          }}
          animate={{
            boxShadow: [
              "0 0 40px 16px hsla(37,80%,70%,0.35), 0 0 80px 30px hsla(37,80%,70%,0.15)",
              "0 0 60px 24px hsla(37,80%,70%,0.55), 0 0 110px 40px hsla(37,80%,70%,0.25)",
              "0 0 40px 16px hsla(37,80%,70%,0.35), 0 0 80px 30px hsla(37,80%,70%,0.15)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Decorative spinning ring */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "5%", bottom: "5%", left: "5%", right: "5%",
            borderRadius: "50%",
            border: "2px dashed hsla(37, 70%, 65%, 0.4)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.img
          src={hanselImg}
          alt="Hansel"
          className="w-48 h-auto md:w-72 lg:w-80 object-contain drop-shadow-2xl relative z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Text block */}
      <div className="relative z-10 flex flex-col items-center mt-6 px-4">
        {/* "Happy" with shimmer */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold"
          style={{
            background: "linear-gradient(90deg, hsl(22,30%,45%) 0%, hsl(37,70%,60%) 45%, hsl(22,30%,45%) 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{
            x: { duration: 1, delay: 0.3, ease: "easeOut" },
            opacity: { duration: 1, delay: 0.3 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
        >
          Happy
        </motion.h1>

        {/* "Birthday" with shimmer */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold"
          style={{
            background: "linear-gradient(90deg, hsl(27,28%,55%) 0%, hsl(40,75%,62%) 45%, hsl(27,28%,55%) 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{
            x: { duration: 1, delay: 0.45, ease: "easeOut" },
            opacity: { duration: 1, delay: 0.45 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
        >
          Birthday
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-3 mt-3 mb-1"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, hsl(37,60%,65%))" }} />
          <span className="text-base" style={{ color: "hsl(37,60%,65%)" }}>✦</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, hsl(37,60%,65%), transparent)" }} />
        </motion.div>

        <motion.p
          className="font-script text-2xl md:text-3xl mt-3"
          style={{ color: "hsl(22, 22%, 45%)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Dear Hansel 🎂
        </motion.p>
      </div>

      {/* Floating star decorations */}
      {["⭐", "✨", "🌟", "💫"].map((star, i) => (
        <motion.span
          key={i}
          className="absolute text-xl pointer-events-none select-none"
          style={{
            left: `${15 + i * 20}%`,
            top: `${25 + (i % 2) * 40}%`,
            opacity: 0.5,
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 15, -15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {star}
        </motion.span>
      ))}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-sm font-body" style={{ color: "hsl(22,22%,50%)" }}>
          Scroll down ↓
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
