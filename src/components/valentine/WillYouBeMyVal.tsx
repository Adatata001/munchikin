import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Heart, HeartCrack } from "lucide-react";
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
      <div className="flex flex-col items-center gap-4 md:gap-6 max-w-lg text-center bg-primary/20 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <img 
          src={pookieBear} 
          alt="Pookie Bear" 
          className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl animate-bounce"
          style={{ animationDuration: "2s" }}
        />
        
        <p className="text-lg md:text-xl text-muted-foreground italic">
          We've been through a lot together, so I dare to ask...
        </p>
        
        <h1 className="text-3xl md:text-5xl font-bold text-primary flex items-center gap-2">
          Will you be my Val?? <Heart className="w-8 h-8 md:w-10 md:h-10 fill-primary text-primary" />
        </h1>
        
        {isReturnVisit && (
          <p className="text-muted-foreground text-lg flex items-center gap-1">
            Answer the questions to proceed <Heart className="w-4 h-4 fill-primary/60 text-primary/60" />
          </p>
        )}
        
        <div className="flex gap-4 items-center relative mt-4">
          <Button 
            onClick={onYes}
            className="text-xl px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            Yes! <Heart className="w-5 h-5 fill-primary-foreground" />
          </Button>
          
          <Button 
            variant="outline"
            className="text-xl px-8 py-6 border-primary/50 hover:bg-secondary transition-all flex items-center gap-2"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: isNoButtonRunning ? "transform 0.3s ease-out" : "none",
            }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
          >
            No <HeartCrack className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        
        {/* Dotted curved arrow pointing to "No" button */}
        <div className="mt-2 flex items-end gap-0 relative animate-pulse">
          <svg 
            width="80" 
            height="60" 
            viewBox="0 0 80 60" 
            className="text-muted-foreground"
            style={{ transform: "scaleX(-1)" }}
          >
            {/* Curved dotted arrow path */}
            <path 
              d="M10 55 C 10 20, 50 5, 70 10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
              strokeLinecap="round"
            />
            {/* Arrowhead */}
            <polygon 
              points="65,3 73,11 63,14" 
              fill="currentColor"
            />
          </svg>
          <span className="text-sm italic text-muted-foreground bg-primary/10 border border-primary/20 rounded-full px-3 py-1 whitespace-nowrap">
            try pressing no
          </span>
        </div>
      </div>
    </div>
  );
};

export default WillYouBeMyVal;
