'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function likePrenom(id: number) {
  const supabase = await createClient()
  await supabase.rpc('increment_ws22_prenom_likes', { row_id: id })
  revalidatePath('/')
}
