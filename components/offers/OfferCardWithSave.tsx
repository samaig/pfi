'use client'

import { useState } from 'react'
import { toggleSaveOffer } from '@/app/actions/offers'
import { toast } from 'sonner'
import OfferCard from './OfferCard'
import { OfferWithVendor } from '@/lib/types'

interface OfferCardWithSaveProps {
  offer: OfferWithVendor
  initialSaved: boolean
}

export default function OfferCardWithSave({
  offer,
  initialSaved,
}: OfferCardWithSaveProps) {
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    if (loading) return
    setLoading(true)
    const prev = saved
    // Optimistic update
    setSaved(!prev)

    try {
      const result = await toggleSaveOffer(offer.id)
      setSaved(result.saved)
      toast.success(
        result.saved ? 'Saved to favourites' : 'Removed from favourites'
      )
    } catch {
      // Revert on error
      setSaved(prev)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return <OfferCard offer={offer} isSaved={saved} onToggleSave={handleToggle} />
}
