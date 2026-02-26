import {
  Upload,
  Sparkles,
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
  ArrowRight,
  AlertCircle,
  Target,
  CheckCircle,
  Zap,
  BarChart3,
  Shield,
} from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/40 via-blue-50/30 to-white relative overflow-hidden">
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700">
              AI-Powered Career Intelligence Platform
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bridging Education and Real Career Opportunities
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            AI-powered platform connecting students and employers through skill intelligence.
          </p>

          {/* Trust Metrics */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">78%</div>
              <div className="text-sm text-gray-600">of graduates feel unprepared</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-1">65%</div>
              <div className="text-sm text-gray-600">employers report skill mismatch</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">+30%</div>
              <div className="text-sm text-gray-600">match improvement with optimization</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI In Action Section */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            See AI Career Analysis in Action
          </h2>
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4 px-3 py-1 bg-purple-100 rounded-full">
              <span className="text-xs font-medium text-purple-700">Simulated Analysis</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-sm text-gray-500 mb-2">Resume Score</div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-gray-900">72%</span>
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <div className="h-full w-[72%] bg-gradient-to-r from-purple-500 to-blue-500" />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Market Readiness</div>
                <div className="inline-flex items-center px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 mt-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                  <span className="font-semibold text-amber-700">Moderate</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">Top Missing Skills</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 font-medium">
                  REST APIs
                </span>
                <span className="px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 font-medium">
                  Docker
                </span>
                <span className="px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 font-medium">
                  System Design
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <span className="text-gray-700 font-medium">Match Increase if improved</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">+18%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-12 text-center border border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Turn Your Skills Into Opportunities
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stop guessing what employers want. Let AI show you exactly what to learn.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105">
              Start Career Analysis
            </button>
          </div>
        </div>
      </section>

      {/* The Career Readiness Gap Section */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">The Career Readiness Gap</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 bg-purple-200/50 rounded-xl blur-xl group-hover:bg-purple-300/50 transition-colors" />
                <div className="relative w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <AlertCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Skill mismatch in the job market
              </h3>
              <p className="text-gray-600">
                <strong className="text-gray-900">78% of graduates feel unprepared.</strong> Graduates lack practical skills employers need, creating a widening gap between education and employment opportunities.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 bg-blue-200/50 rounded-xl blur-xl group-hover:bg-blue-300/50 transition-colors" />
                <div className="relative w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lack of career guidance
              </h3>
              <p className="text-gray-600">
                <strong className="text-gray-900">No clear path forward.</strong> Students struggle to understand market demands and what skills they should focus on developing for their careers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 bg-purple-200/50 rounded-xl blur-xl group-hover:bg-purple-300/50 transition-colors" />
                <div className="relative w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Employers struggle to evaluate skills
              </h3>
              <p className="text-gray-600">
                <strong className="text-gray-900">Hiring is broken.</strong> Companies find it difficult to assess real capabilities beyond resumes and grades, leading to poor hiring decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-16 px-6 bg-white/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Solution</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Resume & GitHub Analysis
              </h3>
              <p className="text-gray-600">
                Advanced AI analyzes your resume and GitHub profile to extract and verify your actual skills and experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Skill Gap Detection
              </h3>
              <p className="text-gray-600">
                Identify exactly what skills you're missing for your dream job and get a clear roadmap to acquire them.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Growth Simulation
              </h3>
              <p className="text-gray-600">
                Simulate your career growth with different skill paths and see which direction maximizes your potential.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Personalized Learning Plan
              </h3>
              <p className="text-gray-600">
                Get a customized learning roadmap with resources, courses, and projects tailored to your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Journey Section */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            From Resume to Real Job Offer
          </h2>
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200" />

            <div className="grid md:grid-cols-5 gap-8 relative">
              {[
                { icon: Upload, title: "Upload Resume", num: 1 },
                { icon: Target, title: "AI Detects Skill Gaps", num: 2 },
                { icon: GraduationCap, title: "Personalized Learning Plan", num: 3 },
                { icon: TrendingUp, title: "Improved Match %", num: 4 },
                { icon: CheckCircle, title: "Get Hired", num: 5 },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white border-2 border-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                      <span className="text-purple-600 font-bold text-sm">{step.num}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="py-16 px-6 bg-white/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why We're Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real Skill Validation
              </h3>
              <p className="text-gray-600">
                We verify skills through actual code analysis and testing, not just keyword matching from resumes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Growth Simulation Engine
              </h3>
              <p className="text-gray-600">
                Unique AI models predict your career trajectory with different skill combinations before you invest time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Live Market Intelligence
              </h3>
              <p className="text-gray-600">
                Real-time data from thousands of job postings keeps your learning aligned with current market demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Resume</h3>
              <p className="text-gray-600">
                Upload your resume and connect your GitHub profile to get started with comprehensive analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get AI Analysis</h3>
              <p className="text-gray-600">
                Our AI evaluates your skills, detects gaps, and compares you with market demands in real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Improve & Match</h3>
              <p className="text-gray-600">
                Follow your personalized learning plan and get matched with opportunities that fit your growing skillset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="py-16 px-6 bg-white/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Who Is It For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Students</h3>
              <p className="text-gray-600">
                Understand your current skill level, discover gaps, and get a clear roadmap to land your dream job with confidence.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Employers</h3>
              <p className="text-gray-600">
                Find candidates with verified skills that match your needs, reducing hiring time and improving quality of hires.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Universities</h3>
              <p className="text-gray-600">
                Track student progress, align curriculum with market needs, and improve graduate employability rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Bridge Your Career Gap?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students and employers using CareerMatch AI to build better futures.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
