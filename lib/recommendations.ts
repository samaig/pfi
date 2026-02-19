import { OfferWithVendor } from './types'

export function scoreOffers(
  offers: OfferWithVendor[],
  userProfile: {
    identity_type?: string | null
    child_age_buckets?: string[] | null
    support_needs?: string[] | null
    town?: string | null
  }
): (OfferWithVendor & { score: number })[] {
  return offers
    .map((offer) => {
      let score = 0

      // Age relevance match (+50 per match)
      if (userProfile.child_age_buckets && offer.vendor.age_relevance) {
        const matches = offer.vendor.age_relevance.filter((age) =>
          userProfile.child_age_buckets?.includes(age)
        )
        score += matches.length * 50
      }

      // Support needs match (+30 per match)
      if (userProfile.support_needs && offer.vendor.category) {
        const categoryMatch = userProfile.support_needs.includes(
          offer.vendor.category
        )
        if (categoryMatch) score += 30
      }

      // Expectant parent boost (+25)
      if (userProfile.identity_type === 'EXPECTANT_PARENT') {
        if (
          offer.vendor.category?.includes('Pregnancy') ||
          offer.vendor.category?.includes('Postpartum')
        ) {
          score += 25
        }
      }

      // Featured boost (+20)
      if (offer.featured) score += 20

      // Vendor priority weight (0-10 typically)
      score += offer.vendor.priority_weight || 0

      // Location check for in-person vendors
      if (offer.vendor.delivery_type === 'IN_PERSON' && !userProfile.town) {
        score = 0
      }

      return { ...offer, score }
    })
    .sort((a, b) => b.score - a.score)
}
