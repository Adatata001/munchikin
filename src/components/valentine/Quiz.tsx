import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/data/quizData";

interface QuizProps {
  questions: Question[];
  onComplete: (score: number, wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[]) => void;
  title?: string;
}

const Quiz = ({ questions, onComplete, title = "Quiz Time! 🎯" }: QuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
      }]);
    }

    // Move to next question after brief delay
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        onComplete(isCorrect ? score + 1 : score, isCorrect ? wrongAnswers : [...wrongAnswers, {
          question: currentQuestion.question,
          userAnswer: answer,
          correctAnswer: currentQuestion.correctAnswer,
        }]);
      }
    }, 800);
  };

  const getButtonStyle = (option: string) => {
    if (!isAnswered) return "bg-secondary hover:bg-secondary/80 text-secondary-foreground";
    if (option === currentQuestion.correctAnswer) return "bg-green-500 text-white";
    if (option === selectedAnswer) return "bg-destructive text-white";
    return "bg-secondary/50 text-secondary-foreground";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary text-center mb-2">{title}</h2>
          <div className="flex items-center gap-4">
            <Progress value={progress} className="flex-1" />
            <span className="text-sm text-muted-foreground font-medium">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-8 text-foreground">
              {currentQuestion.question}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`w-full text-left justify-start text-lg py-6 px-6 transition-all ${getButtonStyle(option)}`}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-muted-foreground">
          Score: <span className="font-bold text-primary">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
