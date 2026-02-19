'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { OfferWithVendor } from '@/lib/types'

interface OfferCardProps {
  offer: OfferWithVendor
  isSaved: boolean
  onToggleSave: () => void
}

export default function OfferCard({
  offer,
  isSaved,
  onToggleSave,
}: OfferCardProps) {
  const router = useRouter()
  const vendor = offer.vendor

  const vendorInitials = vendor.name
    ? vendor.name.slice(0, 2).toUpperCase()
    : '??'

  return (
    <div
      className="relative bg-white rounded-2xl p-4 cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.03] hover:shadow-[0px_8px_16px_rgba(0,0,0,0.12)] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] min-w-0"
      onClick={() => router.push(`/offers/${offer.id}`)}
    >
      {/* Save heart */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleSave()
        }}
        className="absolute top-4 right-4 z-10 p-1 hover:scale-110 transition-transform"
        aria-label={isSaved ? 'Remove from favourites' : 'Save to favourites'}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isSaved
              ? 'fill-[#C94A4A] text-[#C94A4A]'
              : 'fill-none text-[#6F6F6F] hover:text-[#C94A4A]'
          }`}
        />
      </button>

      {/* Vendor logo */}
      {vendor.logo_url ? (
        <Image
          src={vendor.logo_url}
          alt={vendor.name}
          width={48}
          height={48}
          className="rounded-lg object-cover h-12 w-12"
        />
      ) : (
        <div className="h-12 w-12 rounded-lg bg-[#117A65] flex items-center justify-center text-white text-sm font-semibold">
          {vendorInitials}
        </div>
      )}

      {/* Brand name */}
      <p className="mt-3 text-sm font-medium text-[#1C1C1C] truncate">
        {vendor.name}
      </p>

      {/* Short descriptor */}
      <p className="text-[13px] text-[#6F6F6F] truncate">
        {vendor.description || ''}
      </p>

      {/* Offer headline */}
      {offer.headline && (
        <p className="mt-2 text-sm font-semibold text-[#117A65] line-clamp-2">
          {offer.headline}
        </p>
      )}

      {/* Pills row */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {offer.is_new && (
          <span className="inline-block rounded-lg bg-[#117A65] text-white text-[11px] font-bold px-2 py-1">
            New
          </span>
        )}
        {vendor.category && (
          <span className="inline-block rounded-lg bg-[#F7F4EF] text-[#6F6F6F] text-[11px] px-2 py-1">
            {vendor.category}
          </span>
        )}
        {vendor.delivery_type && (
          <span className="inline-block rounded-lg bg-[#F7F4EF] text-[#6F6F6F] text-[11px] px-2 py-1">
            {vendor.delivery_type === 'IN_PERSON' ? 'In-person' : 'Online'}
          </span>
        )}
      </div>
    </div>
  )
}
