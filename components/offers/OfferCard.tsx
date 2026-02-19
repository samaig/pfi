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
      className="group relative bg-white rounded-xl border border-[#E7E2DA] hover:border-[#117A65]/30 p-5 cursor-pointer transition-all duration-200 hover:shadow-md min-w-0"
      onClick={() => router.push(`/offers/${offer.id}`)}
    >
      {/* Save heart */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleSave()
        }}
        className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-[#F7F4EF] flex items-center justify-center hover:scale-110 transition-transform"
        aria-label={isSaved ? 'Remove from favourites' : 'Save to favourites'}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isSaved
              ? 'fill-[#C94A4A] text-[#C94A4A]'
              : 'fill-none text-[#6F6F6F] group-hover:text-[#C94A4A]'
          }`}
        />
      </button>

      {/* Vendor logo */}
      <div className="flex items-start gap-3">
        {vendor.logo_url ? (
          <Image
            src={vendor.logo_url}
            alt={vendor.name}
            width={44}
            height={44}
            className="rounded-xl object-cover h-11 w-11 shrink-0"
          />
        ) : (
          <div className="h-11 w-11 rounded-xl bg-[#117A65] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {vendorInitials}
          </div>
        )}
        <div className="min-w-0 flex-1 pr-6">
          <p className="text-sm font-semibold text-[#1C1C1C] truncate">
            {vendor.name}
          </p>
          <p className="text-xs text-[#6F6F6F] truncate">
            {vendor.description || ''}
          </p>
        </div>
      </div>

      {/* Offer headline */}
      {offer.headline && (
        <p className="mt-3 text-[13px] font-medium text-[#117A65] line-clamp-2 leading-snug">
          {offer.headline}
        </p>
      )}

      {/* Pills row */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {offer.is_new && (
          <span className="inline-flex items-center rounded-md bg-[#117A65] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
            New
          </span>
        )}
        {vendor.category && (
          <span className="inline-flex items-center rounded-md bg-[#F7F4EF] text-[#6F6F6F] text-[10px] font-medium px-2 py-0.5">
            {vendor.category}
          </span>
        )}
        {vendor.delivery_type && (
          <span className="inline-flex items-center rounded-md bg-[#F7F4EF] text-[#6F6F6F] text-[10px] font-medium px-2 py-0.5">
            {vendor.delivery_type === 'IN_PERSON' ? 'In-person' : 'Online'}
          </span>
        )}
      </div>
    </div>
  )
}
