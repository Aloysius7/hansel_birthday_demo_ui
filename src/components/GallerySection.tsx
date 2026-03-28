import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import mirrors0 from "@/assets/WhatsApp Image 2026-03-28 at 11.18.52 PM.jpeg";
import mirrors1 from "@/assets/WhatsApp Image 2026-03-27 at 11.51.36 PM.jpeg";
import mirrors2 from "@/assets/WhatsApp Image 2026-03-28 at 11.17.56 PM.jpeg";
import mirrors3 from "@/assets/WhatsApp Image 2026-03-28 at 11.17.45 PM.jpeg";
import mirrors4 from "@/assets/WhatsApp Image 2026-03-27 at 11.51.36 PM (2).jpeg";
import mirrors5 from "@/assets/WhatsApp Image 2026-03-28 at 11.18.27 PM.jpeg";
import mirrors6 from "@/assets/WhatsApp Image 2026-03-27 at 11.51.37 PM.jpeg";
import mirrors7 from "@/assets/WhatsApp Image 2026-03-27 at 11.51.36 PM (1).jpeg";
import mirrors8 from "@/assets/WhatsApp Image 2026-03-28 at 11.19.27 PM.jpeg";
import cool0 from "@/assets/WhatsApp Image 2026-03-27 at 11.54.10 PM.jpeg";
import cool1 from "@/assets/WhatsApp Image 2026-03-28 at 12.03.12 AM.jpeg";
import cool2 from "@/assets/WhatsApp Image 2026-03-28 at 12.00.44 AM.jpeg";
import cool3 from "@/assets/WhatsApp Image 2026-03-27 at 11.55.01 PM.jpeg";
import cool4 from "@/assets/WhatsApp Image 2026-03-28 at 11.59.47 PM.jpeg";
import cool5 from "@/assets/WhatsApp Image 2026-03-27 at 11.54.11 PM.jpeg";
import cool6 from "@/assets/WhatsApp Image 2026-03-27 at 11.55.30 PM.jpeg";
import cool7 from "@/assets/WhatsApp Image 2026-03-28 at 12.03.12 AM (1).jpeg";
import cool8 from "@/assets/WhatsApp Image 2026-03-27 at 11.54.11 PM (1).jpeg";
import group0 from "@/assets/WhatsApp Image 2026-03-28 at 9.22.29 PM.jpeg";
import group1 from "@/assets/WhatsApp Image 2026-03-27 at 11.55.04 PM.jpeg";
import group2 from "@/assets/WhatsApp Image 2026-03-29 at 12.05.14 AM (1).jpeg";
import group3 from "@/assets/WhatsApp Image 2026-03-28 at 11.25.43 PM.jpeg";
import group4 from "@/assets/WhatsApp Image 2026-03-29 at 12.03.42 AM.jpeg";
import group5 from "@/assets/WhatsApp Image 2026-03-28 at 11.58.36 PM.jpeg";
import group6 from "@/assets/WhatsApp Image 2026-03-29 at 12.05.14 AM.jpeg";
import group7 from "@/assets/WhatsApp Image 2026-03-27 at 11.58.07 PM.jpeg";
import group8 from "@/assets/WhatsApp Image 2026-03-28 at 11.22.49 PM.jpeg";

const categoryImages: Record<string, string[]> = {
  mirrors: [mirrors0,mirrors1,mirrors2,mirrors3,mirrors4,mirrors5,mirrors6,mirrors7,mirrors8],
  cool: [cool0,cool1,cool2,cool3,cool4,cool5,cool6,cool7,cool8],
  group: [group0,group1,group2,group3,group4,group5,group6,group7,group8],
};

type GalleryCategory = "mirrors" | "cool" | "group" | null;

const categoryColors: Record<string, { bg: string; card: string; accent: string; text: string }> = {
  mirrors: {
    bg: "linear-gradient(180deg, #FFFBF1, #FFF2D0)",
    card: "rgba(255, 178, 178, 0.15)",
    accent: "#E36A6A",
    text: "#E36A6A",
  },
  cool: {
    bg: "linear-gradient(180deg, #F2EAE0, #B4D3D9)",
    card: "rgba(189, 166, 206, 0.15)",
    accent: "#9B8EC7",
    text: "#9B8EC7",
  },
  group: {
    bg: "linear-gradient(180deg, #E4DFB5, #C3CC9B)",
    card: "rgba(154, 177, 122, 0.2)",
    accent: "#9AB17A",
    text: "#9AB17A",
  },
};

