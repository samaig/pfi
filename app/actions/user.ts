'use server'

import { createClient } from '@/lib/supabase/server'

export async function saveOnboardingStep(
  userId: string,
  data: {
    identity_type?: string | null
    child_count?: string | null
    child_age_buckets?: string[] | null
    town?: string | null
    support_needs?: string[] | null
  }
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update(data)
    .eq('id', userId)

  if (error) throw error
  return { success: true }
}

export async function completeOnboarding(userId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({ onboarding_completed: true })
    .eq('id', userId)

  if (error) throw error
  return { success: true }
}
