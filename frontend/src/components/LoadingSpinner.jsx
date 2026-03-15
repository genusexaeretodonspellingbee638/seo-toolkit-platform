export default function LoadingSpinner({ text = 'Yükleniyor...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
      </div>
      <p className="text-gray-400 text-sm animate-pulse">{text}</p>
    </div>
  )
}
