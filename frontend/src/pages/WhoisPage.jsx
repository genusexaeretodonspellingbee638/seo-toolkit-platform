import { useState } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ResultCard from '../components/ResultCard'
import { HiGlobe, HiCalendar, HiServer, HiStatusOnline } from 'react-icons/hi'

export default function WhoisPage() {
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
      const { data } = await api.get(`/whois?domain=${encodeURIComponent(domain.trim())}`)
      setResult(data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'WHOIS sorgusu başarısız oldu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-3xl mb-4">
          <HiGlobe />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">WHOIS Sorgulama</h1>
        <p className="text-gray-400">Bir domain adı girerek kayıt bilgilerini sorgulayın</p>
      </div>

      {/* Search Form */}
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
          Sorgula
        </button>
      </form>

      <ErrorMessage message={error} />
      {loading && <LoadingSpinner text="WHOIS bilgileri sorgulanıyor..." />}

      {result && (
        <div className="grid sm:grid-cols-2 gap-6 animate-in fade-in">
          <ResultCard title="Domain Bilgisi" icon={<HiGlobe />}>
            <div className="space-y-3">
              <InfoRow label="Domain" value={result.domain} />
              <InfoRow label="Registrar" value={result.registrar} />
              <InfoRow label="Kuruluş" value={result.registrantOrganization} />
            </div>
          </ResultCard>

          <ResultCard title="Tarihler" icon={<HiCalendar />}>
            <div className="space-y-3">
              <InfoRow label="Oluşturulma" value={result.creationDate} />
              <InfoRow label="Bitiş" value={result.expirationDate} />
              <InfoRow label="Güncellenme" value={result.updatedDate} />
            </div>
          </ResultCard>

          <ResultCard title="Name Server'lar" icon={<HiServer />}>
            <div className="space-y-2">
              {result.nameServers?.length > 0 ? (
                result.nameServers.map((ns, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-dark-800/50 text-sm text-gray-300 font-mono">
                    {ns}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Bulunamadı</p>
              )}
            </div>
          </ResultCard>

          <ResultCard title="Domain Durumu" icon={<HiStatusOnline />}>
            <div className="space-y-2">
              {result.domainStatus?.length > 0 ? (
                result.domainStatus.map((s, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-dark-800/50 text-xs text-gray-300 break-all">
                    {s}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Bulunamadı</p>
              )}
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-200 text-sm font-medium text-right truncate max-w-[200px]">{value || 'Bilinmiyor'}</span>
    </div>
  )
}
