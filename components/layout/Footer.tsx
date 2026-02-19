import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0A2342] text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <span className="text-lg font-bold text-white">Parentfits</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Benefits that work for parents. Helping families access the
              support they need.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/home"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/online"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/hub"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/support#faq"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/support#about"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/support#how-it-works"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/support#contact"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/support#data-protection"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Data protection
                </Link>
              </li>
              <li>
                <Link
                  href="/support#safeguarding"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Safeguarding
                </Link>
              </li>
              <li>
                <Link
                  href="/support#privacy"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/support#terms"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; 2025 Parentfits. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/support#privacy"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/support#terms"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support#safeguarding"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Safeguarding
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
