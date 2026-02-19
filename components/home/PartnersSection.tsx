import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { OfferWithVendor } from '@/lib/types'

interface PartnersSectionProps {
  offers: OfferWithVendor[]
}

export function PartnersSection({ offers }: PartnersSectionProps) {
  // Get unique vendors from offers
  const vendorMap = new Map<string, OfferWithVendor['vendor']>()
  offers.forEach((offer) => {
    if (!vendorMap.has(offer.vendor.id)) {
      vendorMap.set(offer.vendor.id, offer.vendor)
    }
  })
  const vendors = Array.from(vendorMap.values()).slice(0, 8)

  if (vendors.length === 0) return null

  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#117A65] bg-[#E6F2EF] px-2.5 py-1 rounded-md mb-2">
            Partners
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2342]">
            Our trusted partners
          </h2>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Brands and services we&apos;ve partnered with to support you.
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {vendors.map((vendor) => {
          const initials = vendor.name
            ? vendor.name.slice(0, 2).toUpperCase()
            : '??'

          return (
            <Link
              key={vendor.id}
              href="/shop/online"
              className="group flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-[#E7E2DA] hover:border-[#117A65]/30 hover:shadow-md transition-all"
            >
              {vendor.logo_url ? (
                <Image
                  src={vendor.logo_url}
                  alt={vendor.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-[#117A65] flex items-center justify-center text-white text-sm font-bold">
                  {initials}
                </div>
              )}
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1C1C1C] group-hover:text-[#117A65] transition-colors truncate max-w-[120px]">
                  {vendor.name}
                </p>
                {vendor.category && (
                  <p className="text-[11px] text-[#6F6F6F] mt-0.5">
                    {vendor.category}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
