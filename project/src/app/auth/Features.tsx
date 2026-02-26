import { useNavigate } from "react-router-dom";

import {
  Target,
  FileSearch,
  CheckCircle,
  TrendingUp,
  BookOpen,
  Sparkles,
  Percent,
  MessageSquare,
} from "lucide-react";

export function Features() {
  const navigate = useNavigate();
  const features = [
    {
      icon: Target,
      title: "Skill Gap Analyzer",
      description:
        "Compare your current skills with job requirements and identify exactly what you need to learn to reach your goals.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: FileSearch,
      title: "Resume & GitHub AI Analysis",
      description:
        "Our AI deeply analyzes your resume and GitHub repositories to extract, verify, and quantify your real-world skills.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle,
      title: "Skill Verification Tests",
      description:
        "Take adaptive tests to verify your skills and earn badges that employers trust, proving your capabilities beyond claims.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Growth Simulator",
      description:
        "Simulate different career paths and see projected outcomes based on skills you could develop over time.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: BookOpen,
      title: "Learning Plan Generator",
      description:
        "Get personalized learning roadmaps with curated courses, projects, and resources tailored to your career objectives.",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Sparkles,
      title: "Trending Market Skills",
      description:
        "Stay updated with real-time insights on which skills are in demand and emerging trends in your industry.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Percent,
      title: "Smart Matching %",
      description:
        "See your compatibility percentage with job postings based on your verified skills and experience level.",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: MessageSquare,
      title: "Employer Chat",
      description:
        "Connect directly with employers who are interested in your profile and discuss opportunities in real-time.",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful AI Tools for Career Growth
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to analyze, improve, and match your skills with real opportunities.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              All Features Working Together
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Our AI-powered features are designed to work seamlessly together, providing you with a complete career development ecosystem.
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate("/register")}>
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
