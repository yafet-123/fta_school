import { useState, useEffect } from "react";

const subjectsData = {
  natural: [
    { name: "Math", img: "https://images.unsplash.com/photo-1533025785648-a1a3afae1c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "Biology", img: "https://images.unsplash.com/photo-1614935151651-7f42e1c8b512?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "Physics", img: "https://images.unsplash.com/photo-1581090700227-4c4f50a69a44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "Chemistry", img: "https://images.unsplash.com/photo-1581091870623-44d9b9e8d8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "English", img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "SAT", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
  ],
  social: [
    { name: "Geography", img: "https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "History", img: "https://images.unsplash.com/photo-1524492449090-1a065f7e4ec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "Math", img: "https://images.unsplash.com/photo-1621619850292-97f6e6b7965a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "Economics", img: "https://images.unsplash.com/photo-1581091012184-5c8c1f6e0ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "English", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
    { name: "SAT", img: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
  ],
};



const questions = [
  {
    q: "What is the derivative of x²?",
    options: ["2", "x", "2x", "x²"],
    answer: 2,
    explanation: "The derivative of x² with respect to x is 2x.",
  },
  {
    q: "What is the value of √(16)?",
    options: ["2", "4", "8", "16"],
    answer: 1,
    explanation: "√16 = 4",
  },
  {
    q: "Solve for x: 2x + 3 = 7",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explanation: "2x+3=7 → 2x=4 → x=2",
  },
  {
    q: "What is the area of a triangle with base 4 and height 3?",
    options: ["6", "12", "7", "9"],
    answer: 0,
    explanation: "Area = ½ × base × height = 6.",
  },
  {
    q: "What is 5 factorial (5!)?",
    options: ["25", "60", "120", "720"],
    answer: 2,
    explanation: "5! = 5×4×3×2×1 = 120.",
  },
];

export default function QuizPage({gradeId}) {
  const [showError, setShowError] = useState(false);
  // If grade is in gradesWithoutCategories → skip home and go directly to subject
  const gradesWithoutCategories = ["grade_9", "grade_10"];
  const initialStep = gradesWithoutCategories.includes(gradeId) ? "subject" : "home";
  const [step, setStep] = useState(initialStep);
  const [category, setCategory] = useState(null);
  const [subject, setSubject] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  // Timer
  useEffect(() => {
    if (step === "quiz" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) setStep("results");
  }, [step, timeLeft]);

  const score = answers.filter((a, i) => a === questions[i].answer).length;

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-100 text-gray-800 pt-24">
      {/* Step 1: Practice Home (Natural / Social buttons) */}
      {step === "home" && (
        <div className="mt-12 flex gap-8">
          <div
            onClick={() => setStep("subject")}
            className="bg-blue-600 text-white font-bold text-xl px-12 py-16 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
          >
            Natural Science
          </div>
          <div
            onClick={() => setStep("subject")}
            className="bg-blue-600 text-white font-bold text-xl px-12 py-16 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
          >
            Social Science
          </div>
        </div>
      )}

      {/* Step 2: Subject Selection */}
      {step === "subject" && (
        <div className="max-w-4xl w-full mt-12 flex flex-col items-center">
          {/* Show Back button only if grade has categories */}
          {!gradesWithoutCategories.includes(gradeId) && (
            <button
              onClick={() => setStep("home")}
              className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Back to Categories
            </button>
          )}

          <h2 className="text-blue-600 text-2xl font-semibold mb-6">
            Subjects
          </h2>
          <div className="grid grid-cols-3 gap-6 w-full">
            {["Math", "Physics", "Biology", "History", "Geography", "Economics"].map(
              (subject) => (
                <div
                  key={subject}
                  onClick={() => setStep("quiz")}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:-translate-y-1 transition p-4 flex flex-col items-center"
                >
                  <img
                    src="/placeholder.jpg"
                    alt={subject}
                    className="w-full h-32 object-cover border-b-2 border-blue-500"
                  />
                  <p className="mt-2 text-blue-700 font-semibold">{subject}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Step 3: Quiz Page */}
      {step === "quiz" && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <div className="text-right text-red-600 mb-2">
            Time left: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
          <h3 className="text-lg font-bold mb-4">
            Q{currentQ + 1}: {questions[currentQ].q}
          </h3>
          <div className="flex flex-col gap-2">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  const newAns = [...answers];
                  newAns[currentQ] = i;
                  setAnswers(newAns);
                }}
                className={`px-4 py-2 rounded border ${
                  answers[currentQ] === i
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Error message if user tries to skip without answering */}
          {showError && (
            <div className="text-red-600 mt-3 text-sm">
              ⚠️ You did not select an answer.
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              disabled={currentQ === 0}
              onClick={() => {
                setShowError(false);
                setCurrentQ((q) => q - 1);
              }}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (answers[currentQ] === null) {
                  setShowError(true);
                  return;
                }
                setShowError(false);
                if (currentQ === questions.length - 1) {
                  setStep("results");
                } else {
                  setCurrentQ((q) => q + 1);
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {currentQ === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}


      {step === "results" && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Your Score</h2>

          {/* Calculate total correct and incorrect */}
          {(() => {
            const totalAnswered = answers.filter(a => a !== null).length;
            const totalCorrect = answers.reduce(
              (acc, a, i) => (a === questions[i].answer ? acc + 1 : acc),
              0
            );
            const totalIncorrect = totalAnswered - totalCorrect;
            const percent = totalAnswered ? Math.round((totalCorrect / questions.length) * 100) : 0;
            return (
              <div className="mb-4">
                <div className="text-2xl font-semibold mb-2">
                  {totalCorrect} / {questions.length} ({percent}%)
                </div>
                <div className="flex gap-4">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded">
                    Got: {totalCorrect}
                  </div>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded">
                    Lost: {totalIncorrect}
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {questions.map((q, i) => (
              <div key={i} className="p-2 border rounded">
                <strong>Q{i + 1}:</strong> {q.q} <br />
                Your answer:{" "}
                <span className={answers[i] === q.answer ? "text-green-600" : "text-red-600"}>
                  {answers[i] !== null ? q.options[answers[i]] : "No Answer"}
                </span>{" "}
                | Correct: <span className="text-green-600">{q.options[q.answer]}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                setAnswers(Array(questions.length).fill(null));
                setCurrentQ(0);
                setTimeLeft(5 * 60);
                setStep("quiz");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Retake
            </button>
            <button onClick={() => setStep("explanation")} className="px-4 py-2 bg-blue-600 text-white rounded">
              Review Answers
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Explanation */}
      {step === "explanation" && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-lg font-bold mb-4">Explanations</h2>
          <div>
            <h3>
              Q{currentQ + 1}: {questions[currentQ].q}
            </h3>
            <p>Your answer: {answers[currentQ] !== null ? questions[currentQ].options[answers[currentQ]] : "No Answer"}</p>
            <p>Correct answer: {questions[currentQ].options[questions[currentQ].answer]}</p>
            <p className="text-sm text-gray-600 mt-2">{questions[currentQ].explanation}</p>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep("home")} className="px-4 py-2 bg-gray-300 rounded">
              Back to Home
            </button>
            <button
              onClick={() => setCurrentQ((q) => Math.min(q + 1, questions.length - 1))}
              disabled={currentQ === questions.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
