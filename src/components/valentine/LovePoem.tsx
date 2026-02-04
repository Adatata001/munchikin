import { useEffect, useState, useRef } from "react";
import { lovePoem } from "@/data/quizData";

interface LovePoemProps {
  onComplete: () => void;
}

const LovePoem = ({ onComplete }: LovePoemProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const poemLines = lovePoem.split("\n");

  useEffect(() => {
    const duration = 30000; // 30 seconds for full scroll
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setScrollProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Wait a moment then proceed
        setTimeout(onComplete, 2000);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-secondary to-background p-8 overflow-hidden"
    >
      <div 
        className="text-center transition-transform duration-100"
        style={{
          transform: `translateY(${50 - scrollProgress * 150}vh)`,
        }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-12">
          A Poem For You 💙
        </h2>
        
        <div className="space-y-6 max-w-lg mx-auto">
          {poemLines.map((line, index) => {
            // Group lines into stanzas (every 4 lines is a stanza)
            const isStanzaEnd = (index + 1) % 4 === 0 && index !== poemLines.length - 1;
            
            return (
              <div key={index}>
                <p 
                  className="text-xl md:text-2xl text-foreground leading-relaxed font-serif italic"
                  style={{
                    opacity: Math.max(0, Math.min(1, scrollProgress * 3 - index * 0.1)),
                  }}
                >
                  {line || <br />}
                </p>
                {isStanzaEnd && <div className="h-8" />}
              </div>
            );
          })}
        </div>

        <div 
          className="mt-16 text-4xl"
          style={{
            opacity: Math.max(0, scrollProgress - 0.8) * 5,
          }}
        >
          💙
        </div>
      </div>
    </div>
  );
};

export default LovePoem;
