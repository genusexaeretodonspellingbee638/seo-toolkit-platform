export default function ScoreCircle({ score, label, size = 'md' }) {
  const getColor = (s) => {
    if (s >= 90) return 'text-green-400'
    if (s >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getTrackColor = (s) => {
    if (s >= 90) return '#10b981'
    if (s >= 50) return '#f59e0b'
    return '#ef4444'
  }

  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl',
  }

  const radius = size === 'sm' ? 24 : size === 'md' ? 38 : 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const svgSize = size === 'sm' ? 64 : size === 'md' ? 96 : 128

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <svg className="absolute inset-0 -rotate-90" width={svgSize} height={svgSize}>
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="6"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={getTrackColor(score)}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className={`font-bold ${getColor(score)} z-10`}>{score}</span>
      </div>
      {label && <span className="text-gray-400 text-sm font-medium">{label}</span>}
    </div>
  )
}
