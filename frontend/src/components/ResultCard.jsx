export default function ResultCard({ title, icon, children, className = '' }) {
  return (
    <div className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <span className="text-primary-400 text-xl">{icon}</span>}
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  )
}
