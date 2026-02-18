import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0A2342] text-white">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left: Branding */}
          <div>
            <span className="text-lg font-bold">Parentfits</span>
            <p className="mt-2 text-sm text-white/60">
              &copy; 2025 Parentfits. All rights reserved.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support#faq"
                  className="text-sm text-white/80 hover:text-[#117A65] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/support#about"
                  className="text-sm text-white/80 hover:text-[#117A65] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/support#how-it-works"
                  className="text-sm text-white/80 hover:text-[#117A65] transition-colors"
                >
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support#data-protection"
                  className="text-sm text-white/80 hover:text-[#117A65] transition-colors"
                >
                  Data protection
                </Link>
              </li>
              <li>
                <Link
                  href="/support#safeguarding"
                  className="text-sm text-white/80 hover:text-[#117A65] transition-colors"
                >
                  Safeguarding
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
