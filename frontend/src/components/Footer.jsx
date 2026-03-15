export default function Footer() {
  return (
    <footer className="border-t border-primary-500/10 bg-dark-900/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-black text-xs">
              SEO
            </div>
            <span className="font-semibold gradient-text">SEO Toolkit</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SEO Toolkit Platform. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Onur Erkoç</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
