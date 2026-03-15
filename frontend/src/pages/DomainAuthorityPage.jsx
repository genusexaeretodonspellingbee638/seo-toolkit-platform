import { useState } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ResultCard from '../components/ResultCard'
import ScoreCircle from '../components/ScoreCircle'
import { HiShieldCheck, HiDatabase, HiTrendingUp } from 'react-icons/hi'

export default function DomainAuthorityPage() {
  const [domain, setDomain] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!domain.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const { data } = await api.get(`/domain-authority?domain=${encodeURIComponent(domain.trim())}`)
      setResult(data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Domain Authority sorgusu başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }

  const getSpamColor = (score) => {
    if (score <= 5) return 'text-green-400'
    if (score <= 15) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-3xl mb-4">
          <HiShieldCheck />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Domain Otorite Skoru</h1>
        <p className="text-gray-400">DA, PA ve spam puanını hesaplayın (simülasyon)</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="örn: google.com"
          className="flex-1 px-5 py-3.5 rounded-xl bg-dark-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Hesapla
        </button>
      </form>

      <ErrorMessage message={error} />
      {loading && <LoadingSpinner text="Domain otorite puanı hesaplanıyor..." />}

      {result && (
        <div className="space-y-6">
          {/* Main Scores */}
          <ResultCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
              <div className="flex flex-col items-center">
                <ScoreCircle score={result.domainAuthority} label="Domain Authority" size="lg" />
                <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  result.domainAuthority >= 70 ? 'bg-green-500/10 text-green-400' :
                  result.domainAuthority >= 50 ? 'bg-blue-500/10 text-blue-400' :
                  result.domainAuthority >= 30 ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {result.daRating}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <ScoreCircle score={result.pageAuthority} label="Page Authority" size="lg" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-4 border-dark-700 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getSpamColor(result.spamScore)}`}>
                    {result.spamScore}%
                  </span>
                  <span className="text-gray-500 text-xs">Spam Skoru</span>
                </div>
                <span className="text-gray-400 text-sm mt-3">Spam Skoru</span>
                <span className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                  result.spamScore <= 5 ? 'bg-green-500/10 text-green-400' :
                  result.spamScore <= 15 ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {result.spamRating}
                </span>
              </div>
            </div>
          </ResultCard>

          {/* Additional Metrics */}
          <ResultCard title="Ek Metrikler" icon={<HiTrendingUp />}>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                <div className="text-2xl font-bold text-primary-400">
                  {result.metrics.totalBacklinks?.toLocaleString('tr-TR')}
                </div>
                <div className="text-gray-500 text-xs mt-1">Toplam Backlinkler</div>
              </div>
              <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                <div className="text-2xl font-bold text-accent-400">
                  {result.metrics.referringDomains?.toLocaleString('tr-TR')}
                </div>
                <div className="text-gray-500 text-xs mt-1">Referring Domains</div>
              </div>
              <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {result.metrics.totalKeywords?.toLocaleString('tr-TR')}
                </div>
                <div className="text-gray-500 text-xs mt-1">Toplam Anahtar Kelime</div>
              </div>
            </div>
          </ResultCard>

          {result.note && (
            <p className="text-center text-gray-500 text-sm italic">{result.note}</p>
          )}
        </div>
      )}
    </div>
  )
}
