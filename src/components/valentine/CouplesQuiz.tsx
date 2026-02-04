import { useEffect, useRef } from "react";
import Quiz from "./Quiz";
import { getCouplesQuizQuestions } from "@/data/quizData";
import myMunchkin from "@/assets/my-munchkin.mp3";

interface CouplesQuizProps {
  onComplete: (score: number, wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[]) => void;
}

const CouplesQuiz = ({ onComplete }: CouplesQuizProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const questions = getCouplesQuizQuestions();

  useEffect(() => {
    // Play audio on mount
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, user interaction needed
        console.log("Autoplay blocked, user interaction needed");
      });
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="relative">
      <audio ref={audioRef} src={myMunchkin} loop />
      
      {/* Play button for browsers that block autoplay */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => audioRef.current?.play()}
          className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all"
          title="Play music"
        >
          🎵
        </button>
      </div>

      <Quiz 
        questions={questions}
        onComplete={onComplete}
        title="Couples Quiz 💕"
      />
    </div>
  );
};

export default CouplesQuiz;
