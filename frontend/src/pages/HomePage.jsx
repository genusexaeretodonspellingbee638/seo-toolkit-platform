import { Link } from 'react-router-dom'
import { HiGlobe, HiCode, HiDocumentText, HiMap, HiLightningBolt, HiLink, HiShieldCheck } from 'react-icons/hi'

const tools = [
  {
    path: '/whois',
    title: 'WHOIS Sorgulama',
    description: 'Domain kayıt bilgilerini, kayıt tarihini, son kullanma tarihini ve name server bilgilerini sorgulayın.',
    icon: <HiGlobe />,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    path: '/meta-analyzer',
    title: 'Meta Etiket Analizi',
    description: 'Herhangi bir URL\'nin title, description, Open Graph ve diğer meta etiketlerini analiz edin.',
    icon: <HiCode />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    path: '/robots',
    title: 'Robots.txt Test',
    description: 'Bir web sitesinin robots.txt dosyasını çözümleyin. Allow, disallow kurallarını ve sitemap bağlantılarını görüntüleyin.',
    icon: <HiDocumentText />,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    path: '/sitemap',
    title: 'Site Haritası Analizi',
    description: 'Sitemap.xml dosyasını ayrıştırın. Toplam URL sayısını, son düzenlenme tarihlerini ve boyut bilgilerini görün.',
    icon: <HiMap />,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    path: '/pagespeed',
    title: 'Sayfa Hızı Testi',
    description: 'Google PageSpeed Insights API kullanarak performans, erişilebilirlik, en iyi uygulamalar ve SEO puanlarını ölçün.',
    icon: <HiLightningBolt />,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    path: '/backlinks',
    title: 'Backlink Kontrol',
    description: 'Bir domain\'e yönlendiren backlink\'leri kontrol edin. Kaynak URL, anchor text ve follow tipini görüntüleyin.',
    icon: <HiLink />,
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    path: '/domain-authority',
    title: 'Domain Otorite Skoru',
    description: 'Domain Authority (DA), Page Authority (PA) ve spam puanını hesaplayın.',
    icon: <HiShieldCheck />,
    gradient: 'from-teal-500 to-cyan-500',
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
          Profesyonel SEO Araçları
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
          <span className="text-white">SEO Analizlerini</span>
          <br />
          <span className="gradient-text">Kolaylaştırın</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-12 leading-relaxed">
          WHOIS sorgulama, meta etiket analizi, site haritası çözümleme, sayfa hızı testi ve daha
          fazlası — tüm SEO araçları tek bir platformda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/whois"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Hemen Başla
          </Link>
          <a
            href="https://github.com/onurerkoc-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:bg-white/5 hover:border-gray-600 transition-all duration-300"
          >
            GitHub'da Görüntüle
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '7', label: 'SEO Aracı' },
            { value: '6', label: 'API Endpoint' },
            { value: '∞', label: 'Ücretsiz Sorgu' },
            { value: '< 1s', label: 'Yanıt Süresi' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Cards */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          Araç <span className="gradient-text">Koleksiyonu</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-300 transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Aracı Kullan →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
