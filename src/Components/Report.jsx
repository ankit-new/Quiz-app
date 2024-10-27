import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const quizResults = Object.keys(localStorage)
      .filter((key) => key.startsWith("question-"))
      .map((key) => localStorage.getItem(key));

    const correct = quizResults.filter((result) => result === "correct").length;
    const incorrect = quizResults.filter(
      (result) => result === "incorrect"
    ).length;

    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setScore(Math.round((correct / quizResults.length) * 100));
  }, []);

  const handleStart = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("question-"))
      .forEach((key) => localStorage.removeItem(key));
    
    navigate("/");
  };

  return (
    <div className=" h-screen flex flex-col bg-cover bg-center bg-[#AF9CF3]  ">
      <div className="imagback "></div>
      <div className="h-screen flex flex-col items-center ">
      <div className="w-full max-w-smp-6 rounded-t-lg text-center relative">
        <h2 className="text-2xl font-bold mt-10">Your result</h2>
      </div>

      <div className="relative w-40 h-40 mt-4 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 36 36"
          className="rotate-[-90deg]"
        >
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
          />
          <defs>
            <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="red" />
              <stop offset="50%" stopColor="yellow" />
              <stop offset="100%" stopColor="green" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">{score}%</span>
        </div>
      </div>

      <div className="w-full max-w-sm p-6 rounded-b-lg mt-4">
        <div className="flex items-center justify-between bg-green-100 p-4 rounded-lg mb-2">
          <span className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm font-bold">{correctCount}</span>
            <span className="text-sm text-gray-400 mx-3">Correct</span>
          </span>
        </div>
        <div className="flex items-center justify-between bg-red-100 p-4 rounded-lg">
          <span className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span className="text-sm font-bold">{incorrectCount}</span>
            <span className="text-sm text-gray-400 mx-3">Incorrect</span>
          </span>
        </div>
      </div>

      <div className="m-6">
        <button onClick={handleStart} className="min-w-[300px] py-3 text-white font-bold text-xl bg-[#FF3B3C] rounded-full">
          Start Again
        </button>
      </div>
      </div>
    </div>
  );
};

export default Report;
