'use client'

import Link from 'next/link'
import { Sparkles, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PersonaliseEmptyState() {
  return (
    <div className="bg-white rounded-xl border border-dashed border-[#117A65]/30 p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
      <div className="h-12 w-12 rounded-xl bg-[#E6F2EF] flex items-center justify-center mb-4">
        <Sparkles className="h-6 w-6 text-[#117A65]" />
      </div>
      <h3 className="text-sm font-semibold text-[#1C1C1C] mb-1">
        Personalise your feed
      </h3>
      <p className="text-xs text-[#6F6F6F] mb-4 max-w-[200px]">
        Answer a few questions so we can tailor recommendations for you.
      </p>
      <Button
        asChild
        className="bg-[#117A65] hover:bg-[#0e6655] h-9 px-5 text-sm"
      >
        <Link href="/onboarding">Get started</Link>
      </Button>
    </div>
  )
}

export function FavouritesEmptyState() {
  return (
    <div className="bg-white rounded-xl border border-dashed border-[#E7E2DA] p-8 flex flex-col items-center justify-center text-center">
      <div className="h-12 w-12 rounded-xl bg-[#FEF2F2] flex items-center justify-center mb-3">
        <Heart className="h-6 w-6 text-[#C94A4A]" />
      </div>
      <p className="text-sm font-medium text-[#1C1C1C] mb-1">
        No favourites yet
      </p>
      <p className="text-xs text-[#6F6F6F] max-w-[240px]">
        Tap the heart icon on any offer to save it here for quick access.
      </p>
    </div>
  )
}
