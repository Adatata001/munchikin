import { useState } from "react";
import PasswordGate from "@/components/valentine/PasswordGate";
import WillYouBeMyVal from "@/components/valentine/WillYouBeMyVal";
import Celebration from "@/components/valentine/Celebration";
import Quiz from "@/components/valentine/Quiz";
import QuizResults from "@/components/valentine/QuizResults";
import Countdown from "@/components/valentine/Countdown";
import LovePoem from "@/components/valentine/LovePoem";
import CouplesQuiz from "@/components/valentine/CouplesQuiz";
import FinalResults from "@/components/valentine/FinalResults";
import { getPreValentineQuestions, Question } from "@/data/quizData";

type Page = 
  | "password"
  | "willYouBeMyVal"
  | "celebration"
  | "preQuiz"
  | "preQuizResults"
  | "countdown"
  | "poem"
  | "couplesQuiz"
  | "finalResults";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("password");
  const [isReturnVisit, setIsReturnVisit] = useState(false);
  const [preQuizQuestions, setPreQuizQuestions] = useState<Question[]>([]);
  const [preQuizScore, setPreQuizScore] = useState(0);
  const [preQuizWrongAnswers, setPreQuizWrongAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string }[]>([]);
  const [couplesQuizScore, setCouplesQuizScore] = useState(0);

  // Valentine's Day 2025
  const valentinesDay = new Date("2025-02-14T00:00:00");

  const handlePasswordSuccess = () => {
    setCurrentPage("willYouBeMyVal");
  };

  const handleYes = () => {
    if (isReturnVisit) {
      // Skip countdown flow, go directly to couples quiz
      setCurrentPage("couplesQuiz");
    } else {
      setCurrentPage("celebration");
    }
  };

  const handleQuestionCountSelect = (count: number) => {
    const questions = getPreValentineQuestions(count);
    setPreQuizQuestions(questions);
    setCurrentPage("preQuiz");
  };

  const handlePreQuizComplete = (score: number, wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[]) => {
    setPreQuizScore(score);
    setPreQuizWrongAnswers(wrongAnswers);
    setCurrentPage("preQuizResults");
  };

  const handleCountdownComplete = () => {
    setCurrentPage("poem");
  };

  const handlePoemComplete = () => {
    setCurrentPage("couplesQuiz");
  };

  const handleCouplesQuizComplete = (score: number) => {
    setCouplesQuizScore(score);
    setCurrentPage("finalResults");
  };

  const handleRestart = () => {
    setIsReturnVisit(true);
    setCurrentPage("willYouBeMyVal");
    // Reset quiz states
    setPreQuizQuestions([]);
    setPreQuizScore(0);
    setPreQuizWrongAnswers([]);
    setCouplesQuizScore(0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "password":
        return <PasswordGate onSuccess={handlePasswordSuccess} />;
      
      case "willYouBeMyVal":
        return <WillYouBeMyVal onYes={handleYes} isReturnVisit={isReturnVisit} />;
      
      case "celebration":
        return <Celebration onSelectQuestionCount={handleQuestionCountSelect} />;
      
      case "preQuiz":
        return (
          <Quiz 
            questions={preQuizQuestions}
            onComplete={handlePreQuizComplete}
            title="Pre-Valentine Quiz! 🎯"
          />
        );
      
      case "preQuizResults":
        return (
          <QuizResults
            score={preQuizScore}
            total={preQuizQuestions.length}
            wrongAnswers={preQuizWrongAnswers}
            onContinue={() => setCurrentPage("countdown")}
            buttonText="Continue to Countdown"
          />
        );
      
      case "countdown":
        return (
          <Countdown 
            targetDate={valentinesDay}
            onComplete={handleCountdownComplete}
          />
        );
      
      case "poem":
        return <LovePoem onComplete={handlePoemComplete} />;
      
      case "couplesQuiz":
        return (
          <CouplesQuiz 
            onComplete={handleCouplesQuizComplete}
          />
        );
      
      case "finalResults":
        return (
          <FinalResults
            score={couplesQuizScore}
            total={30}
            onRestart={handleRestart}
          />
        );
      
      default:
        return <PasswordGate onSuccess={handlePasswordSuccess} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
};

export default Index;
