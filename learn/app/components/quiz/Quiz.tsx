"use client";

import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface QuizProps {
  questions: Question[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Quiz</h2>
      {!showResult ? (
        <div>
          <p className="text-gray-900 mb-4">{questions[currentQuestion].question}</p>
          <ul className="mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => handleAnswer(index)}
                  className={`px-4 py-2 rounded ${selected === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={nextQuestion}
            disabled={selected === null}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-900 mb-4">Quiz completed! Your score: {score}/{questions.length}</p>
          <button onClick={resetQuiz} className="px-4 py-2 bg-blue-500 text-white rounded">
            Retake Quiz
          </button>
        </div>
      )}
    </section>
  );
}