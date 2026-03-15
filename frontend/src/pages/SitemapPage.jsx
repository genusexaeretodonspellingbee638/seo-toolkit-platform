import { useState } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ResultCard from '../components/ResultCard'
import { HiMap, HiDatabase, HiClock, HiExternalLink } from 'react-icons/hi'

export default function SitemapPage() {
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
      const { data } = await api.get(`/sitemap?url=${encodeURIComponent(url.trim())}`)
      setResult(data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Sitemap analizi başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white text-3xl mb-4">
          <HiMap />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Site Haritası Analizi</h1>
        <p className="text-gray-400">Bir domain veya sitemap URL'si girerek site haritasını analiz edin</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="örn: google.com veya https://google.com/sitemap.xml"
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
      {loading && <LoadingSpinner text="Sitemap dosyası analiz ediliyor..." />}

      {result && (
        <div className="space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary-400">{result.totalUrls}</div>
              <div className="text-gray-500 text-xs mt-1">Toplam URL</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-accent-400">{result.sitemapSize}</div>
              <div className="text-gray-500 text-xs mt-1">Boyut</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{result.isSitemapIndex ? 'Evet' : 'Hayır'}</div>
              <div className="text-gray-500 text-xs mt-1">Sitemap Index</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{result.lastModifiedDates?.length || 0}</div>
              <div className="text-gray-500 text-xs mt-1">Benzersiz Tarih</div>
            </div>
          </div>

          {/* Last Modified Dates */}
          {result.lastModifiedDates?.length > 0 && (
            <ResultCard title="Son Düzenlenme Tarihleri" icon={<HiClock />}>
              <div className="flex flex-wrap gap-2">
                {result.lastModifiedDates.map((date, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-dark-800/50 text-gray-300 text-sm">
                    {date}
                  </span>
                ))}
              </div>
            </ResultCard>
          )}

          {/* URL List */}
          <ResultCard title={`URL Listesi (ilk ${result.urls?.length || 0})`} icon={<HiDatabase />}>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {result.urls?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-dark-800/30 hover:bg-dark-800/60 transition group">
                  <span className="text-gray-600 text-xs font-mono w-8">{i + 1}</span>
                  <a
                    href={item.loc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-300 text-sm truncate flex-1 group-hover:text-primary-200"
                  >
                    {item.loc}
                  </a>
                  <HiExternalLink className="text-gray-600 group-hover:text-primary-400 flex-shrink-0" />
                  {item.lastmod && item.lastmod !== 'Bilinmiyor' && (
                    <span className="text-gray-600 text-xs flex-shrink-0">{item.lastmod}</span>
                  )}
                </div>
              ))}
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  )
}
