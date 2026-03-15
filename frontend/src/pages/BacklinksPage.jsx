import { useState } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ResultCard from '../components/ResultCard'
import { HiLink, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

export default function BacklinksPage() {
  const [domain, setDomain] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  const fetchBacklinks = async (pageNum = 1) => {
    if (!domain.trim()) return
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get(`/backlinks?domain=${encodeURIComponent(domain.trim())}&page=${pageNum}&limit=10`)
      setResult(data.data)
      setPage(pageNum)
    } catch (err) {
      setError(err.response?.data?.error || 'Backlink sorgusu başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchBacklinks(1)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-3xl mb-4">
          <HiLink />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Backlink Kontrol</h1>
        <p className="text-gray-400">Bir domain girerek backlinklerini görüntüleyin (demo verisi)</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="örn: example.com, google.com, github.com, test.com"
          className="flex-1 px-5 py-3.5 rounded-xl bg-dark-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sorgula
        </button>
      </form>

      <ErrorMessage message={error} />
      {loading && <LoadingSpinner text="Backlinkler sorgulanıyor..." />}

      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary-400">{result.pagination.totalResults}</div>
              <div className="text-gray-500 text-xs mt-1">Toplam Backlink</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {result.backlinks.filter(b => b.follow_type === 'dofollow').length}
              </div>
              <div className="text-gray-500 text-xs mt-1">DoFollow</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {result.backlinks.filter(b => b.follow_type === 'nofollow').length}
              </div>
              <div className="text-gray-500 text-xs mt-1">NoFollow</div>
            </div>
          </div>

          {/* Backlinks Table */}
          <ResultCard title="Backlink Listesi" icon={<HiLink />}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Kaynak URL</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Anchor Text</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Tip</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {result.backlinks.map((bl, i) => (
                    <tr key={i} className="border-b border-gray-800 hover:bg-white/2 transition">
                      <td className="py-3 px-4">
                        <a href={bl.source_url} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 truncate block max-w-xs">
                          {bl.source_url}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{bl.anchor_text}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          bl.follow_type === 'dofollow'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {bl.follow_type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{bl.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {result.pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-800">
                <button
                  onClick={() => fetchBacklinks(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <HiChevronLeft size={20} />
                </button>
                <span className="text-gray-400 text-sm">
                  Sayfa {page} / {result.pagination.totalPages}
                </span>
                <button
                  onClick={() => fetchBacklinks(page + 1)}
                  disabled={page >= result.pagination.totalPages}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <HiChevronRight size={20} />
                </button>
              </div>
            )}
          </ResultCard>

          {result.note && (
            <p className="text-center text-gray-500 text-sm italic">{result.note}</p>
          )}
        </div>
      )}
    </div>
  )
}
