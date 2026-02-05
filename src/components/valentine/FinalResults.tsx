import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FinalResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const FinalResults = ({ score, total, onRestart }: FinalResultsProps) => {
  const [showResult, setShowResult] = useState(false);
  const [showFireworks, setShowFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  useEffect(() => {
    if (showResult && passed) {
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
    }
  }, [showResult, passed]);

  if (!showResult) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 overflow-hidden">
        <Card className="w-full max-w-lg shadow-xl border-primary/20">
          <CardContent className="pt-8 pb-8 flex flex-col items-center gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
              Time to know your fate!! 🔮
            </h1>
            
            <p className="text-xl text-center text-foreground">
              Do you think you truly know your partner??
            </p>
            
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={() => setShowResult(true)}
                className="text-xl px-8 py-6 bg-primary hover:bg-primary/90"
              >
                Yes! 💕
              </Button>
              <Button 
                onClick={() => setShowResult(true)}
                variant="outline"
                className="text-xl px-8 py-6 border-primary/50"
              >
                No... 😬
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 relative overflow-hidden">
      {/* Fireworks for pass */}
      {passed && showFireworks.map(fw => (
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

      <Card className="w-full max-w-lg shadow-xl border-primary/20 z-10">
        <CardContent className="pt-8 pb-8 flex flex-col items-center gap-6">
          {passed ? (
            <>
              <div className="text-6xl mb-4">🎉💙🎉</div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
                You mean the world to me pookie 💙
              </h1>
              <p className="text-2xl font-bold text-foreground">
                {score}/{total} ({percentage}%)
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">😤</div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
                Get ready, do better next Valentine!!
              </h1>
              <p className="text-2xl font-bold text-foreground">
                {score}/{total} ({percentage}%)
              </p>
              <p className="text-muted-foreground text-center">
                You needed 70% to pass... Try harder next time! 💪
              </p>
            </>
          )}
          
          <Button 
            onClick={onRestart}
            className="mt-4 text-lg px-8 py-6 bg-primary hover:bg-primary/90"
          >
            Start Over 💕
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalResults;
