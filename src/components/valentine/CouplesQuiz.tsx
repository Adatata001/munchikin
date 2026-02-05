import { useEffect, useRef, useState } from "react";
import Quiz from "./Quiz";
import { getCouplesQuizQuestions } from "@/data/quizData";
import myMunchkin from "@/assets/my-munchkin.mp3";

interface CouplesQuizProps {
  onComplete: (score: number, wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[]) => void;
}

const CouplesQuiz = ({ onComplete }: CouplesQuizProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const questions = getCouplesQuizQuestions();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    
    const playAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log("Autoplay blocked, user interaction needed");
        setIsPlaying(false);
      });
    };

    playAudio();

    // Handle page visibility change (browser tab close/switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    // Handle before unload (browser close)
    const handleBeforeUnload = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.log);
    }
  };

  return (
    <div className="h-screen w-screen fixed inset-0 relative">
      <audio ref={audioRef} src={myMunchkin} loop />
      
      {/* Play button for browsers that block autoplay */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all"
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? "🔊" : "🔇"}
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
