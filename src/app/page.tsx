import { createClient } from '@/lib/supabase/server'
import PrenomsClient from '@/components/prenoms/PrenomsClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()
  const { data: prenoms } = await supabase
    .from('ws22_prenoms')
    .select('id, name, gender, origin, meaning, likes_count')
    .order('name')

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Prénoms pour bébé</h1>
          <p className="text-gray-500">Trouvez le prénom parfait pour votre enfant</p>
        </div>
        <PrenomsClient prenoms={prenoms ?? []} />
      </div>
    </main>
  )
}
