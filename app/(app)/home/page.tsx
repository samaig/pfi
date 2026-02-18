import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { Baby, ShoppingBag, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { scoreOffers } from '@/lib/recommendations'
import { Button } from '@/components/ui/button'
import { OfferCarousel } from '@/components/home/OfferCarousel'
import {
  PersonaliseEmptyState,
  FavouritesEmptyState,
} from '@/components/home/EmptyStates'
import OfferCardWithSave from '@/components/offers/OfferCardWithSave'
import { OfferWithVendor, UserProfile } from '@/lib/types'

function hasBanner(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', 'banner.png'))
  } catch {
    return false
  }
}

export default async function HomePage() {
  const supabase = await createClient()

  // Step 1 - Get user and profile
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile?.onboarding_completed) redirect('/onboarding')

  const userProfile = profile as UserProfile

  // Step 2 - Get all offers with vendor data
  const { data: offers } = await supabase
    .from('offers')
    .select(
      `
      *,
      vendor:vendors (*)
    `
    )
    .eq('status', 'LIVE')
    .order('created_at', { ascending: false })

  const allOffers = (offers || []) as OfferWithVendor[]

  // Step 3 - Get user's saved offer IDs
  const { data: savedOffers } = await supabase
    .from('saved_offers')
    .select('offer_id')
    .eq('user_id', user.id)

  const savedOfferIds = savedOffers?.map((s) => s.offer_id) || []

  // Step 4 - Run recommendation algorithm
  const scored = scoreOffers(allOffers, {
    identity_type: userProfile.identity_type,
    child_age_buckets: userProfile.child_age_buckets,
    support_needs: userProfile.support_needs,
    town: userProfile.town,
  })

  // Check if user skipped onboarding (completed but all fields null)
  const skippedOnboarding =
    !userProfile.identity_type &&
    !userProfile.child_age_buckets &&
    !userProfile.support_needs

  // Step 5 - Separate offers into sections
  let recommended: OfferWithVendor[] = skippedOnboarding
    ? allOffers.slice(0, 12)
    : scored.slice(0, 12)

  // Ensure minimum 6 cards
  if (recommended.length < 6) {
    const existingIds = new Set(recommended.map((o) => o.id))
    const fillers = allOffers
      .filter((o) => !existingIds.has(o.id))
      .slice(0, 6 - recommended.length)
    recommended = [...recommended, ...fillers]
  }

  // Saved: filter offers where offer.id is in savedOfferIds
  const savedSection = allOffers.filter((o) => savedOfferIds.includes(o.id))

  // New & Featured: filter offers where is_new = true OR featured = true
  const newFeatured = allOffers
    .filter((o) => o.is_new || o.featured)
    .slice(0, 10)

  const firstName = userProfile.first_name
  const showBanner = hasBanner()

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 space-y-12">
      {/* GREETING SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7">
          <h1 className="text-3xl font-semibold text-[#1C1C1C]">
            Hi {firstName || 'there'}
          </h1>
          <p className="mt-2 text-base text-[#6F6F6F]">
            Welcome back! Find the best support for you and your family.
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="h-[200px] rounded-2xl bg-gradient-to-br from-[#117A65] to-[#0e6655] flex items-center justify-center overflow-hidden">
            {showBanner ? (
              <Image
                src="/banner.png"
                alt="Welcome banner"
                width={500}
                height={200}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <Baby className="h-16 w-16 text-white" />
            )}
          </div>
        </div>
      </section>

      {/* SECTION 1 — Recommended for you */}
      <section>
        <div className="mb-4">
          <h2 className="text-[22px] font-semibold text-[#1C1C1C]">
            Recommended for you
          </h2>
          <p className="text-[13px] text-[#6F6F6F]">
            Based on your preferences and life stage.
          </p>
        </div>
        {skippedOnboarding ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PersonaliseEmptyState />
            {recommended.slice(0, 2).map((offer) => (
              <OfferCardWithSave
                key={offer.id}
                offer={offer}
                initialSaved={savedOfferIds.includes(offer.id)}
              />
            ))}
          </div>
        ) : recommended.length > 0 ? (
          <OfferCarousel offers={recommended} savedOfferIds={savedOfferIds} />
        ) : null}
      </section>

      {/* SECTION 2 — Favourites */}
      <section>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-[22px] font-semibold text-[#1C1C1C]">
              Favourites
            </h2>
            <p className="text-[13px] text-[#6F6F6F]">
              Your saved perks, ready when you need them.
            </p>
          </div>
          {savedSection.length > 6 && (
            <Link
              href="/saved"
              className="text-sm font-medium text-[#117A65] hover:underline whitespace-nowrap mt-1"
            >
              View all favourites
            </Link>
          )}
        </div>
        {savedSection.length > 0 ? (
          <OfferCarousel offers={savedSection} savedOfferIds={savedOfferIds} />
        ) : (
          <FavouritesEmptyState />
        )}
      </section>

      {/* SECTION 3 — New & Featured */}
      {newFeatured.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-[22px] font-semibold text-[#1C1C1C]">
              New &amp; Featured
            </h2>
            <p className="text-[13px] text-[#6F6F6F]">
              New partners and offers added recently.
            </p>
          </div>
          <OfferCarousel offers={newFeatured} savedOfferIds={savedOfferIds} />
        </section>
      )}

      {/* SECTION 4 — Explore Online Services */}
      <section className="bg-[#E6F2EF] rounded-2xl p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="h-[280px] rounded-xl bg-[#117A65] flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#0A2342] mb-3">
              Explore online services
            </h2>
            <p className="text-[15px] text-[#1C1C1C] leading-relaxed mb-6">
              Access online brands and services offering exclusive benefits for
              working parents, from baby essentials and wellbeing to learning and
              family support.
            </p>
            <Button
              asChild
              className="bg-[#117A65] hover:bg-[#0e6655] h-11 px-6"
            >
              <Link href="/shop/online">Browse our partners</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Explore In-Person Services */}
      <section className="bg-[#E6F2EF] rounded-2xl p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2 h-[280px] rounded-xl bg-[#117A65] flex items-center justify-center">
            <MapPin className="h-16 w-16 text-white" />
          </div>
          <div className="md:order-1">
            <h2 className="text-2xl font-semibold text-[#0A2342] mb-3">
              Explore in-person services
            </h2>
            <p className="text-[15px] text-[#1C1C1C] leading-relaxed mb-6">
              Discover local and in-person services near you, including
              childcare, classes, wellbeing services, and family support.
            </p>
            <Button
              asChild
              className="bg-[#117A65] hover:bg-[#0e6655] h-11 px-6"
            >
              <Link href="/shop/in-store">Browse our partners</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
