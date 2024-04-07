'use client'

import Link from 'next/link'
import { categoryItems } from '../lib/categoryItems'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function MapFilterItems() {
  const searchParams = useSearchParams()
  const search = searchParams.get('filter')
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const router = useRouter()
  return (
    <div className="flex gap-x-10 mt-5 mb-10 w-full overflow-x-scroll no-scrollbar">
      {search && (
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-blue-300 hover:bg-blue-400"
        >
          regresar
        </Button>
      )}
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + '?' + createQueryString('filter', item.name)}
          className={cn(
            search === item.name
              ? 'pb-2 flex-shrink-0'
              : 'opacity-70 flex-shrink-0',
            'flex flex-col gap-y-3 items-center'
          )}
        >
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt="Category image"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  )
}
