'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleSaveOffer(
  offerId: string
): Promise<{ saved: boolean }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  // Check if already saved
  const { data: existing } = await supabase
    .from('saved_offers')
    .select('id')
    .eq('user_id', user.id)
    .eq('offer_id', offerId)
    .single()

  if (existing) {
    // Remove save
    await supabase
      .from('saved_offers')
      .delete()
      .eq('user_id', user.id)
      .eq('offer_id', offerId)

    revalidatePath('/home')
    revalidatePath('/saved')
    return { saved: false }
  } else {
    // Add save
    await supabase
      .from('saved_offers')
      .insert({ user_id: user.id, offer_id: offerId })

    revalidatePath('/home')
    revalidatePath('/saved')
    return { saved: true }
  }
}
