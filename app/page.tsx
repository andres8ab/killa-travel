/* eslint-disable @next/next/no-img-element */
import { Suspense } from 'react'
import { MapFilterItems } from './components/MapFilterItems'
import prisma from './lib/db'
import { SkeltonCard } from './components/SkeletonCard'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ListingCard } from './components/ListingCard'
import { unstable_noStore as noStore } from 'next/cache'
import Video from './components/Video'

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined
  searchParams?: {
    filter?: string
    origin?: string
    destiny?: string
    departure?: string
    passengers?: string
  }
}) {
  noStore()
  const data = await prisma.flight.findMany({
    where: {
      categoryName: searchParams?.filter ?? undefined,
      origin: searchParams?.origin ?? undefined,
      destiny: searchParams?.destiny ?? undefined,
      departure: searchParams?.departure ?? undefined,
      passengers: searchParams?.passengers ?? undefined,
    },
    select: {
      flightNumber: true,
      id: true,
      price: true,
      origin: true,
      destiny: true,
      passengers: true,
      airline: true,
      departure: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
      Reservation: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  })

  return data
}

export default function Flight({
  searchParams,
}: {
  searchParams?: {
    filter?: string
    origin?: string
    destiny?: string
    departure?: string
    passengers?: string
  }
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string
    origin?: string
    destiny?: string
    departure?: string
    passengers?: string
  }
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!searchParams || Object.keys(searchParams).length === 0) {
    return <Video />
  } else {
    const data = await getData({ searchParams, userId: user?.id })

    return (
      <div className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="border-b-2" key={item.id}>
            <ListingCard
              origin={item.origin as string}
              flightNumber={item.flightNumber as string}
              destiny={item.destiny as string}
              price={item.price as number}
              passengers={item.passengers as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0}
              reservationId={item.Reservation[0]?.id}
              airline={item.airline as string}
              flightId={item.id}
              departure={item.departure as string}
              pathName="/"
            />
          </div>
        ))}
      </div>
    )
  }
}

function SkeletonLoading() {
  return (
    <div className="grid col-span-1 gap-8 mt-8">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
    </div>
  )
}
