interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  showLabel?: boolean;
  height?: "sm" | "md" | "lg";
}

export function ProgressBar({ 
  value, 
  max = 100, 
  color = "blue", 
  showLabel = true,
  height = "md"
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
    red: "bg-red-600",
  };

  const heightClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[height]} overflow-hidden`}>
        <div
          className={`${colorClasses[color]} ${heightClasses[height]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 mt-1 text-right">{Math.round(percentage)}%</p>
      )}
    </div>
  );
}
