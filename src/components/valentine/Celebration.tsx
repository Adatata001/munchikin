import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";

interface CelebrationProps {
  onSelectQuestionCount: (count: number) => void;
}

const Celebration = ({ onSelectQuestionCount }: CelebrationProps) => {
  const [showFireworks, setShowFireworks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Create multiple fireworks at random positions
    const createFirework = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 50 + 5;
      setShowFireworks(prev => [...prev, { id, x, y }]);
      
      setTimeout(() => {
        setShowFireworks(prev => prev.filter(f => f.id !== id));
      }, 3000);
    };

    for (let i = 0; i < 5; i++) {
      setTimeout(createFirework, i * 300);
    }

    const interval = setInterval(createFirework, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 relative overflow-hidden">
      {/* Fireworks */}
      {showFireworks.map(fw => (
        <div
          key={fw.id}
          className="absolute pointer-events-none"
          style={{ left: `${fw.x}%`, top: `${fw.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <DotLottieReact
            src="/fireworks.lottie"
            autoplay
            style={{ width: 300, height: 300 }}
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
