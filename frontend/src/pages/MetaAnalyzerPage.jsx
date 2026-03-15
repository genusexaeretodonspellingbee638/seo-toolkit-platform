import { useState } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ResultCard from '../components/ResultCard'
import { HiCode, HiPhotograph, HiLink, HiDocumentSearch } from 'react-icons/hi'

export default function MetaAnalyzerPage() {
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
      const { data } = await api.get(`/meta-analyzer?url=${encodeURIComponent(url.trim())}`)
      setResult(data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Meta etiket analizi başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl mb-4">
          <HiCode />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Meta Etiket Analizi</h1>
        <p className="text-gray-400">Bir URL girerek meta etiketlerini analiz edin</p>
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
          Analiz Et
        </button>
      </form>

      <ErrorMessage message={error} />
      {loading && <LoadingSpinner text="Sayfa analiz ediliyor..." />}

      {result && (
        <div className="space-y-6">
          {/* Basic Meta */}
          <ResultCard title="Temel Meta Etiketleri" icon={<HiDocumentSearch />}>
            <div className="space-y-4">
              <MetaItem label="Title" value={result.title} />
              <MetaItem label="Meta Description" value={result.metaDescription} />
              <MetaItem label="Canonical URL" value={result.canonical} />
              <MetaItem label="Robots" value={result.robots} />
              <MetaItem label="Charset" value={result.charset} />
              <MetaItem label="Viewport" value={result.viewport} />
            </div>
          </ResultCard>

          {/* Open Graph */}
          <ResultCard title="Open Graph Etiketleri" icon={<HiPhotograph />}>
            <div className="space-y-4">
              <MetaItem label="og:title" value={result.ogTitle} />
              <MetaItem label="og:description" value={result.ogDescription} />
              <MetaItem label="og:image" value={result.ogImage} />
              <MetaItem label="og:url" value={result.ogUrl} />
            </div>
          </ResultCard>

          {/* Page Stats */}
          <ResultCard title="Sayfa İstatistikleri" icon={<HiLink />}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatBox label="H1 Başlıklar" value={result.h1Count} />
              <StatBox label="H2 Başlıklar" value={result.h2Count} />
              <StatBox label="Toplam Görseller" value={result.totalImages} />
              <StatBox label="Alt'sız Görseller" value={result.imgWithoutAlt} warn={result.imgWithoutAlt > 0} />
              <StatBox label="Toplam Linkler" value={result.totalLinks} />
              <StatBox label="Dış Linkler" value={result.externalLinks} />
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  )
}

function MetaItem({ label, value }) {
  const isMissing = !value || value === 'Bulunamadı'
  return (
    <div className="flex flex-col gap-1">
      <span className="text-primary-400 text-xs font-semibold uppercase tracking-wider">{label}</span>
      <span className={`text-sm ${isMissing ? 'text-red-400 italic' : 'text-gray-300'} break-all`}>
        {value || 'Bulunamadı'}
      </span>
    </div>
  )
}

function StatBox({ label, value, warn = false }) {
  return (
    <div className={`p-4 rounded-xl ${warn ? 'bg-red-500/10 border border-red-500/20' : 'bg-dark-800/50'} text-center`}>
      <div className={`text-2xl font-bold ${warn ? 'text-red-400' : 'text-white'}`}>{value}</div>
      <div className="text-gray-500 text-xs mt-1">{label}</div>
    </div>
  )
}
