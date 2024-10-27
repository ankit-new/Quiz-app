import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/quiz");
        setQuizData(response.data);
        const foundQuiz = response.data.find((quiz) => quiz.id === parseInt(quizId));
        setCurrentQuestion(foundQuiz || response.data[0]);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, [quizId]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    const isAnswerCorrect = currentQuestion?.choices[index] === currentQuestion.correct;
    localStorage.setItem(`question-${currentQuestion.id}`, isAnswerCorrect ? "correct" : "incorrect");
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      const currentIndex = quizData.findIndex((quiz) => quiz.id === currentQuestion.id);
      const nextQuestion = quizData[currentIndex + 1];

      if (nextQuestion) {
        navigate(`/quizzes/${nextQuestion.id}`);
        setSelectedOption(null);
      } else {
        navigate("/report")
        console.log("Quiz completed!");
      }
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center bg-[#AF9CF3]"
      
    >
      <div className="imagback"></div>

      <div className="bg-white rounded-t-[42px] relative z-10 h-full">
        <div className="flex justify-center -mt-12 relative">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border-8 "></div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{currentQuestion?.id}</span>
              <span className="text-lg font-bold text-gray-400 mt-3">/{quizData.length}</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-6 mb-4 px-4">
          {currentQuestion ? currentQuestion.text : "Loading..."}
        </h2>

        <div className="flex flex-col gap-3 mx-4 max-h-[420px] overflow-y-auto">
          {currentQuestion?.choices.map((choice, index) => (
            <label
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`block p-6 border rounded-lg cursor-pointer 
                ${selectedOption === index ? "border-green-500 bg-white" : "border-gray-300 bg-gray-200"}`}
            >
              <input
                type="radio"
                name="option"
                className="mr-2 hidden"
                checked={selectedOption === index}
                readOnly
              />
              {selectedOption === index && (
                <span className="inline-block w-6 h-6 bg-green-500 text-white rounded-full text-center mr-2">
                  ✓
                </span>
              )}
              {choice}
            </label>
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-6">
          <button
            onClick={handleNextClick}
            disabled={selectedOption === null}
            className={`min-w-[300px] text-white text-lg font-bold py-3 px-8 rounded-full 
              ${selectedOption === null ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 cursor-pointer"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
