import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { OfferCarousel } from './OfferCarousel'
import { FavouritesEmptyState } from './EmptyStates'
import { OfferWithVendor } from '@/lib/types'

interface FavouritesSectionProps {
  offers: OfferWithVendor[]
  savedOfferIds: string[]
}

export function FavouritesSection({
  offers,
  savedOfferIds,
}: FavouritesSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E3A14F] bg-[#FDF6EC] px-2.5 py-1 rounded-md mb-2">
            Saved
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2342]">
            Your favourites
          </h2>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Your saved perks, ready when you need them.
          </p>
        </div>
        {offers.length > 3 && (
          <Link
            href="/saved"
            className="hidden md:flex items-center gap-1 text-sm font-medium text-[#117A65] hover:text-[#0e6655] transition-colors whitespace-nowrap"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {offers.length > 0 ? (
        <OfferCarousel offers={offers} savedOfferIds={savedOfferIds} />
      ) : (
        <FavouritesEmptyState />
      )}
    </section>
  )
}
