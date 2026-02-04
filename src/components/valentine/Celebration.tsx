import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";

interface CelebrationProps {
  onSelectQuestionCount: (count: number) => void;
}

// Fireworks animation data (inline to avoid external dependency)
const fireworksAnimation = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "firework",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [100] }, { t: 60, s: [0] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 30, s: [100, 100, 100] }] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", s: { a: 0, k: [20, 20] }, p: { a: 0, k: [0, -80] } },
            { ty: "fl", c: { a: 0, k: [0.4, 0.6, 1, 1] } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ]
        },
        {
          ty: "gr",
          it: [
            { ty: "el", s: { a: 0, k: [15, 15] }, p: { a: 0, k: [60, -50] } },
            { ty: "fl", c: { a: 0, k: [0.8, 0.4, 0.8, 1] } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 45 }, o: { a: 0, k: 100 } }
          ]
        },
        {
          ty: "gr",
          it: [
            { ty: "el", s: { a: 0, k: [18, 18] }, p: { a: 0, k: [-55, -55] } },
            { ty: "fl", c: { a: 0, k: [1, 0.6, 0.4, 1] } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: -45 }, o: { a: 0, k: 100 } }
          ]
        },
        {
          ty: "gr",
          it: [
            { ty: "el", s: { a: 0, k: [12, 12] }, p: { a: 0, k: [80, 0] } },
            { ty: "fl", c: { a: 0, k: [0.4, 0.9, 0.6, 1] } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 90 }, o: { a: 0, k: 100 } }
          ]
        },
        {
          ty: "gr",
          it: [
            { ty: "el", s: { a: 0, k: [16, 16] }, p: { a: 0, k: [-70, 30] } },
            { ty: "fl", c: { a: 0, k: [1, 0.8, 0.2, 1] } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 135 }, o: { a: 0, k: 100 } }
          ]
        }
      ]
    }
  ]
};

const Celebration = ({ onSelectQuestionCount }: CelebrationProps) => {
  const [showFireworks, setShowFireworks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Create multiple fireworks at random positions
    const createFirework = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 100;
      const y = Math.random() * 60;
      setShowFireworks(prev => [...prev, { id, x, y }]);
      
      // Remove firework after animation
      setTimeout(() => {
        setShowFireworks(prev => prev.filter(f => f.id !== id));
      }, 2000);
    };

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(createFirework, i * 200);
    }

    // Continuous fireworks
    const interval = setInterval(createFirework, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 relative overflow-hidden">
      {/* Fireworks */}
      {showFireworks.map(fw => (
        <div
          key={fw.id}
          className="absolute pointer-events-none"
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
        >
          <Lottie
            animationData={fireworksAnimation}
            loop={false}
            style={{ width: 200, height: 200 }}
          />
        </div>
      ))}

      <div className="flex flex-col items-center gap-8 max-w-2xl text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-primary animate-bounce">
          YAAAAAYY!!! 🎉
        </h1>
        
        <p className="text-lg md:text-xl text-foreground leading-relaxed">
          To start the countdown, choose how many random questions you can answer from your favourite K-pop idols <span className="font-bold text-primary">Stray Kids</span> and your favorite <span className="font-bold text-primary">Thai BL actors and movies</span> 💙
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {[10, 20, 30].map(count => (
            <Button
              key={count}
              onClick={() => onSelectQuestionCount(count)}
              className="text-2xl px-10 py-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {count} Questions
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Celebration;
