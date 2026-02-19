import Link from 'next/link'
import { ArrowRight, ShoppingBag, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ExploreSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Online services */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#117A65] to-[#0e6655] p-8">
        <div className="relative z-10">
          <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            Explore online services
          </h3>
          <p className="text-sm text-white/75 leading-relaxed mb-5 max-w-xs">
            Access exclusive benefits from online brands &mdash; baby
            essentials, wellbeing, learning and family support.
          </p>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-[#117A65] hover:bg-white/90 h-10 px-5 text-sm font-medium"
          >
            <Link href="/shop/online" className="flex items-center gap-2">
              Browse partners
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {/* Decoration */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/5" />
      </div>

      {/* In-person services */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A2342] to-[#112d52] p-8">
        <div className="relative z-10">
          <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            Explore local services
          </h3>
          <p className="text-sm text-white/75 leading-relaxed mb-5 max-w-xs">
            Discover in-person services near you &mdash; childcare, classes,
            wellbeing and family support.
          </p>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-[#0A2342] hover:bg-white/90 h-10 px-5 text-sm font-medium"
          >
            <Link href="/shop/in-store" className="flex items-center gap-2">
              Find near me
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {/* Decoration */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/5" />
      </div>
    </section>
  )
}
