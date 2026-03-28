import { motion, useInView } from "framer-motion";
import React, { useRef, RefObject, useEffect } from "react";
import GallerySection from "@/components/GallerySection";
import hanselLeft from "@/assets/ST1_1.jpeg";
import hanselRight from "@/assets/ST1_2.jpeg";
import shantelleImg from "@/assets/Shan.jpeg";
import chanelleImg from "@/assets/Chan.jpeg";
import natashaImg from "@/assets/Nuts 2.jpeg";
import rahulImg from "@/assets/Screenshot from 2026-03-29 02-42-16.png";
import mathewImg from "@/assets/mATH.jpeg";
import aloyImg from "@/assets/ST2_2.jpeg";

interface PoemStanzaProps {
  title: string;
  lines: string[];
  emoji: string;
  name: string;
  imageRight?: string;
  imageLeft?: string;
  imageCenterRight?: string | "placeholder";
  imageCenterRightFromTop?: string | "placeholder";
  imageTopLeft?: string | "placeholder";
  imageSingleLeft?: "placeholder" | string;
  imagePairLeft?: "placeholder" | string;
  imageSingleRight?: "placeholder" | string;
  splitTextRight?: boolean;
  containerRef: RefObject<HTMLDivElement>;
  colorScheme: {
    bg1: string;
    bg2: string;
    accent: string;
    cardBg: string;
  };
}

const BookPageBg = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
    {Array.from({ length: 24 }, (_, i) => (
      <div
        key={i}
        className="w-full border-b"
        style={{ borderColor: "#8B6914", height: "2.2rem" }}
      />
    ))}
    <div
      className="absolute top-0 bottom-0 w-px"
      style={{ left: "12%", background: "#C25B5B" }}
    />
  </div>
);

