import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Upload, Github, FileText, ArrowRight, CheckCircle2, Plus, X } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "employer" | null>(null);

  // === Common Auth State ===
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // === Student State ===
  const [name, setName] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [experience, setExperience] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // === Employer State ===
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [position, setPosition] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setTechStack(["React", "JavaScript", "TypeScript", "Node.js", "Python", "SQL"]);
      }, 2000);
    }
  };

  const addSkill = () => {
    if (newSkill && !techStack.includes(newSkill)) {
      setTechStack([...techStack, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setTechStack(techStack.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // === Validate email/password ===
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      let payload: any = { email, password, role };

      if (role === "student") {
        payload = { ...payload, name, github, portfolio, experience, techStack };
        // Можно добавить resumeFile обработку позже
        await fetch("https://19e71b04da22e75b.mokky.dev/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (role === "employer") {
        payload = { ...payload, companyName, website, position };
        await fetch("https://19e71b04da22e75b.mokky.dev/employers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  // === Role Selection ===
  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Role</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setRole("student")}
              className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              I am a Student
            </button>
            <button
              onClick={() => setRole("employer")}
              className="flex-1 px-6 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              I am an Employer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === Registration Form ===
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role={role} userName={role === "student" ? name || "Guest" : companyName || "Company"} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {role === "student" ? "Complete Your Student Profile" : "Complete Your Employer Profile"}
        </h1>
        <p className="text-gray-600 mb-6">
          {role === "student"
            ? "Let's build your career profile with AI-powered insights"
            : "Fill in your company details and create your account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* === Common Fields === */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {role === "student" ? (
            <>
              {/* Basic Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          placeholder="github.com/username"
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
                      <input
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="yourportfolio.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["beginner", "intermediate", "advanced"] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setExperience(level)}
                          className={`px-4 py-3 rounded-lg border-2 font-medium capitalize transition-all ${
                            experience === level
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Resume Upload</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Upload your resume and our AI will extract your skills automatically
                </p>
                <label className="block">
                  <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      resumeFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{resumeFile.name}</p>
                          <p className="text-sm text-gray-600">
                            {isAnalyzing ? "Analyzing with AI..." : "Ready to process"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="font-medium text-gray-900 mb-1">Upload your resume (PDF)</p>
                        <p className="text-sm text-gray-600">Click to browse or drag and drop</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {/* Tech Stack */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Tech Stack</h2>
                <p className="text-sm text-gray-600 mb-6">
                  {resumeFile ? "AI-extracted skills (you can add or remove)" : "Add your technical skills manually"}
                </p>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                      <span className="font-medium">{skill}</span>
                      <button type="button" onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* === Employer Fields === */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Position *</label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="HR Manager"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* === Submit Buttons === */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setRole(null)}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={
                role === "student"
                  ? !name
                  : !companyName || !position
              }
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Register
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}