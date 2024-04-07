import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ListingCard } from '../components/ListingCard'
import { NoItems } from '../components/NoItem'
import prisma from '../lib/db'
import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { Button } from '@/components/ui/button'
import { DeleteReservation } from '../actions'

async function getData(userId: string) {
  noStore()
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Flight: {
        select: {
          id: true,
          destiny: true,
          flightNumber: true,
          origin: true,
          departure: true,
          airline: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
          Reservation: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  })

  return data
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user?.id) return redirect('/')
  const data = await getData(user.id)
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Tus Reservaciones
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Aun no tienes reservaciones"
          description="Por favor realiza una reserva para ver aqui..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <div key={item.Flight?.id}>
              <form action={DeleteReservation}>
                <input type="hidden" name="userId" value={user.id} />
                <input
                  type="hidden"
                  name="flightId"
                  value={item.Flight?.id as string}
                />
                <input
                  type="hidden"
                  name="reservationId"
                  value={item.Flight?.Reservation[0]?.id as string}
                />
                <ListingCard
                  origin={item.Flight?.origin as string}
                  destiny={item.Flight?.destiny as string}
                  pathName="/favorites"
                  flightId={item.Flight?.id as string}
                  departure={item.Flight?.departure as string}
                  airline={item.Flight?.airline as string}
                  flightNumber={item.Flight?.flightNumber as string}
                  price={item.Flight?.price as number}
                  userId={user.id}
                  favoriteId={item.Flight?.Favorite[0]?.id as string}
                  reservationId={item.Flight?.Reservation[0]?.id as string}
                  isInFavoriteList={
                    (item.Flight?.Favorite.length as number) > 0 ? true : false
                  }
                />
                <Button type="submit">Cancelar reservacion</Button>
              </form>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
