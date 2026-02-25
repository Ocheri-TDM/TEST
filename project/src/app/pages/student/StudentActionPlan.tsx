import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ArrowRight, BookOpen, Code, Video, FileText, CheckCircle2, Circle, MessageSquare, Users, Trophy } from "lucide-react";

interface ActionItem {
  id: number;
  title: string;
  type: "course" | "project" | "article" | "interview" | "soft-skill";
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  description: string;
  link?: string;
}

export function StudentActionPlan() {
  const navigate = useNavigate();
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: 1,
      title: "AWS Cloud Practitioner Certification Course",
      type: "course",
      duration: "40 hours",
      difficulty: "beginner",
      completed: false,
      description: "Complete foundational AWS training and get certified",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 2,
      title: "Build a Serverless Web App with AWS Lambda",
      type: "project",
      duration: "2 weeks",
      difficulty: "intermediate",
      completed: false,
      description: "Hands-on project to deploy a full-stack serverless application",
    },
    {
      id: 3,
      title: "Kubernetes Fundamentals",
      type: "course",
      duration: "30 hours",
      difficulty: "intermediate",
      completed: false,
      description: "Learn container orchestration with Kubernetes",
    },
    {
      id: 4,
      title: "Deploy Multi-Container App with Docker Compose",
      type: "project",
      duration: "1 week",
      difficulty: "beginner",
      completed: false,
      description: "Create a microservices app using Docker",
    },
    {
      id: 5,
      title: "GraphQL Best Practices",
      type: "article",
      duration: "2 hours",
      difficulty: "intermediate",
      completed: false,
      description: "Read comprehensive guide on GraphQL schema design",
      link: "https://graphql.org/learn/best-practices/",
    },
    {
      id: 6,
      title: "Mock System Design Interview",
      type: "interview",
      duration: "1 hour",
      difficulty: "advanced",
      completed: false,
      description: "Practice designing scalable systems with a mentor",
    },
    {
      id: 7,
      title: "Communication Skills for Developers",
      type: "soft-skill",
      duration: "10 hours",
      difficulty: "beginner",
      completed: false,
      description: "Improve technical communication and presentation skills",
    },
    {
      id: 8,
      title: "Leadership in Tech Teams",
      type: "soft-skill",
      duration: "8 hours",
      difficulty: "intermediate",
      completed: false,
      description: "Learn to lead projects and mentor junior developers",
    },
  ]);

  const toggleComplete = (id: number) => {
    setActionItems(actionItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return { icon: Video, color: "bg-blue-100 text-blue-600" };
      case "project":
        return { icon: Code, color: "bg-purple-100 text-purple-600" };
      case "article":
        return { icon: FileText, color: "bg-green-100 text-green-600" };
      case "interview":
        return { icon: MessageSquare, color: "bg-orange-100 text-orange-600" };
      case "soft-skill":
        return { icon: Users, color: "bg-pink-100 text-pink-600" };
      default:
        return { icon: BookOpen, color: "bg-gray-100 text-gray-600" };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const completedCount = actionItems.filter(item => item.completed).length;
  const totalCount = actionItems.length;
  const progress = (completedCount / totalCount) * 100;

  const groupedItems = {
    courses: actionItems.filter(item => item.type === "course"),
    projects: actionItems.filter(item => item.type === "project"),
    articles: actionItems.filter(item => item.type === "article"),
    interviews: actionItems.filter(item => item.type === "interview"),
    softSkills: actionItems.filter(item => item.type === "soft-skill"),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Action Plan</h1>
          <p className="text-gray-600">Your roadmap to career success based on AI analysis</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-blue-100">
                {completedCount} of {totalCount} actions completed
              </p>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-4 overflow-hidden mb-4">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-blue-100 mb-1">Courses</p>
              <p className="font-bold">
                {groupedItems.courses.filter(i => i.completed).length}/{groupedItems.courses.length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-blue-100 mb-1">Projects</p>
              <p className="font-bold">
                {groupedItems.projects.filter(i => i.completed).length}/{groupedItems.projects.length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-blue-100 mb-1">Articles</p>
              <p className="font-bold">
                {groupedItems.articles.filter(i => i.completed).length}/{groupedItems.articles.length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-blue-100 mb-1">Interviews</p>
              <p className="font-bold">
                {groupedItems.interviews.filter(i => i.completed).length}/{groupedItems.interviews.length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-blue-100 mb-1">Soft Skills</p>
              <p className="font-bold">
                {groupedItems.softSkills.filter(i => i.completed).length}/{groupedItems.softSkills.length}
              </p>
            </div>
          </div>
        </div>

        {/* Action Items by Category */}
        <div className="space-y-8">
          {/* Technical Learning */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Technical Learning
            </h2>
            <div className="space-y-4">
              {[...groupedItems.courses, ...groupedItems.articles].map((item) => {
                const typeConfig = getTypeIcon(item.type);
                const Icon = typeConfig.icon;

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl border-2 p-6 transition-all ${
                      item.completed
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          item.completed
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${
                            item.completed ? "text-gray-500 line-through" : "text-gray-900"
                          }`}>
                            {item.title}
                          </h3>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">⏱️ {item.duration}</span>
                          <span className={`px-2 py-1 rounded border text-xs font-medium capitalize ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty}
                          </span>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              View Resource →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mini Projects */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-purple-600" />
              Mini Projects
            </h2>
            <div className="space-y-4">
              {groupedItems.projects.map((item) => {
                const typeConfig = getTypeIcon(item.type);
                const Icon = typeConfig.icon;

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl border-2 p-6 transition-all ${
                      item.completed
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-purple-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          item.completed
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${
                            item.completed ? "text-gray-500 line-through" : "text-gray-900"
                          }`}>
                            {item.title}
                          </h3>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">⏱️ {item.duration}</span>
                          <span className={`px-2 py-1 rounded border text-xs font-medium capitalize ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interview Prep & Soft Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-pink-600" />
              Interview Prep & Soft Skills
            </h2>
            <div className="space-y-4">
              {[...groupedItems.interviews, ...groupedItems.softSkills].map((item) => {
                const typeConfig = getTypeIcon(item.type);
                const Icon = typeConfig.icon;

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl border-2 p-6 transition-all ${
                      item.completed
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-pink-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          item.completed
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${
                            item.completed ? "text-gray-500 line-through" : "text-gray-900"
                          }`}>
                            {item.title}
                          </h3>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">⏱️ {item.duration}</span>
                          <span className={`px-2 py-1 rounded border text-xs font-medium capitalize ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/student/growth-simulator")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Simulator
          </button>
          <button
            onClick={() => navigate("/student/skill-test")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Take Skill Test
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
