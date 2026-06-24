'use client'

import { useState, useMemo } from 'react'
import NameCard from './NameCard'

type Prenom = {
  id: number
  name: string
  gender: 'M' | 'F' | 'M/F'
  origin: string
  meaning: string
  likes_count: number
}

type Filter = 'Tous' | 'Filles' | 'Garçons' | 'Mixtes'

const filterMap: Record<Filter, string | null> = {
  Tous: null,
  Filles: 'F',
  Garçons: 'M',
  Mixtes: 'M/F',
}

const filters: Filter[] = ['Tous', 'Filles', 'Garçons', 'Mixtes']

export default function PrenomsClient({ prenoms }: { prenoms: Prenom[] }) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<Filter>('Tous')

  const filtered = useMemo(() => {
    const genderFilter = filterMap[activeFilter as Filter]
    return prenoms.filter(p => {
      const matchesGender = genderFilter === null || p.gender === genderFilter
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchesGender && matchesSearch
    })
  }, [prenoms, search, activeFilter])

  return (
    <div className="flex flex-col gap-6">
      <input
        type="search"
        placeholder="Rechercher un prénom…"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-rose-300"
      />
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Aucun prénom trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <NameCard key={p.id} prenom={p} />
          ))}
        </div>
      )}
    </div>
  )
}
