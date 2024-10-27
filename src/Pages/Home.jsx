import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group.png";

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = async () => {
    try {
      
      navigate("/quizzes/1"); // Starting Quiz with ID 1 (question 1)
    } catch (error) {
      console.error("Error starting quiz", error);
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
      }}
    >
      <div className="flex justify-center items-center m-8 text-black text-sm sm:text-base ">
        <img src={logo} alt="Upraised" className="w-[40px] h-[50px]" />
        <h1 className="m-1 font-bold text-2xl">upraised</h1>
      </div>

      <div className="flex justify-center items-center h-screen ">
        <div className="flex justify-center items-center w-[250px] h-[240px] bg-white rounded-full ">
          <p className="font-bold text-4xl text-[#FF3B3C]">Quiz</p>
        </div>
      </div>
      <div className="m-6">
        <button className="min-w-[300px] py-4 text-white font-bold text-2xl bg-[#FF3B3C] rounded-full" onClick={startQuiz}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
