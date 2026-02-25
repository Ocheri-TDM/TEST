import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ArrowRight, CheckCircle2, XCircle, Award, Clock } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  skill: string;
}

export function StudentSkillTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the main purpose of React's useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To optimize performance",
        "To create custom hooks",
      ],
      correctAnswer: 1,
      skill: "React",
    },
    {
      id: 2,
      question: "In TypeScript, what does the 'readonly' modifier do?",
      options: [
        "Makes a variable constant",
        "Prevents properties from being changed after initialization",
        "Creates a private property",
        "Enables type inference",
      ],
      correctAnswer: 1,
      skill: "TypeScript",
    },
    {
      id: 3,
      question: "What is the purpose of 'async/await' in JavaScript?",
      options: [
        "To create asynchronous functions",
        "To handle promises in a synchronous-looking way",
        "To improve performance",
        "To create worker threads",
      ],
      correctAnswer: 1,
      skill: "JavaScript",
    },
    {
      id: 4,
      question: "Which SQL command is used to retrieve data from a database?",
      options: [
        "GET",
        "FETCH",
        "SELECT",
        "RETRIEVE",
      ],
      correctAnswer: 2,
      skill: "SQL",
    },
    {
      id: 5,
      question: "What is the main advantage of using Docker containers?",
      options: [
        "Faster execution than native applications",
        "Consistent environment across development and production",
        "Automatic code optimization",
        "Built-in security features",
      ],
      correctAnswer: 1,
      skill: "Docker",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const score = calculateScore();

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar role="student" userName="John Doe" />

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
                <p className="text-green-100">Great job on completing the skill assessment</p>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-green-100 mb-1">Score</p>
                <p className="text-4xl font-bold">{score.percentage}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-green-100 mb-1">Correct Answers</p>
                <p className="text-4xl font-bold">{score.correct}/{score.total}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-green-100 mb-1">Match Boost</p>
                <p className="text-4xl font-bold">+{Math.round(score.percentage / 20)}%</p>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Answer Review</h2>
            <div className="space-y-6">
              {questions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div key={q.id} className={`p-4 rounded-lg border-2 ${
                    isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  }`}>
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">Question {index + 1}</h3>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {q.skill}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{q.question}</p>
                        
                        {!isCorrect && (
                          <div className="text-sm">
                            <p className="text-red-700 mb-1">
                              Your answer: {q.options[userAnswer || 0]}
                            </p>
                            <p className="text-green-700">
                              Correct answer: {q.options[q.correctAnswer]}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Impact on Your Profile</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Your Market Readiness Score increased from 78% to {78 + Math.round(score.percentage / 20)}%
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Your average job match increased by +{Math.round(score.percentage / 20)}%
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Unlocked {Math.max(1, Math.round(score.correct * 1.5))} new job opportunities
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate("/student")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mini Skill Test</h1>
          <p className="text-gray-600">Answer these questions to boost your match percentage</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Question Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentQuestion + 1} / {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium mb-4">
              {questions[currentQuestion].skill}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300"
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-4">
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={answers.some(a => a === null)}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Submit Test
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                Next Question
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestion(index);
                setSelectedAnswer(answers[index]);
              }}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                answers[index] !== null
                  ? "bg-blue-600 text-white"
                  : index === currentQuestion
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-600"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
