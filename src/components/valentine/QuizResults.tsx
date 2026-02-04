import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuizResultsProps {
  score: number;
  total: number;
  wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[];
  onContinue: () => void;
  buttonText?: string;
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

const QuizResults = ({ score, total, wrongAnswers, onContinue, buttonText = "Continue to Countdown" }: QuizResultsProps) => {
  const [showFireworks, setShowFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    const createFirework = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 100;
      const y = Math.random() * 60;
      setShowFireworks(prev => [...prev, { id, x, y }]);
      
      setTimeout(() => {
        setShowFireworks(prev => prev.filter(f => f.id !== id));
      }, 2000);
    };

    for (let i = 0; i < 3; i++) {
      setTimeout(createFirework, i * 300);
    }

    const interval = setInterval(createFirework, 1200);
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
            style={{ width: 150, height: 150 }}
          />
        </div>
      ))}

      <div className="w-full max-w-2xl z-10">
        <Card className="shadow-xl border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
              Quiz Complete! 🎉
            </h2>
            
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-foreground mb-2">
                {score}/{total}
              </p>
              <p className="text-xl text-muted-foreground">
                {percentage}% correct!
              </p>
            </div>

            {wrongAnswers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Let's review what you missed: 📝
                </h3>
                <ScrollArea className="h-64 rounded-md border border-border p-4">
                  <div className="space-y-4">
                    {wrongAnswers.map((item, index) => (
                      <div key={index} className="bg-secondary/50 rounded-lg p-4">
                        <p className="font-medium text-foreground mb-2">{item.question}</p>
                        <p className="text-sm text-destructive">
                          Your answer: {item.userAnswer}
                        </p>
                        <p className="text-sm text-green-600">
                          Correct answer: {item.correctAnswer}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            <Button 
              onClick={onContinue}
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
            >
              {buttonText} 💙
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizResults;
