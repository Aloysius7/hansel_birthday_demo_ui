import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import GiftBox from "@/components/GiftBox";
import HeroSection from "@/components/HeroSection";
import CheersSection from "@/components/CheersSection";
import ImageParallax from "@/components/ImageParallax";
import PoemSection from "@/components/PoemSection";
import ConfettiCelebration from "@/components/ConfettiCelebration";

type Phase = "loading" | "gift" | "main";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("loading");
  const [showPoem, setShowPoem] = useState(false);

  const handleLoadingComplete = useCallback(() => setPhase("gift"), []);
  const handleGiftOpen = useCallback(() => setPhase("main"), []);

  useEffect(() => {
    const handler = () => setShowPoem(false);
    window.addEventListener("birthday-restart", handler);
    return () => window.removeEventListener("birthday-restart", handler);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
        {phase === "gift" && (
          <GiftBox key="gift" onOpen={handleGiftOpen} />
        )}
      </AnimatePresence>

      {phase === "main" && (
        <div
          id="main-scroll-container"
          style={{
            height: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
            scrollSnapType: "y mandatory",
          }}
        >
          <HeroSection />
          <CheersSection />
          <ImageParallax onPoemOpen={() => setShowPoem(true)} />
          <AnimatePresence>
            {showPoem && (
              <>
                <PoemSection />
                <ConfettiCelebration />
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Index;
