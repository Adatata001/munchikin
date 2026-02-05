import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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

const QuizResults = ({ score, total, wrongAnswers, onContinue, buttonText = "Continue to Countdown" }: QuizResultsProps) => {
  const [showFireworks, setShowFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    const createFirework = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 50 + 5;
      setShowFireworks(prev => [...prev, { id, x, y }]);
      
      setTimeout(() => {
        setShowFireworks(prev => prev.filter(f => f.id !== id));
      }, 3000);
    };

    for (let i = 0; i < 3; i++) {
      setTimeout(createFirework, i * 300);
    }

    const interval = setInterval(createFirework, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 relative overflow-hidden">
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
            style={{ width: 250, height: 250 }}
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
