import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ArrowRight, CheckCircle2, XCircle, Award, Clock } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  skill: string;
}

interface Test {
  id: number;
  postingId: number;
  title: string;
  questions: Question[];
}

export function StudentSkillTest() {
  const { postingId } = useParams<{ postingId: string }>();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Загружаем тест с бекенда
  useEffect(() => {
    fetch(`https://19e71b04da22e75b.mokky.dev/test-post?postingId=${postingId}`)
      .then(res => res.json())
      .then(data => {
        setTest(data[0]); // предполагаем, что приходит массив
        setAnswers(Array(data[0].questions.length).fill(null));
      });
  }, [postingId]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (test?.questions.length ?? 0) - 1) {
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

  const calculateScore = () => {
    let correctSkills: string[] = [];
    let missingSkills: string[] = [];
    test?.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correctSkills.push(q.skill);
      else missingSkills.push(q.skill);
    });
    const percentage = test
      ? Math.round((correctSkills.length / test.questions.length) * 100)
      : 0;
    return { correctSkills, missingSkills, percentage };
  };

  const handleSubmit = () => {
    setShowResults(true);

    const { correctSkills, missingSkills, percentage } = calculateScore();

    // Формируем payload для post-candidate
    const payload = {
      studentId: 1,            // тут подставить текущего студента
      employerId: 1,           // можно взять из postingId или отдельно
      jobId: Number(postingId),
      name: "Alex",            // имя студента
      matchPercentage: percentage,
      MatchingSkills: correctSkills.join(", "),
      MissingSkills: missingSkills.join(", ")
    };

    // Отправка на бекенд
    fetch("https://19e71b04da22e75b.mokky.dev/post-candidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(res => console.log("Saved:", res.status));
  };

  if (!test) return <div>Loading...</div>;

  if (showResults) {
    const { correctSkills, missingSkills, percentage } = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar role="student" userName="Alex" />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-4">Test Completed!</h1>
          <p className="mb-6">Your score: {percentage}%</p>

          <h2 className="text-xl font-semibold mb-2">Matching Skills:</h2>
          <p className="mb-4">{correctSkills.join(", ") || "None"}</p>

          <h2 className="text-xl font-semibold mb-2">Missing Skills:</h2>
          <p className="mb-4">{missingSkills.join(", ") || "None"}</p>

          <button
            onClick={() => navigate("/student/job-match")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const q = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="Alex" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">{test.title}</h1>
        <p className="mb-4">Question {currentQuestion + 1}/{test.questions.length}</p>

        <div className="bg-white rounded-xl p-6 mb-4 border border-gray-200">
          <p className="font-semibold mb-4">{q.question}</p>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswerSelect(i)}
              className={`block w-full text-left mb-2 p-3 border rounded-lg ${
                selectedAnswer === i ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion === test.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}