import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Users,
  Briefcase,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"student" | "employer">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        activeTab === "student"
          ? "https://19e71b04da22e75b.mokky.dev/students"
          : "https://19e71b04da22e75b.mokky.dev/employers";

      const response = await fetch(endpoint);
      const users = await response.json();

      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      /* =========================
         🔐 SAVE AUTH DATA
      ========================= */

      const fakeToken = Math.random().toString(36).substring(2);

      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("userRole", activeTab);
      localStorage.setItem("userEmail", user.email);

      if (activeTab === "student") {
        localStorage.setItem("studentId", user.id);
        localStorage.setItem("userName", user.name || "");

        if (!user.name) {
          navigate("/student/profile");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        // 🔥 ВАЖНО — сохраняем employerId
        localStorage.setItem("employerId", user.id);
        localStorage.setItem("userName", user.companyName || "");

        if (!user.companyName) {
          navigate("/register");
        } else {
          navigate("/employer");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-xl text-gray-900">CareerMatch AI</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              About
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Features
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Hero */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Matching
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your Future Career,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Perfectly Matched</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Advanced AI that analyzes your skills, matches you with opportunities, and creates personalized growth plans.
            </p>

            {/* Features */}
            <div className="grid gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Smart Job Matching</h3>
                  <p className="text-sm text-gray-600">AI-powered matching with detailed skill gap analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Growth Simulator</h3>
                  <p className="text-sm text-gray-600">See how learning new skills impacts your match percentage</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Personalized Action Plans</h3>
                  <p className="text-sm text-gray-600">Custom learning paths, projects, and interview prep</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>

            {/* Role Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-6">
              <button
                onClick={() => setActiveTab("student")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all ${
                  activeTab === "student"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-4 h-4" />
                Student
              </button>
              <button
                onClick={() => setActiveTab("employer")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all ${
                  activeTab === "employer"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Employer
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg ${
                  activeTab === "student"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700"
                    : "bg-gradient-to-r from-purple-600 to-purple-700"
                }`}
              >
                {loading ? "Logging in..." : activeTab === "student" ? "Login as Student" : "Login as Employer"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => navigate("/register")}
                >
                  Sign up for free
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}