const GalleryGrid = ({
  category,
  images,
  onBack,
  onSwitchCategory,
}: {
  category: string;
  images: string[];
  onBack: () => void;
  onSwitchCategory: (cat: GalleryCategory) => void;
}) => {
  const colors = categoryColors[category];
  const rows: number[][] = [];
  let idx = 0;
  let single = true;
  while (idx < images.length) {
    if (single) {
      rows.push([idx]);
      idx++;
    } else {
      rows.push(images.slice(idx, idx + 2).map((_, i) => idx + i));
      idx += 2;
    }
    single = !single;
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-8 space-y-6 px-4"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
    >
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex gap-4 justify-center ${row.length === 1 ? "px-8 md:px-24" : ""}`}
        >
          {row.map((imgIdx) => (
            <motion.div
              key={`${category}-${imgIdx}`}
              className={`rounded-xl overflow-hidden cursor-pointer ${
                row.length === 1 ? "w-full aspect-[4/3]" : "w-1/2 aspect-square"
              }`}
              style={{
                background: colors.card,
                boxShadow: `0 8px 24px ${colors.accent}22`,
              }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: imgIdx * 0.08 }}
            >
              <img src={images[imgIdx]} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      ))}

      {/* Bottom navigation buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-12 pb-8">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.key}
            className="btn-birthday text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onClick={() => {
              onSwitchCategory(cat.key);
            }}
          >
            {cat.emoji} {cat.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const categories: { key: GalleryCategory; label: string; emoji: string }[] = [
  { key: "mirrors", label: "Mirror selfies", emoji: "🦁" },
  { key: "cool", label: "Me when I look cool", emoji: "😜" },
  { key: "group", label: "Group Photos", emoji: "👪" },
];

const GallerySection = () => {
  const [active, setActive] = useState<GalleryCategory>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSwitchCategory = (cat: GalleryCategory) => {
    setActive(null);
    setTimeout(() => {
      const wrapper = document.getElementById("gallery-snap-wrapper");
      (wrapper ?? ref.current)?.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setActive(cat), 400);
    }, 100);
  };

  const sectionBg = active && categoryColors[active]
    ? categoryColors[active].bg
    : "var(--gradient-hero)";

  return (
    <section id="gallery-section" ref={ref} className="relative min-h-screen py-20 px-4 transition-all duration-700" style={{ background: sectionBg }}>
      <div className="text-center mb-12">
        <motion.p
          className="font-script text-2xl md:text-3xl mb-2"
          style={{ color: "hsl(22,22%,52%)" }}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          And now
        </motion.p>
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold mb-4"
          style={{ color: "hsl(var(--warm-brown))" }}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          My Greatest Photos 📸
        </motion.h2>
        <motion.p
          className="font-body text-lg text-muted-foreground"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          These are some of my great photos, please view
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.key}
            className={`btn-birthday text-base ${active === cat.key ? "ring-2 ring-offset-2" : ""}`}
            style={active === cat.key ? { boxShadow: `0 0 20px ${categoryColors[cat.key!]?.accent}55` } : {}}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
            onClick={() => setActive(active === cat.key ? null : (cat.key as GalleryCategory))}
          >
            {cat.emoji} {cat.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <GalleryGrid
            key={active}
            category={active}
            images={categoryImages[active] ?? []}
            onBack={() => setActive(null)}
            onSwitchCategory={handleSwitchCategory}
          />
        )}
      </AnimatePresence>

      {!active && (
        <motion.p
          className="text-center text-muted-foreground font-script text-xl mt-12"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↑ Pick a category to explore ↑
        </motion.p>
      )}

      {/* Back to Start button */}
      <motion.div className="flex justify-center mt-16">
        <motion.button
          className="btn-birthday text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const outer = document.getElementById("main-scroll-container") as HTMLElement | null;
            if (outer) {
              outer.style.overflowY = "scroll";
              outer.style.scrollSnapType = "y mandatory";
              outer.scrollTo({ top: 0, behavior: "smooth" });
            }
            window.dispatchEvent(new CustomEvent("birthday-restart"));
          }}
        >
          ⬆️ Back to Start
        </motion.button>
      </motion.div>
    </section>
  );
};

export default GallerySection;
