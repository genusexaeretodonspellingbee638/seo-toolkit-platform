import { useState } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ResultCard from '../components/ResultCard'
import { HiDocumentText, HiCheck, HiBan, HiMap } from 'react-icons/hi'

export default function RobotsPage() {
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
      const { data } = await api.get(`/robots?domain=${encodeURIComponent(domain.trim())}`)
      setResult(data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Robots.txt analizi başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-3xl mb-4">
          <HiDocumentText />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Robots.txt Test</h1>
        <p className="text-gray-400">Bir domain girerek robots.txt dosyasını analiz edin</p>
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
          Analiz Et
        </button>
      </form>

      <ErrorMessage message={error} />
      {loading && <LoadingSpinner text="Robots.txt dosyası getiriliyor..." />}

      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{result.allowRules?.length || 0}</div>
              <div className="text-gray-500 text-xs mt-1">Allow Kuralı</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{result.disallowRules?.length || 0}</div>
              <div className="text-gray-500 text-xs mt-1">Disallow Kuralı</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary-400">{result.sitemaps?.length || 0}</div>
              <div className="text-gray-500 text-xs mt-1">Sitemap</div>
            </div>
          </div>

          {/* Allow Rules */}
          <ResultCard title="Allow Kuralları" icon={<HiCheck />}>
            {result.allowRules?.length > 0 ? (
              <div className="space-y-2">
                {result.allowRules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/10">
                    <HiCheck className="text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm font-mono">{rule.path}</span>
                    <span className="text-gray-600 text-xs ml-auto">({rule.userAgent})</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Allow kuralı bulunamadı</p>
            )}
          </ResultCard>

          {/* Disallow Rules */}
          <ResultCard title="Disallow Kuralları" icon={<HiBan />}>
            {result.disallowRules?.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {result.disallowRules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10">
                    <HiBan className="text-red-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm font-mono">{rule.path}</span>
                    <span className="text-gray-600 text-xs ml-auto">({rule.userAgent})</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Disallow kuralı bulunamadı</p>
            )}
          </ResultCard>

          {/* Sitemaps */}
          <ResultCard title="Sitemap Bağlantıları" icon={<HiMap />}>
            {result.sitemaps?.length > 0 ? (
              <div className="space-y-2">
                {result.sitemaps.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-lg bg-primary-500/5 border border-primary-500/10 text-primary-300 text-sm font-mono hover:bg-primary-500/10 transition truncate"
                  >
                    {url}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Sitemap bağlantısı bulunamadı</p>
            )}
          </ResultCard>

          {/* Raw Content */}
          <ResultCard title="Ham İçerik">
            <pre className="bg-dark-900 rounded-xl p-4 text-xs text-gray-400 font-mono overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap">
              {result.rawContent}
            </pre>
          </ResultCard>
        </div>
      )}
    </div>
  )
}
