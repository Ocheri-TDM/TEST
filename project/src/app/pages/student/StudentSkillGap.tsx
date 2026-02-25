import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { SkillBadge } from "../../components/SkillBadge";
import { ArrowRight, TrendingUp, Award, BookOpen, Lightbulb, Target, AlertTriangle } from "lucide-react";

interface SkillGap {
  skill: string;
  importance: "high" | "medium" | "low";
  demandScore: number;
  estimatedLearningTime: string;
  aiRecommendations: string[];
  relatedJobs: number;
}

export function StudentSkillGap() {
  const navigate = useNavigate();

  const skillGaps: SkillGap[] = [
    {
      skill: "AWS (Amazon Web Services)",
      importance: "high",
      demandScore: 95,
      estimatedLearningTime: "8-12 weeks",
      aiRecommendations: [
        "Start with AWS Cloud Practitioner certification",
        "Practice with AWS Free Tier hands-on labs",
        "Build a serverless application using Lambda and API Gateway",
      ],
      relatedJobs: 18,
    },
    {
      skill: "Kubernetes",
      importance: "high",
      demandScore: 88,
      estimatedLearningTime: "6-10 weeks",
      aiRecommendations: [
        "Complete the Kubernetes Basics tutorial on kubernetes.io",
        "Set up a local cluster with Minikube",
        "Deploy a containerized app to Kubernetes",
      ],
      relatedJobs: 15,
    },
    {
      skill: "Docker",
      importance: "high",
      demandScore: 90,
      estimatedLearningTime: "3-4 weeks",
      aiRecommendations: [
        "Containerize your existing projects",
        "Learn Docker Compose for multi-container apps",
        "Understand Docker networking and volumes",
      ],
      relatedJobs: 20,
    },
    {
      skill: "GraphQL",
      importance: "medium",
      demandScore: 72,
      estimatedLearningTime: "4-6 weeks",
      aiRecommendations: [
        "Build a GraphQL API with Apollo Server",
        "Integrate GraphQL with your React applications",
        "Learn about schema design and resolvers",
      ],
      relatedJobs: 12,
    },
    {
      skill: "Next.js",
      importance: "medium",
      demandScore: 78,
      estimatedLearningTime: "3-5 weeks",
      aiRecommendations: [
        "Migrate a React app to Next.js",
        "Learn about SSR and SSG concepts",
        "Explore Next.js API routes and middleware",
      ],
      relatedJobs: 14,
    },
    {
      skill: "CI/CD (Jenkins/GitLab CI)",
      importance: "medium",
      demandScore: 80,
      estimatedLearningTime: "4-6 weeks",
      aiRecommendations: [
        "Set up a basic CI/CD pipeline for a personal project",
        "Learn about automated testing in pipelines",
        "Understand deployment strategies (blue-green, canary)",
      ],
      relatedJobs: 16,
    },
  ];

  const getImportanceConfig = (importance: string) => {
    switch (importance) {
      case "high":
        return { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle };
      case "medium":
        return { color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", icon: TrendingUp };
      default:
        return { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", icon: Lightbulb };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
          <p className="text-gray-600">AI-identified skills to boost your job match percentage</p>
        </div>

        {/* Summary Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">6 Key Skills Identified</h2>
              <p className="text-orange-50 mb-4">
                Learning these skills could increase your average job match from 83% to 95%+
              </p>
              <div className="flex gap-4 text-sm">
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span className="font-semibold">3</span> High Priority
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span className="font-semibold">3</span> Medium Priority
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="space-y-6">
          {skillGaps.map((gap) => {
            const config = getImportanceConfig(gap.importance);
            const Icon = config.icon;

            return (
              <div
                key={gap.skill}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{gap.skill}</h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} ${config.border} border`}>
                        <Icon className="w-3 h-3" />
                        {gap.importance.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Market Demand: <span className="font-semibold text-gray-900">{gap.demandScore}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Learning Time: <span className="font-semibold text-gray-900">{gap.estimatedLearningTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Opens <span className="font-semibold text-gray-900">{gap.relatedJobs} more jobs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">AI Learning Recommendations</h4>
                  </div>
                  <ul className="space-y-2">
                    {gap.aiRecommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 font-bold mt-0.5">{idx + 1}.</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Add to Learning Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Projected Impact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">+12%</div>
              <p className="text-sm text-gray-600">Average Match Increase</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">+15</div>
              <p className="text-sm text-gray-600">Additional Job Opportunities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">16-24</div>
              <p className="text-sm text-gray-600">Weeks to Complete All</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/student/job-match")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Job Matches
          </button>
          <button
            onClick={() => navigate("/student/growth-simulator")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Try Growth Simulator
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
