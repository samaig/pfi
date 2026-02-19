import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { OfferCarousel } from './OfferCarousel'
import { PersonaliseEmptyState } from './EmptyStates'
import OfferCardWithSave from '@/components/offers/OfferCardWithSave'
import { OfferWithVendor } from '@/lib/types'

interface RecommendedSectionProps {
  offers: OfferWithVendor[]
  savedOfferIds: string[]
  skippedOnboarding: boolean
}

export function RecommendedSection({
  offers,
  savedOfferIds,
  skippedOnboarding,
}: RecommendedSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#117A65] bg-[#E6F2EF] px-2.5 py-1 rounded-md mb-2">
            Personalised
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2342]">
            Recommended for you
          </h2>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Based on your preferences and life stage.
          </p>
        </div>
        <Link
          href="/shop/online"
          className="hidden md:flex items-center gap-1 text-sm font-medium text-[#117A65] hover:text-[#0e6655] transition-colors whitespace-nowrap"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {skippedOnboarding ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <PersonaliseEmptyState />
          {offers.slice(0, 2).map((offer) => (
            <OfferCardWithSave
              key={offer.id}
              offer={offer}
              initialSaved={savedOfferIds.includes(offer.id)}
            />
          ))}
        </div>
      ) : offers.length > 0 ? (
        <OfferCarousel offers={offers} savedOfferIds={savedOfferIds} />
      ) : null}
    </section>
  )
}
