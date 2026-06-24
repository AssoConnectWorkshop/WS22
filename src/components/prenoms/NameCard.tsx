'use client'

import { useTransition, useState } from 'react'
import { likePrenom } from '@/app/actions'

type Prenom = {
  id: number
  name: string
  gender: 'M' | 'F' | 'M/F'
  origin: string
  meaning: string
  likes_count: number
}

const genderStyles: Record<string, { badge: string; border: string }> = {
  F:   { badge: 'bg-pink-100 text-pink-700',   border: 'border-pink-200' },
  M:   { badge: 'bg-blue-100 text-blue-700',   border: 'border-blue-200' },
  'M/F': { badge: 'bg-purple-100 text-purple-700', border: 'border-purple-200' },
}

const genderLabel: Record<string, string> = {
  F: 'Fille', M: 'Garçon', 'M/F': 'Mixte',
}

export default function NameCard({ prenom }: { prenom: Prenom }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticLikes, setOptimisticLikes] = useState(prenom.likes_count)
  const styles = genderStyles[prenom.gender]

  function handleLike() {
    setOptimisticLikes(n => n + 1)
    startTransition(() => likePrenom(prenom.id))
  }

  return (
    <div className={`rounded-2xl border-2 ${styles.border} bg-white p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-2xl font-bold">{prenom.name}</h2>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles.badge}`}>
          {genderLabel[prenom.gender]}
        </span>
      </div>
      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <p><span className="font-medium text-gray-800">Origine :</span> {prenom.origin}</p>
        <p><span className="font-medium text-gray-800">Signification :</span> {prenom.meaning}</p>
      </div>
      <button
        onClick={handleLike}
        disabled={isPending}
        className="mt-auto flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 transition-colors disabled:opacity-50 w-fit"
      >
        <span className="text-lg">{optimisticLikes > 0 ? '❤️' : '🤍'}</span>
        <span>{optimisticLikes} {optimisticLikes === 1 ? 'j\'aime' : 'j\'aimes'}</span>
      </button>
    </div>
  )
}
