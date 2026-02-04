import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FinalResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

// Simple fireworks animation
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

const FinalResults = ({ score, total, onRestart }: FinalResultsProps) => {
  const [showResult, setShowResult] = useState(false);
  const [showFireworks, setShowFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  useEffect(() => {
    if (showResult && passed) {
      const createFirework = () => {
        const id = Date.now() + Math.random();
        const x = Math.random() * 100;
        const y = Math.random() * 60;
        setShowFireworks(prev => [...prev, { id, x, y }]);
        
        setTimeout(() => {
          setShowFireworks(prev => prev.filter(f => f.id !== id));
        }, 2000);
      };

      for (let i = 0; i < 5; i++) {
        setTimeout(createFirework, i * 200);
      }

      const interval = setInterval(createFirework, 800);
      return () => clearInterval(interval);
    }
  }, [showResult, passed]);

  if (!showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 relative overflow-hidden">
      {/* Fireworks for pass */}
      {passed && showFireworks.map(fw => (
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
