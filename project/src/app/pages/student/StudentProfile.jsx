import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Upload, Github, CheckCircle2, Plus, X } from "lucide-react";

export function StudentProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [experience, setExperience] = useState("beginner");
  const [techStack, setTechStack] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ============================
  // Загрузка данных студента
  // ============================
  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      console.warn("No studentId found in localStorage");
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `https://19e71b04da22e75b.mokky.dev/students/${studentId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch student");
        }

        const data = await response.json();

        setEmail(data.email || "");
        setName(data.name || "");
        setGithub(data.github || "");
        setPortfolio(data.portfolio || "");
        setExperience(data.experience || "beginner");
        setTechStack(data.techStack || []);
      } catch (error) {
        console.error("Failed to load student:", error);
      }
    };

    fetchStudent();
  }, []);

  // ============================
  // Загрузка резюме (имитация AI)
  // ============================
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setIsAnalyzing(true);

      // Имитация AI анализа
      setTimeout(() => {
        setIsAnalyzing(false);
        setTechStack([
          "React",
          "JavaScript",
          "TypeScript",
          "Node.js",
          "Python",
          "SQL",
        ]);
      }, 2000);
    }
  };

  // ============================
  // Добавление навыка
  // ============================
  const addSkill = () => {
    if (newSkill.trim() && !techStack.includes(newSkill.trim())) {
      setTechStack([...techStack, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setTechStack(techStack.filter((s) => s !== skill));
  };

  // ============================
  // Сохранение профиля
  // ============================
  const handleSave = async (e) => {
    e.preventDefault();

    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      alert("User not authenticated");
      return;
    }

    const profileData = {
      email,
      name,
      github,
      portfolio,
      experience,
      techStack,
    };

    try {
      const response = await fetch(
        `https://19e71b04da22e75b.mokky.dev/students/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Error saving profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName={name || "Student"} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Student Profile
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your professional profile and skills
        </p>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tech Stack
            </h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
                placeholder="Add skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {techStack.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
                >
                  <span>{skill}</span>
                  <button type="button" onClick={() => removeSkill(skill)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}