import { useState } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ResultCard from '../components/ResultCard'
import ScoreCircle from '../components/ScoreCircle'
import { HiLightningBolt, HiClock } from 'react-icons/hi'

export default function PageSpeedPage() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const { data } = await api.get(`/pagespeed?url=${encodeURIComponent(url.trim())}`)
      setResult(data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Sayfa hızı testi başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-3xl mb-4">
          <HiLightningBolt />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Sayfa Hızı Testi</h1>
        <p className="text-gray-400">Google PageSpeed Insights ile sayfa performansınızı ölçün</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="örn: https://google.com"
          className="flex-1 px-5 py-3.5 rounded-xl bg-dark-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Test Et
        </button>
      </form>

      <ErrorMessage message={error} />
      {loading && <LoadingSpinner text="Sayfa hızı test ediliyor... Bu işlem 30-60 saniye sürebilir." />}

      {result && (
        <div className="space-y-6">
          {/* Score Circles */}
          <ResultCard title="Puanlar" icon={<HiLightningBolt />}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
              <ScoreCircle score={result.scores.performance} label="Performans" size="md" />
              <ScoreCircle score={result.scores.accessibility} label="Erişilebilirlik" size="md" />
              <ScoreCircle score={result.scores.bestPractices} label="En İyi Uygulamalar" size="md" />
              <ScoreCircle score={result.scores.seo} label="SEO" size="md" />
            </div>
          </ResultCard>

          {/* Core Web Vitals */}
          <ResultCard title="Core Web Vitals ve Metrikler" icon={<HiClock />}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard label="First Contentful Paint" value={result.metrics.firstContentfulPaint} />
              <MetricCard label="Largest Contentful Paint" value={result.metrics.largestContentfulPaint} />
              <MetricCard label="Total Blocking Time" value={result.metrics.totalBlockingTime} />
              <MetricCard label="Cumulative Layout Shift" value={result.metrics.cumulativeLayoutShift} />
              <MetricCard label="Speed Index" value={result.metrics.speedIndex} />
              <MetricCard label="Time to Interactive" value={result.metrics.timeToInteractive} />
            </div>
          </ResultCard>

          {/* Info */}
          <div className="text-center text-gray-500 text-sm">
            Analiz zamanı: {result.fetchTime ? new Date(result.fetchTime).toLocaleString('tr-TR') : '-'}
          </div>
        </div>
      )}
    </div>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-dark-800/50 flex justify-between items-center gap-3">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-semibold text-sm">{value}</span>
    </div>
  )
}
