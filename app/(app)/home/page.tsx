import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { scoreOffers } from '@/lib/recommendations'
import { HeroBanner } from '@/components/home/HeroBanner'
import { RecommendedSection } from '@/components/home/RecommendedSection'
import { FavouritesSection } from '@/components/home/FavouritesSection'
import { ExploreSection } from '@/components/home/ExploreSection'
import { ArticlesSection } from '@/components/home/ArticlesSection'
import { ToolkitsSection } from '@/components/home/ToolkitsSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { ExternalResourcesSection } from '@/components/home/ExternalResourcesSection'
import { OfferWithVendor, UserProfile } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()

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

  // Get all offers with vendor data
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

  // Get user's saved offer IDs
  const { data: savedOffers } = await supabase
    .from('saved_offers')
    .select('offer_id')
    .eq('user_id', user.id)

  const savedOfferIds = savedOffers?.map((s) => s.offer_id) || []

  // Run recommendation algorithm
  const scored = scoreOffers(allOffers, {
    identity_type: userProfile.identity_type,
    child_age_buckets: userProfile.child_age_buckets,
    support_needs: userProfile.support_needs,
    town: userProfile.town,
  })

  const skippedOnboarding =
    !userProfile.identity_type &&
    !userProfile.child_age_buckets &&
    !userProfile.support_needs

  let recommended: OfferWithVendor[] = skippedOnboarding
    ? allOffers.slice(0, 12)
    : scored.slice(0, 12)

  if (recommended.length < 6) {
    const existingIds = new Set(recommended.map((o) => o.id))
    const fillers = allOffers
      .filter((o) => !existingIds.has(o.id))
      .slice(0, 6 - recommended.length)
    recommended = [...recommended, ...fillers]
  }

  const savedSection = allOffers.filter((o) => savedOfferIds.includes(o.id))

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 space-y-10">
      {/* Hero banner */}
      <HeroBanner firstName={userProfile.first_name} />

      {/* Recommended for you */}
      <RecommendedSection
        offers={recommended}
        savedOfferIds={savedOfferIds}
        skippedOnboarding={skippedOnboarding}
      />

      {/* Explore services (Online + In-Person cards) */}
      <ExploreSection />

      {/* Favourites */}
      <FavouritesSection
        offers={savedSection}
        savedOfferIds={savedOfferIds}
      />

      {/* Articles & Tips */}
      <ArticlesSection />

      {/* Toolkits & Resources */}
      <ToolkitsSection />

      {/* Our Trusted Partners */}
      <PartnersSection offers={allOffers} />

      {/* Trusted External Resources */}
      <ExternalResourcesSection />
    </div>
  )
}
