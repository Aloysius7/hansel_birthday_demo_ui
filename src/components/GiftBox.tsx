import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BowTie = () => (
  <div className="relative flex items-center justify-center" style={{ width: 88, height: 44 }}>
    {/* Left loop */}
    <div
      style={{
        position: "absolute",
        width: 38, height: 30, left: 4, top: 6,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #fce59a, #e8a800)",
        transform: "rotate(-18deg)",
        boxShadow: "inset 0 2px 6px rgba(255,255,255,0.4)",
      }}
    />
    {/* Right loop */}
    <div
      style={{
        position: "absolute",
        width: 38, height: 30, right: 4, top: 6,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #fce59a, #e8a800)",
        transform: "rotate(18deg)",
        boxShadow: "inset 0 2px 6px rgba(255,255,255,0.4)",
      }}
    />
    {/* Knot */}
    <div
      style={{
        position: "absolute",
        width: 20, height: 20,
        borderRadius: "50%",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle at 35% 35%, #fef3c7, #c88a00)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 2,
      }}
    />
    {/* Left tail */}
    <div
      style={{
        position: "absolute",
        width: 11, height: 22, left: 33, top: 26,
        background: "linear-gradient(180deg, #fce59a, #e8a800)",
        borderRadius: "0 0 5px 5px",
        transform: "rotate(-16deg)",
        transformOrigin: "top center",
      }}
    />
    {/* Right tail */}
    <div
      style={{
        position: "absolute",
        width: 11, height: 22, right: 33, top: 26,
        background: "linear-gradient(180deg, #fce59a, #e8a800)",
        borderRadius: "0 0 5px 5px",
        transform: "rotate(16deg)",
        transformOrigin: "top center",
      }}
    />
  </div>
);

const sparkEmojis = ["✨", "⭐", "🌟", "💫", "🎊", "🎉"];

const GiftBox = ({ onOpen }: { onOpen: () => void }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onOpen, 1800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, hsl(37,63%,94%) 0%, hsl(33,50%,88%) 55%, hsl(27,35%,82%) 100%)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient floating orbs */}
      {Array.from({ length: 14 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${8 + (i * 7) % 84}%`,
            top: `${10 + (i * 11) % 80}%`,
            width: 8 + (i % 4) * 6,
            height: 8 + (i % 4) * 6,
            background: `hsl(${35 + (i % 3) * 10}, 60%, ${78 + (i % 3) * 6}%)`,
            opacity: 0.4,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + (i % 3), delay: (i * 0.4) % 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Sparkle burst on open */}
      <AnimatePresence>
        {clicked &&
          Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * 360;
            const distance = 120 + (i % 4) * 40;
            const rad = (angle * Math.PI) / 180;
            return (
              <motion.div
                key={`spark-${i}`}
                className="absolute text-xl pointer-events-none"
                style={{ left: "50%", top: "42%", zIndex: 30 }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos(rad) * distance,
                  y: Math.sin(rad) * distance,
                  opacity: 0,
                  scale: [0, 1.4, 0.4],
                }}
                transition={{ duration: 0.9 + (i % 3) * 0.15, delay: 0.25 + (i % 5) * 0.06, ease: "easeOut" }}
              >
                {sparkEmojis[i % sparkEmojis.length]}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Gift box */}
      <motion.div
        className="flex flex-col items-center cursor-pointer select-none relative"
        onClick={handleClick}
        whileHover={!clicked ? { scale: 1.04 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* LID */}
        <motion.div
          className="flex flex-col items-center"
          animate={
            clicked
              ? { y: -320, rotate: -28, opacity: 0, scale: 0.85 }
              : { y: [0, -14, 0] }
          }
          transition={
            clicked
              ? { duration: 0.85, ease: [0.4, 0, 0.2, 1] }
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <BowTie />

          {/* Lid body */}
          <div className="relative overflow-hidden" style={{ width: 226, height: 58, borderRadius: "8px 8px 0 0" }}>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(155deg, #d4955e 0%, #b87245 55%, #9a5a30 100%)" }}
            />
            {/* Ribbon stripe on lid */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2"
              style={{ width: 28, background: "linear-gradient(90deg, #f0c040, #e89800, #f0c040)" }}
            />
            {/* Lid shine */}
            <div
              className="absolute top-0 inset-x-0 h-3 opacity-30"
              style={{ background: "linear-gradient(180deg, white, transparent)" }}
            />
          </div>
        </motion.div>

        {/* BOX BODY */}
        <div className="relative overflow-hidden" style={{ width: 204, height: 164, borderRadius: "0 0 10px 10px" }}>
          {/* Box face */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(150deg, #c8905e 0%, #aa6e40 55%, #8c5030 100%)" }}
          />
          {/* Polka dot texture */}
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.06,
              backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Vertical ribbon */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{ width: 28, background: "linear-gradient(90deg, #f0c040, #e89800, #f0c040)" }}
          />
          {/* Horizontal ribbon */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            style={{ height: 28, background: "linear-gradient(180deg, #f0c040, #e89800, #f0c040)" }}
          />
          {/* Ribbon intersection knot */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 28, height: 28,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle at 35% 35%, #fef3c7, #d4a017)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 2,
            }}
          />
          {/* Right shadow panel */}
          <div
            className="absolute inset-y-0 right-0 w-10"
            style={{ opacity: 0.18, background: "linear-gradient(90deg, transparent, black)" }}
          />
          {/* Bottom shadow */}
          <div
            className="absolute bottom-0 inset-x-0 h-8"
            style={{ opacity: 0.12, background: "linear-gradient(180deg, transparent, black)" }}
          />
          {/* Top shine */}
          <div
            className="absolute top-0 inset-x-0 h-4"
            style={{ opacity: 0.18, background: "linear-gradient(180deg, white, transparent)" }}
          />

          {/* Inner glow revealed on open */}
          <AnimatePresence>
            {clicked && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 10 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at center, rgba(255,240,150,0.9) 0%, rgba(255,240,150,0) 70%)" }}
                />
                <motion.span
                  className="text-5xl relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.6, ease: "backOut" }}
                >
                  🎂
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drop shadow */}
        <div
          className="mt-2 rounded-full pointer-events-none"
          style={{
            width: 180, height: 14,
            opacity: 0.22,
            background: "radial-gradient(ellipse, #8b5230, transparent)",
            filter: "blur(7px)",
          }}
        />
      </motion.div>

      {/* Hint text */}
      <motion.p
        className="mt-10 font-script text-xl"
        style={{ color: "hsl(22, 22%, 40%)" }}
        animate={{ opacity: clicked ? 0 : [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: clicked ? 0 : Infinity }}
      >
        Tap to open your gift 🎀
      </motion.p>
    </motion.div>
  );
};

export default GiftBox;
