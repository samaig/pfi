'use client'

import Link from 'next/link'
import { AlertCircle, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PersonaliseEmptyState() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center min-h-[240px]">
      <AlertCircle className="h-12 w-12 text-[#6F6F6F] mb-4" />
      <h3 className="text-base font-semibold text-[#1C1C1C] mb-2">
        Tell us what you need
      </h3>
      <p className="text-sm text-[#6F6F6F] mb-4">
        Answer 4 quick questions so we can personalise your recommendations.
      </p>
      <Button asChild className="w-full bg-[#117A65] hover:bg-[#0e6655]">
        <Link href="/onboarding">Personalise my feed</Link>
      </Button>
      <button className="mt-2 text-sm text-[#6F6F6F] hover:text-[#1C1C1C] transition-colors">
        Skip for now
      </button>
    </div>
  )
}

export function FavouritesEmptyState() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center min-h-[240px]">
      <Heart className="h-12 w-12 text-[#6F6F6F] mb-4" />
      <p className="text-sm text-[#6F6F6F]">
        You haven&apos;t saved anything yet. Tap &#9825; on any offer to keep it
        here.
      </p>
    </div>
  )
}
