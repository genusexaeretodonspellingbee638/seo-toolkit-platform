import { HiExclamationCircle } from 'react-icons/hi'

export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
      <HiExclamationCircle className="text-red-400 text-xl flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
