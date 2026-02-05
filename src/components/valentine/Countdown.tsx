import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        onComplete();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <Card className="bg-primary text-primary-foreground shadow-lg">
        <CardContent className="p-4 md:p-6">
          <span className="text-3xl md:text-5xl font-bold">
            {String(value).padStart(2, "0")}
          </span>
        </CardContent>
      </Card>
      <span className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 overflow-hidden">
      <div className="flex flex-col items-center gap-8 max-w-4xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary">
          Counting Down to Valentine's Day 💙
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground">
          February 14th is almost here...
        </p>

        <div className="flex gap-3 md:gap-6 flex-wrap justify-center">
          <TimeUnit value={timeLeft.days} label="Days" />
          <span className="text-4xl md:text-5xl font-bold text-primary self-center mb-8">:</span>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <span className="text-4xl md:text-5xl font-bold text-primary self-center mb-8">:</span>
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <span className="text-4xl md:text-5xl font-bold text-primary self-center mb-8">:</span>
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <div className="mt-8 text-6xl animate-pulse">
          💕
        </div>
      </div>
    </div>
  );
};

export default Countdown;
