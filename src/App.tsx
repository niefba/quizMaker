import { GlobalContext, Question } from './utils/global-context';
import { useState } from 'react'
import { Routes, Route } from "react-router";


import QuizSelector from './ui/quiz-selector';
import QuizResult from './ui/quiz-result';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  return (
    <GlobalContext.Provider value={{questions, setQuestions}}>
      <div className="flex flex-col items-center justify-center p-6">
        <Routes>
          <Route path="/" element={<QuizSelector />} />
          <Route path="/results" element={<QuizResult />} />
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
}

export default App
