import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Quiz from './Components/Quiz';
import Report from './Components/Report';
import "./App.css"

import React from 'react'

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes/:quizId" element={<Quiz />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  </Router>
  )
}

export default App



