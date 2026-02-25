import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Trash2, ArrowRight } from "lucide-react";

type QuestionType = "single" | "multiple" | "text";

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswers: number[]; // индексы правильных вариантов
}

export function EmployerCreateTest() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(30);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: crypto.randomUUID(),
      type: "single",
      question: "",
      options: ["", ""],
      correctAnswers: []
    }
  ]);

  // ------------------------
  // Question Handlers
  // ------------------------

  const addQuestion = () => {
    if (questions.length >= 10) return;

    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        type: "single",
        question: "",
        options: ["", ""],
        correctAnswers: []
      }
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updated: Partial<Question>) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, ...updated } : q
    ));
  };

  const updateOption = (qId: string, index: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id !== qId) return q;

      const updatedOptions = [...q.options];
      updatedOptions[index] = value;

      return { ...q, options: updatedOptions };
    }));
  };

  const addOption = (qId: string) => {
    setQuestions(questions.map(q => {
      if (q.id !== qId) return q;
      return { ...q, options: [...q.options, ""] };
    }));
  };

  const toggleCorrectAnswer = (q: Question, optionIndex: number) => {
    if (q.type === "single") {
      updateQuestion(q.id, { correctAnswers: [optionIndex] });
    } else {
      const exists = q.correctAnswers.includes(optionIndex);
      if (exists) {
        updateQuestion(q.id, {
          correctAnswers: q.correctAnswers.filter(i => i !== optionIndex)
        });
      } else {
        updateQuestion(q.id, {
          correctAnswers: [...q.correctAnswers, optionIndex]
        });
      }
    }
  };

  // ------------------------
  // Submit
  // ------------------------

  const handleSubmit = async () => {
    if (!title || questions.length < 5) {
      alert("Please create at least 5 questions.");
      return;
    }

    await fetch("https://19e71b04da22e75b.mokky.dev/test-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postingId: Number(jobId),
        title,
        duration,
        questions
      })
    });

    navigate("/employer");
  };

  // ------------------------
  // UI
  // ------------------------

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="employer" userName="TechCorp Inc." />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Create Skill Test</h1>
          <p className="text-gray-600">
            Build 5–10 questions to evaluate candidates.
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Test Title"
              className="px-4 py-3 border rounded-xl"
            />

            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="px-4 py-3 border rounded-xl"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl border shadow-sm">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Question {index + 1}</h2>
                {questions.length > 1 && (
                  <button onClick={() => removeQuestion(q.id)}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <textarea
                value={q.question}
                onChange={(e) =>
                  updateQuestion(q.id, { question: e.target.value })
                }
                placeholder="Enter your question..."
                className="w-full border rounded-xl p-3 mb-4"
              />

              <select
                value={q.type}
                onChange={(e) =>
                  updateQuestion(q.id, {
                    type: e.target.value as QuestionType,
                    correctAnswers: []
                  })
                }
                className="border px-3 py-2 rounded-lg mb-4"
              >
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="text">Text Answer</option>
              </select>

              {q.type !== "text" && (
                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const isSelected = q.correctAnswers.includes(i);

                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-xl border ${
                          isSelected
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200"
                        }`}
                      >
                        {q.type === "single" ? (
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={isSelected}
                            onChange={() =>
                              toggleCorrectAnswer(q, i)
                            }
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              toggleCorrectAnswer(q, i)
                            }
                          />
                        )}

                        <input
                          value={opt}
                          onChange={(e) =>
                            updateOption(q.id, i, e.target.value)
                          }
                          placeholder={`Option ${i + 1}`}
                          className="flex-1 border rounded-lg px-3 py-2"
                        />
                      </div>
                    );
                  })}

                  <button
                    onClick={() => addOption(q.id)}
                    className="text-purple-600 text-sm"
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {questions.length < 10 && (
          <button
            onClick={addQuestion}
            className="mt-8 px-6 py-3 bg-purple-100 rounded-xl"
          >
            + Add Question
          </button>
        )}

        <div className="flex justify-end mt-12">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl flex items-center gap-2"
          >
            Save Test
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}