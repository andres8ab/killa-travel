import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '../lib/db'
import { redirect } from 'next/navigation'
import { NoItems } from '../components/NoItem'
import { ListingCard } from '../components/ListingCard'
import { unstable_noStore as noStore } from 'next/cache'

async function getData(userId: string) {
  noStore()
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Flight: {
        select: {
          flightNumber: true,
          id: true,
          Favorite: true,
          passengers: true,
          airline: true,
          departure: true,
          price: true,
          destiny: true,
          origin: true,
          Reservation: {
            where: {
              userId: userId ?? undefined,
            },
          },
        },
      },
    },
  })

  return data
}

export default async function FavoriteRoute() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect('/')
  const data = await getData(user.id)

  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Tus Favoritos</h2>

      {data.length === 0 ? (
        <NoItems
          title="Aun no tienes favoritos agregados"
          description="Agrega tus favoritos para ver aqui..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Flight?.id}
              origin={item.Flight?.origin as string}
              destiny={item.Flight?.destiny as string}
              passengers={item.Flight?.passengers as string}
              pathName="/favorites"
              flightId={item.Flight?.id as string}
              flightNumber={item.Flight?.flightNumber as string}
              price={item.Flight?.price as number}
              userId={user.id}
              airline={item.Flight?.airline as string}
              departure={item.Flight?.departure as string}
              favoriteId={item.Flight?.Favorite[0].id as string}
              reservationId={item.Flight?.Reservation[0]?.id as string}
              isInFavoriteList={
                (item.Flight?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}
