import { useState, useEffect } from "react";

const subjectsData = {
  natural: [
    { name: "Math", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=60" },
    { name: "Biology", img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=60" },
    { name: "Physics", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=60" },
    { name: "Chemistry", img: "https://images.unsplash.com/photo-1581091870623-44d9b9e8d8de?auto=format&fit=crop&w=400&q=60" },
    { name: "English", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=60" },
    { name: "SAT", img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=400&q=60" },
  ],
  social: [
    { name: "Geography", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60" },
    { name: "History", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60" },
    { name: "Math", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=60" },
    { name: "Economics", img: "https://images.unsplash.com/photo-1486308510493-cb09fcaaf77a?auto=format&fit=crop&w=400&q=60" },
    { name: "English", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=60" },
    { name: "SAT", img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=400&q=60" },
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
  const [category, setCategory] = useState(null);
  const [subject, setSubject] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const gradesWithoutCategories = ["grade_9", "grade_10"];

  // If grade is in gradesWithoutCategories → skip home and go directly to subject
  const initialStep = gradesWithoutCategories.includes(gradeId) ? "subject" : "home";
  const [step, setStep] = useState(initialStep);
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
        <div className="bg-white max-w-2xl w-full mt-12 rounded-xl shadow-lg p-6 flex flex-col">
          <h1 className="text-center text-2xl font-bold text-blue-800 mb-4">
            Grade 11 Math - Practice Test
          </h1>
          <div className="text-red-600 text-right mb-4">Time left: 5:00</div>

          {/* Sample question */}
          <div>
            <h3 className="text-lg font-semibold mb-3">What is 2 + 2?</h3>
            <div className="flex flex-col gap-2">
              {["2", "3", "4", "5"].map((opt, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3 border-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-500"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button className="px-6 py-2 rounded-lg bg-gray-400 text-white" disabled>
              Previous
            </button>
            <button
              onClick={() => setStep("results")}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === "results" && (
        <div className="bg-white max-w-2xl w-full mt-12 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-blue-800 text-2xl font-bold mb-4">Your Score</h2>
          <div className="text-xl font-semibold mb-4">8/10</div>
          <div className="w-full border-t-2 border-blue-500 pt-4 flex flex-col gap-3 max-h-80 overflow-y-auto">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-50 border p-3 rounded-lg min-h-[100px]"
              >
                Question {i + 1} - Correct
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setStep("quiz")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Retake Practice
            </button>
            <button
              onClick={() => setStep("explanation")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Review Answers
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Explanation */}
      {step === "explanation" && (
        <div className="bg-white max-w-2xl w-full mt-12 rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-blue-800 text-xl font-bold mb-4">
            Answer & Explanation
          </h2>
          <div className="flex-grow text-gray-700 whitespace-pre-wrap mb-4">
            Q1: 2 + 2 = 4. Because adding two and two gives four.
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep("home")}
              className="px-4 py-2 rounded-lg bg-gray-400 text-white"
            >
              Back to Home
            </button>
            <button
              onClick={() => alert("Next explanation")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
