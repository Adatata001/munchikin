import { useEffect, useRef, useState } from "react";
import { lovePoem } from "@/data/quizData";

interface LovePoemProps {
  onComplete: () => void;
}

const LovePoem = ({ onComplete }: LovePoemProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const poemLines = lovePoem.split("\n");

  useEffect(() => {
    // Fade in
    setTimeout(() => setOpacity(1), 100);

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Calculate total scroll distance
    const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const duration = 30000; // 30 seconds
    const startTime = performance.now();

    let animationId: number;

    const smoothScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeInOut for smoother motion
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      scrollContainer.scrollTop = easeProgress * scrollHeight;

      if (progress < 1) {
        animationId = requestAnimationFrame(smoothScroll);
      } else {
        setTimeout(onComplete, 2000);
      }
    };

    // Start scrolling after a brief pause
    setTimeout(() => {
      animationId = requestAnimationFrame(smoothScroll);
    }, 1500);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <div 
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-secondary to-background overflow-hidden"
      style={{ opacity, transition: 'opacity 1s ease-in' }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 pt-8">
        A Poem For You 💙
      </h2>
      
      <div
        ref={scrollRef}
        className="flex-1 overflow-hidden px-8 w-full max-w-lg"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="py-[40vh] space-y-6 text-center">
          {poemLines.map((line, index) => {
            const isStanzaEnd = (index + 1) % 4 === 0 && index !== poemLines.length - 1;
            
            return (
              <div key={index}>
                <p 
                  className="text-xl md:text-2xl text-foreground leading-relaxed font-serif italic"
                >
                  {line || <br />}
                </p>
                {isStanzaEnd && <div className="h-8" />}
              </div>
            );
          })}
          
          <div className="text-4xl pt-8 pb-[30vh]">
            💙
          </div>
        </div>
      </div>
    </div>
  );
};

export default LovePoem;
