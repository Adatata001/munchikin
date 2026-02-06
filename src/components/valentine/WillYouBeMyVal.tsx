import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import pookieBear from "@/assets/pookie-bear.png";

interface WillYouBeMyValProps {
  onYes: () => void;
  isReturnVisit?: boolean;
}

const WillYouBeMyVal = ({ onYes, isReturnVisit = false }: WillYouBeMyValProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonRunning, setIsNoButtonRunning] = useState(false);

  const moveNoButton = useCallback(() => {
    setIsNoButtonRunning(true);
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setNoButtonPosition({ x: newX, y: newY });
  }, []);

  return (
    <div className="h-screen w-screen fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 overflow-hidden">
      <div className="flex flex-col items-center gap-4 md:gap-6 max-w-lg text-center bg-primary/20 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] max-h-[90vh] overflow-auto">
        <img 
          src={pookieBear} 
          alt="Pookie Bear" 
          className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl animate-bounce"
          style={{ animationDuration: "2s" }}
        />
        
        <p className="text-lg md:text-xl text-muted-foreground italic">
          We've been through a lot together, so I dare to ask...
        </p>
        
        <h1 className="text-3xl md:text-5xl font-bold text-primary">
          Will you be my Val?? 💙
        </h1>
        
        {isReturnVisit && (
          <p className="text-muted-foreground text-lg">
            Answer the questions to proceed 💕
          </p>
        )}
        
        <div className="flex gap-4 items-center relative mt-4">
          <Button 
            onClick={onYes}
            className="text-xl px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Yes! 💕
          </Button>
          
          <Button 
            variant="outline"
            className="text-xl px-8 py-6 border-primary/50 hover:bg-secondary transition-all"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: isNoButtonRunning ? "transform 0.3s ease-out" : "none",
            }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
          >
            No 😢
          </Button>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-muted-foreground animate-pulse">
          <span className="text-2xl">👆</span>
          <span className="text-sm italic">Try pressing no 😏</span>
        </div>
      </div>
    </div>
  );
};

export default WillYouBeMyVal;
