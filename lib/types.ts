export interface Vendor {
  id: string
  name: string
  logo_url: string | null
  description: string | null
  category: string | null
  delivery_type: string | null
  age_relevance: string[] | null
  priority_weight: number | null
  created_at: string
}

export interface Offer {
  id: string
  vendor_id: string
  title: string
  description: string | null
  headline: string | null
  status: string
  featured: boolean
  is_new: boolean
  created_at: string
}

export interface OfferWithVendor extends Offer {
  vendor: Vendor
  score?: number
}

export interface UserProfile {
  id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  identity_type: string | null
  child_count: string | null
  child_age_buckets: string[] | null
  town: string | null
  support_needs: string[] | null
  onboarding_completed: boolean
}
