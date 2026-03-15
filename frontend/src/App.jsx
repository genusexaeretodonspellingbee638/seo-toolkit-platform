import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import WhoisPage from './pages/WhoisPage'
import MetaAnalyzerPage from './pages/MetaAnalyzerPage'
import RobotsPage from './pages/RobotsPage'
import SitemapPage from './pages/SitemapPage'
import PageSpeedPage from './pages/PageSpeedPage'
import BacklinksPage from './pages/BacklinksPage'
import DomainAuthorityPage from './pages/DomainAuthorityPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/whois" element={<WhoisPage />} />
          <Route path="/meta-analyzer" element={<MetaAnalyzerPage />} />
          <Route path="/robots" element={<RobotsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/pagespeed" element={<PageSpeedPage />} />
          <Route path="/backlinks" element={<BacklinksPage />} />
          <Route path="/domain-authority" element={<DomainAuthorityPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
