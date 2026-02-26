import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Plus, X, ArrowRight, Briefcase } from "lucide-react";

export function EmployerCreateJob() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<"full-time" | "part-time" | "contract">("full-time");
  const [experienceLevel, setExperienceLevel] = useState<"entry" | "mid" | "senior">("mid");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const [hardSkills, setHardSkills] = useState<string[]>([]);
  const [newHardSkill, setNewHardSkill] = useState("");

  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [newSoftSkill, setNewSoftSkill] = useState("");

  const suggestedHardSkills = [
    "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes",
    "GraphQL", "MongoDB", "PostgreSQL", "Redis", "CI/CD", "Git"
  ];

  const suggestedSoftSkills = [
    "Communication", "Leadership", "Problem Solving", "Teamwork", "Adaptability",
    "Time Management", "Critical Thinking", "Creativity"
  ];

  const addHardSkill = (skill: string) => {
    if (skill && !hardSkills.includes(skill)) {
      setHardSkills([...hardSkills, skill]);
      setNewHardSkill("");
    }
  };

  const addSoftSkill = (skill: string) => {
    if (skill && !softSkills.includes(skill)) {
      setSoftSkills([...softSkills, skill]);
      setNewSoftSkill("");
    }
  };

  const removeHardSkill = (skill: string) => {
    setHardSkills(hardSkills.filter(s => s !== skill));
  };

  const removeSoftSkill = (skill: string) => {
    setSoftSkills(softSkills.filter(s => s !== skill));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const employerId = localStorage.getItem("employerId");
    
    if (!employerId) {
      console.log("employerId:", employerId);
      alert("Employer not authenticated");
      return;
    }

    const payload = {
      jobTitle,
      description,
      location,
      jobType,
      experienceLevel,
      salaryMin: salaryMin ? Number(salaryMin) : undefined,
      salaryMax: salaryMax ? Number(salaryMax) : undefined,
      hardSkills,
      softSkills,
      employerId: Number(employerId),
      postedBy: localStorage.getItem("userEmail") || "employer@example.com",
    };

    try {
      const response = await fetch(
        "https://19e71b04da22e75b.mokky.dev/employer-posting",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to create job posting");

      const result = await response.json();
      console.log("Job posted:", result);

      navigate(`/employer/create-test/${result.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create job posting. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="employer" userName="TechCorp Inc." />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Job Posting</h1>
          <p className="text-gray-600">AI will automatically match qualified candidates</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Frontend Developer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the role, responsibilities, and ideal candidate..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Francisco, CA or Remote"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["entry", "mid", "senior"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setExperienceLevel(level)}
                      className={`px-4 py-3 rounded-lg border-2 font-medium capitalize transition-all ${
                        experienceLevel === level
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {level === "entry" ? "Entry Level" : level === "mid" ? "Mid Level" : "Senior"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range (Min)
                  </label>
                  <input
                    type="text"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="e.g., $100,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range (Max)
                  </label>
                  <input
                    type="text"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="e.g., $140,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Required Hard Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Required Technical Skills</h2>
            <p className="text-sm text-gray-600 mb-6">
              Select or add the technical skills required for this position
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suggested Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedHardSkills
                  .filter(skill => !hardSkills.includes(skill))
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addHardSkill(skill)}
                      className="px-3 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newHardSkill}
                onChange={(e) => setNewHardSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHardSkill(newHardSkill))}
                placeholder="Add a custom skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => addHardSkill(newHardSkill)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {hardSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg border border-purple-200"
                >
                  <span className="font-medium">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeHardSkill(skill)}
                    className="hover:text-purple-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {hardSkills.length === 0 && (
              <p className="text-center py-8 text-gray-400">No technical skills added yet</p>
            )}
          </div>

          {/* Soft Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Desired Soft Skills</h2>
            <p className="text-sm text-gray-600 mb-6">
              Select soft skills important for team fit and company culture
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suggested Soft Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedSoftSkills
                  .filter(skill => !softSkills.includes(skill))
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSoftSkill(skill)}
                      className="px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSoftSkill(newSoftSkill))}
                placeholder="Add a custom soft skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => addSoftSkill(newSoftSkill)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
                >
                  <span className="font-medium">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSoftSkill(skill)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Preview */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI Matching Preview</h3>
                <p className="text-purple-100 text-sm mb-3">
                  Based on your requirements, we estimate:
                </p>
                <ul className="space-y-1 text-sm text-purple-50">
                  <li>• ~{hardSkills.length * 8} candidates in our database</li>
                  <li>• {Math.max(5, hardSkills.length * 2)} candidates with 80%+ match</li>
                  <li>• Average match rate: ~{85 - hardSkills.length * 2}%</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/employer")}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!jobTitle || !description || hardSkills.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Create test & Check abillity
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
