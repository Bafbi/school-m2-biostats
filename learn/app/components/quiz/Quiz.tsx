"use client";

import { useState } from 'react';

export interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelected(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
    setIsAnswered(false);
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return selected === index ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black';
    }
    if (index === questions[currentQuestion].answer) {
      return 'bg-green-500 text-white'; // Correct answer always green
    }
    if (selected === index) {
      return 'bg-red-500 text-white'; // Wrong selection red
    }
    return 'bg-gray-200 text-gray-400'; // Others disabled
  };

  return (
    <section className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Quiz</h2>
      {!showResult ? (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-medium text-blue-600">Score: {score}</span>
          </div>

          <h3 className="text-xl text-gray-900 font-medium mb-6">{questions[currentQuestion].question}</h3>

          <div className="space-y-3 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${getButtonClass(index)}`}
              >
                {option}
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className={`mb-6 p-4 rounded-lg ${selected === questions[currentQuestion].answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-bold mb-1 ${selected === questions[currentQuestion].answer ? 'text-green-800' : 'text-red-800'}`}>
                {selected === questions[currentQuestion].answer ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-gray-800 text-sm">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={nextQuestion}
              disabled={!isAnswered}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h3>
          <p className="text-lg text-gray-700 mb-6">You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{questions.length}</span></p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </section>
  );
}