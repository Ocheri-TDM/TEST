interface SkillBadgeProps {
  skill: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  variant?: "default" | "missing" | "strong" | "weak";
}

export function SkillBadge({ skill, level, variant = "default" }: SkillBadgeProps) {
  const variantClasses = {
    default: "bg-blue-50 text-blue-700 border-blue-200",
    missing: "bg-red-50 text-red-700 border-red-200",
    strong: "bg-green-50 text-green-700 border-green-200",
    weak: "bg-orange-50 text-orange-700 border-orange-200",
  };

  const levelColors = {
    beginner: "bg-gray-400",
    intermediate: "bg-blue-400",
    advanced: "bg-purple-400",
    expert: "bg-green-400",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${variantClasses[variant]} text-sm font-medium`}>
      {level && (
        <div className={`w-2 h-2 rounded-full ${levelColors[level]}`} />
      )}
      <span>{skill}</span>
    </div>
  );
}