const PoemStanza = ({ title, lines, emoji, name, imageRight, imageLeft, imageCenterRight, imageCenterRightFromTop, imageTopLeft, imageSingleLeft, imagePairLeft, imageSingleRight, splitTextRight, containerRef, colorScheme }: PoemStanzaProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { root: containerRef, amount: 0.8 });
  const isSplitLeft    = !!imageCenterRight;         // Natasha/Shantelle: image bottom-right ↑, text from left
  const isSplitLeftTop = !!imageCenterRightFromTop;  // Mathew: image top-right ↓, text from left
  const isSplitRight   = !!splitTextRight;           // Chanelle/Rahul: image bottom-left ↑, text from right
  const isSplitRightTop = !!imageTopLeft;            // Aloy: image top-left ↓, text from bottom-right
  const isThreeCol     = !!(imagePairLeft || imageSingleLeft); // Hansel: imgs left + text center + img right
  const isAnySplit = isSplitLeft || isSplitLeftTop || isSplitRight || isSplitRightTop || isThreeCol;

  return (
    <section
      ref={sectionRef}
      id={`stanza-${name}`}
      className={`relative flex overflow-hidden stanza-section-${name}`}
      style={{
        height: "100vh",
        flexShrink: 0,
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        alignItems: "center",
        justifyContent: isThreeCol ? "space-between" : isAnySplit ? "space-between" : "center",
        padding: isAnySplit ? "0" : "5rem 1rem",
        background: `linear-gradient(180deg, ${colorScheme.bg1}, ${colorScheme.bg2})`,
      }}
    >
      <BookPageBg />

      {/* ── HANSEL 3-column: [img left] [text center] [1 img right] ── */}
      {isThreeCol && (
        <>
          {/* Left column — single image slides from left (order: 1) */}
          <motion.div
            className={`flex items-center justify-center stanza-single-left-${name}`}
            style={{ width: "28%", height: "100%", zIndex: 1, flexShrink: 0, padding: "1.5rem 0.5rem", order: 1 }}
            animate={{ x: isInView ? 0 : "-120%" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {imageSingleLeft && <img src={imageSingleLeft} alt="" style={{ maxHeight: "70%", maxWidth: "100%", objectFit: "contain" }} />}
          </motion.div>

          {/* Right column — one image slides from right (order: 3) */}
          {imageSingleRight && (
            <motion.div
              className={`flex items-center justify-center stanza-single-right-${name}`}
              style={{ width: "28%", height: "100%", zIndex: 1, flexShrink: 0, padding: "1.5rem 0.5rem", order: 3 }}
              animate={{ x: isInView ? 0 : "120%" }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {imageSingleRight && <img src={imageSingleRight} alt="" style={{ maxHeight: "70%", maxWidth: "100%", objectFit: "contain" }} />}
            </motion.div>
          )}
        </>
      )}

      {/* ── CHANELLE layout: image center-left + text center-right ── */}
      {isSplitRight && imageLeft && (
        <motion.div
          className={`flex items-center justify-center stanza-img-center-left-${name}`}
          style={{ width: "48%", height: "100%", zIndex: 1, flexShrink: 0 }}
          animate={{ x: isInView ? 0 : "-100%", y: isInView ? 0 : "100%" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {imageLeft && <img src={imageLeft} alt="" style={{ maxHeight: "70%", maxWidth: "100%", objectFit: "contain" }} />}
        </motion.div>
      )}

      {/* ── Bottom-anchored right image (legacy / future use) ── */}
      {imageRight && !isSplitRight && (
        <motion.img
          src={imageRight}
          alt=""
          className={`absolute bottom-0 right-0 pointer-events-none select-none stanza-img-right-${name}`}
          style={{ height: "65%", width: "auto", maxWidth: "42%", objectFit: "contain", objectPosition: "bottom right", zIndex: 1 }}
          animate={{ x: isInView ? 0 : "110%" }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}

      {/* ── Bottom-anchored left image (legacy / future use) ── */}
      {imageLeft && !isSplitRight && (
        <motion.img
          src={imageLeft}
          alt=""
          className={`absolute bottom-0 left-0 pointer-events-none select-none stanza-img-left-${name}`}
          style={{ height: "65%", width: "auto", maxWidth: "42%", objectFit: "contain", objectPosition: "bottom left", zIndex: 1 }}
          animate={{ x: isInView ? 0 : "-110%" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}

      {/* ── MATHEW layout: image center-right slides DOWN from top ── */}
      {isSplitLeftTop && (
        <motion.div
          className={`flex items-center justify-center stanza-img-center-right-top-${name}`}
          style={{ width: "48%", height: "100%", zIndex: 1, order: 2, flexShrink: 0 }}
          animate={{ y: isInView ? 0 : "-110%" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {imageCenterRightFromTop && <img src={imageCenterRightFromTop} alt="" style={{ maxHeight: "70%", maxWidth: "100%", objectFit: "contain" }} />}
        </motion.div>
      )}

      {/* ── ALOY layout: image top-left ↓ to left-center, text bottom-right ↑ to right-center ── */}
      {isSplitRightTop && (
        <motion.div
          className={`flex items-center justify-center stanza-img-top-left-${name}`}
          style={{ width: "48%", height: "100%", zIndex: 1, order: 1, flexShrink: 0 }}
          animate={{ x: isInView ? 0 : "-100%", y: isInView ? 0 : "-100%" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {imageTopLeft && <img src={imageTopLeft} alt="" style={{ maxHeight: "70%", maxWidth: "100%", objectFit: "contain" }} />}
        </motion.div>
      )}

      {/* ── NATASHA layout: image center-right slides up from bottom ── */}
      {isSplitLeft && (
        <motion.div
          className={`flex items-center justify-center stanza-img-center-right-${name}`}
          style={{ width: "48%", height: "100%", zIndex: 1, order: 2, flexShrink: 0 }}
          animate={{ y: isInView ? 0 : "110%" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {imageCenterRight && <img src={imageCenterRight} alt="" style={{ maxHeight: "70%", maxWidth: "100%", objectFit: "contain" }} />}
        </motion.div>
      )}

      {/* ── Content block ── */}
      <motion.div
        className={`relative z-10 stanza-content-${name}`}
        style={{
          width: isThreeCol ? "40%" : isAnySplit ? "48%" : undefined,
          maxWidth: isThreeCol ? "40%" : isAnySplit ? "48%" : "42rem",
          height: isAnySplit ? "100%" : undefined,
          display: isAnySplit ? "flex" : undefined,
          flexDirection: isAnySplit ? "column" : undefined,
          justifyContent: isAnySplit ? "center" : undefined,
          padding: isAnySplit ? "2rem" : undefined,
          textAlign: "center",
          order: isThreeCol ? 2 : (isSplitRight || isSplitRightTop) ? 2 : 1,
          flexShrink: 0,
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: (isSplitLeft || isSplitLeftTop) ? (isInView ? 0 : -80)
           : (isSplitRight || isSplitRightTop) ? (isInView ? 0 : 100)
           : 0,
          y: isSplitRight   ? (isInView ? 0 : -80)
           : isSplitRightTop ? (isInView ? 0 : 100)
           : !isAnySplit      ? (isInView ? 0 : 40)
           : 0,
        }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
      >
        {emoji && (
          <div className={`text-5xl mb-4 stanza-emoji-${name}`}>{emoji}</div>
        )}

        {title && (
          <h3
            className={`font-display text-3xl md:text-4xl font-bold mb-6 stanza-title-${name}`}
            style={{ color: colorScheme.accent }}
          >
            {title}
          </h3>
        )}

        <div
          className={`backdrop-blur-sm rounded-2xl p-8 md:p-10 relative overflow-hidden stanza-card-${name}`}
          style={{
            background: colorScheme.cardBg,
            boxShadow: `0 8px 32px ${colorScheme.accent}15`,
          }}
        >
          {/* Book corner fold */}
          <div
            className="absolute top-0 right-0 w-12 h-12"
            style={{
              background: `linear-gradient(225deg, ${colorScheme.bg1} 50%, ${colorScheme.accent}15 50%)`,
            }}
          />

          {lines.map((line, i) => (
            <motion.p
              key={i}
              className={`font-body text-lg md:text-xl leading-relaxed mb-2 italic stanza-line-${name}`}
              style={{ color: `${colorScheme.accent}cc` }}
              animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : (i % 2 === 0 ? -20 : 20),
              }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const poemData = [
  {
    name: "hansel",
    title: "The Big Boy — Hansel",
    emoji: "🧑‍🏫",
    imageRight: undefined as string | undefined,
    imageLeft: undefined as string | undefined,
    imageSingleLeft: hanselLeft,
    imageSingleRight: hanselRight,
    lines: [
      "Here stands a man they call Big Boy,",
      "Whose cheerful smile brings so much joy.",
      "He lifts the weights with squats and might,",
      "Deadlifts heavy from morning to night.",
      "A chubby king with a heart of gold,",
      "An English teacher, brave and bold.",
      "He loves the children, guides them true,",
      "Always helping — that's what he'll do.",
    ],
    colorScheme: { bg1: "hsl(22, 30%, 88%)", bg2: "hsl(25, 35%, 82%)", accent: "#8B6914", cardBg: "rgba(255, 248, 230, 0.7)" },
  },
  {
    name: "aloy",
    title: "",
    emoji: "",
    imageRight: undefined as string | undefined,
    imageLeft: undefined as string | undefined,
    imageTopLeft: aloyImg as string | undefined,
    lines: [
      "For fifteen years we've known each other, from the day you first came by,",
      "That first year we were opps — just two sparks that wouldn't lie.",
      "From tuition days to one wild crew, growing closer through it all,",
      "That Batista Bomb at Vanessa Miss' — I still remember that fall.",
      "VAT 69 broke at your place, hide-and-seek gone out of track,",
      "Through every mess you stood beside me, always having my back.",
      "More than blood, a brother true, whenever I needed assist you'd appear,",
      "If friendship's measured as a win — I chose the right one here.",
    ],
    colorScheme: { bg1: "hsl(210, 25%, 90%)", bg2: "hsl(215, 30%, 85%)", accent: "#2C5F8A", cardBg: "rgba(230, 240, 255, 0.7)" },
  },
  {
    name: "shantelle",
    title: "",
    emoji: "",
    imageRight: undefined as string | undefined,
    imageLeft: undefined as string | undefined,
    imageCenterRight: shantelleImg,
    lines: [
      "I'd call you dramatic, annoying, and painfully unfunny too,",
      "Yet somehow still caring and understanding — that's just you.",
      "You speak with such confidence, even when you're wrong,",
      "Convincing us all your logic somehow belongs.",
      "Making people question what they thought they knew,",
      "Till we second-guess ourselves while arguing with you.",
      "And that big forehead too — somehow bigger than mine,",
      "Still carrying all that confidence every single time.",
      "But beneath the chaos and the jokes that never land,",
      "You're the kind who still shows up… and always understands. 😄",
    ],
    colorScheme: { bg1: "hsl(330, 30%, 90%)", bg2: "hsl(335, 35%, 85%)", accent: "#9B3A6A", cardBg: "rgba(255, 230, 245, 0.7)" },
  },
  {
    name: "chanelle",
    title: "",
    emoji: "",
    imageRight: undefined as string | undefined,
    imageLeft: chanelleImg,
    splitTextRight: true,
    lines: [
      "From family ties to a friendship that naturally grew,",
      "What started long ago turned meaningful and true.",
      "With cracked, chaotic energy and laughter all around,",
      "You're the kind of fun and reliability that's rarely found.",
      "Someone I can talk to, no judgment, just you being you,",
      "And Matheran showed colours I never fully knew.",
      "That trip, those moments, still make me smile within —",
      "One of my best memories… and a friendship I'll always win.",
    ],
    colorScheme: { bg1: "hsl(350, 30%, 92%)", bg2: "hsl(10, 35%, 88%)", accent: "#C25B5B", cardBg: "rgba(255, 235, 235, 0.7)" },
  },
  {
    name: "natasha",
    title: "",
    emoji: "",
    imageRight: undefined as string | undefined,
    imageLeft: undefined as string | undefined,
    imageCenterRight: natashaImg,
    lines: [
      "Known you long before, our dads already tied the line,",
      "But church days and RYVM made your friendship truly mine.",
      "Goofy and fun — the group's own guiding light,",
      "A dancing king, yet thoughtful, warm, and always kind.",
      "The \"dad\" of us all, like a sweet older brother you've been,",
      "And in Matheran's haunted house, when I was scared within,",
      "You stayed right beside me, made sure I'd be alright —",
      "That's just who you are… steady, caring, and bright. 😂",
    ],
    colorScheme: { bg1: "hsl(270, 25%, 92%)", bg2: "hsl(275, 30%, 87%)", accent: "#7B4FAE", cardBg: "rgba(240, 230, 255, 0.7)" },
  },
  {
    name: "rahul",
    title: "",
    emoji: "",
    imageRight: undefined as string | undefined,
    imageLeft: rahulImg,
    splitTextRight: true,
    lines: [
      "From school hallways is where I first knew your name,",
      "But those walks back home brought us closer all the same,",
      "Step by step, the distance turned to laughter we'd share,",
      "Till friendship grew quietly, without us aware.",
      "Then fate hit reset in the gym one day —",
      "Old bonds returned in their own strong way,",
      "From then till now, the story wrote itself in rhythm —",
      "Reignited in iron… and the rest is history with him. 💪✨",
    ],
    colorScheme: { bg1: "hsl(160, 25%, 90%)", bg2: "hsl(165, 30%, 85%)", accent: "#2A7A5A", cardBg: "rgba(230, 255, 245, 0.7)" },
  },
  {
    name: "mathew",
    title: "",
    emoji: "",
    imageRight: undefined as string | undefined,
    imageLeft: undefined as string | undefined,
    imageCenterRightFromTop: mathewImg,
    lines: [
      "Met you first as a customer, through our mothers by chance,",
      "No one would take me as a student — too mischievous at first glance.",
      "But somehow you did, with patience calm and true,",
      "A speaker so wise, with words that always came through.",
      "When life fell apart and the world turned dim,",
      "When she left and I broke — I ran straight to him.",
      "More than a friend, a good human being through and through,",
      "In my hardest moments, Hansel… I found strength in you.",
    ],
    colorScheme: { bg1: "hsl(35, 35%, 90%)", bg2: "hsl(40, 40%, 85%)", accent: "#B8860B", cardBg: "rgba(255, 245, 225, 0.7)" },
  },
  {
    name: "closing",
    title: "To Our Dearest Hansel",
    emoji: "🎂",
    imageRight: undefined as string | undefined,
    imageLeft: undefined as string | undefined,
    lines: [
      "So here's to you, our dearest friend,",
      "A love for you that has no end.",
      "We tease, we joke, we push your nerve,",
      "But all this love is what you deserve.",
      "Happy Birthday, Big Boy — cheers to you! 🥂",
    ],
    colorScheme: { bg1: "hsl(37, 50%, 90%)", bg2: "hsl(22, 40%, 85%)", accent: "#A98B76", cardBg: "rgba(243, 228, 201, 0.7)" },
  },
];

const snapSectionStyle: React.CSSProperties = {
  height: "100vh",
  flexShrink: 0,
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
};

const CheersSnapSection = () => {
  const ref = useRef<HTMLElement>(null);
  // Use window IntersectionObserver — fine since this is just for enter animation
  const isInView = useInView(ref, { amount: 0.6, once: false });

  const confetti = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.3) % 90}%`,
    color: ["#f0c060", "#A98B76", "#BFA28C", "#BABF94", "#e8d5b7", "#d4a574"][i % 6],
    size: 6 + (i % 5),
    duration: 2.5 + (i % 3) * 0.6,
    delay: (i * 0.18) % 2,
  }));

  return (
    <section
      ref={ref}
      style={{
        ...snapSectionStyle,
        background: "linear-gradient(160deg, hsl(37,60%,88%), hsl(22,40%,82%), hsl(40,55%,86%))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* falling confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          style={{
            position: "absolute",
            top: 0,
            left: c.left,
            width: c.size,
            height: c.size,
            background: c.color,
            borderRadius: c.id % 2 === 0 ? "50%" : "2px",
            pointerEvents: "none",
          }}
          animate={isInView ? { y: "105vh", opacity: [0, 1, 1, 0], rotate: 540 } : { y: -20, opacity: 0 }}
          transition={{ duration: c.duration, delay: c.delay, ease: "easeIn", repeat: isInView ? Infinity : 0 }}
        />
      ))}

      <motion.div
        style={{ textAlign: "center", padding: "2rem", zIndex: 1 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.p
          style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "1rem" }}
          animate={isInView ? { rotate: [-8, 8, -8], scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          🎉
        </motion.p>

        <h2
          className="font-display font-bold"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "hsl(22,30%,35%)", marginBottom: "0.75rem" }}
        >
          Cheers!
        </h2>

        <p
          className="font-script"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "hsl(22,22%,50%)", marginBottom: "2rem" }}
        >
          Here's to another amazing year, Hansel!
        </p>

        <motion.div
          style={{ display: "flex", justifyContent: "center", gap: "0.75rem", fontSize: "2rem" }}
          animate={isInView ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🥂 ✨ 🎊 ✨ 🥂
        </motion.div>
      </motion.div>
    </section>
  );
};

const GallerySnapSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // unlock outer snap container so user can scroll freely in gallery
          const outer = document.getElementById("main-scroll-container") as HTMLElement | null;
          if (outer) outer.style.overflowY = "scroll";
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="gallery-snap-wrapper"
      ref={ref}
      style={{
        ...snapSectionStyle,
        overflowY: "auto",
        overscrollBehavior: "contain",
      }}
    >
      <GallerySection />
    </div>
  );
};

const PoemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getOuter = () =>
      document.getElementById("main-scroll-container") as HTMLElement | null;

    // Lock outer snap container scroll when poem section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const outer = getOuter();
        if (!outer) return;
        outer.style.overflowY = entry.isIntersecting ? "hidden" : "scroll";
      },
      { threshold: 0.5 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      const outer = getOuter();
      if (outer) outer.style.overflowY = "scroll";
    };
  }, []);

  return (
    <motion.div
      id="poem-section"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      {poemData.map((stanza) => (
        <PoemStanza
          key={stanza.name}
          name={stanza.name}
          title={stanza.title}
          lines={stanza.lines}
          emoji={stanza.emoji}
          imageRight={stanza.imageRight}
          imageLeft={stanza.imageLeft}
          imageCenterRight={"imageCenterRight" in stanza ? stanza.imageCenterRight : undefined}
          imageCenterRightFromTop={"imageCenterRightFromTop" in stanza ? stanza.imageCenterRightFromTop : undefined}
          imageTopLeft={"imageTopLeft" in stanza ? stanza.imageTopLeft : undefined}
          imageSingleLeft={"imageSingleLeft" in stanza ? stanza.imageSingleLeft as string : undefined}
          imageSingleRight={"imageSingleRight" in stanza ? stanza.imageSingleRight as string : undefined}
          splitTextRight={"splitTextRight" in stanza ? stanza.splitTextRight : undefined}
          containerRef={containerRef}
          colorScheme={stanza.colorScheme}
        />
      ))}

      {/* ── Cheers snap section ── */}
      <CheersSnapSection />

      {/* ── Gallery snap section — unlocks body scroll when reached ── */}
      <GallerySnapSection />
    </motion.div>
  );
};

export default PoemSection;
