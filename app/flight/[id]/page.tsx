/* eslint-disable @next/next/no-img-element */

import { createReservation } from '@/app/actions'
import { ReservationSubmitButton } from '@/app/components/SubmitButtons'
import prisma from '@/app/lib/db'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'

async function getData(flightId: string) {
  noStore()
  const data = await prisma.flight.findUnique({
    where: {
      id: flightId,
    },
    select: {
      flightNumber: true,
      origin: true,
      destiny: true,
      departure: true,
      passengers: true,
      airline: true,
      categoryName: true,
      price: true,
      Reservation: {
        where: {
          flightId: flightId,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  })

  return data
}

export default async function FlightRoute({
  params,
}: {
  params: { id: string }
}) {
  const data = await getData(params.id)
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.airline}</h1>
      <div className="relative">
        <p>No de vuelo: {data?.flightNumber}</p>
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <Separator className="my-7" />
          <p className="text-muted-foreground">Vuelo desde: {data?.origin}</p>
          <Separator className="my-7" />
          <p className="text-muted-foreground">Destino: {data?.destiny}</p>
          <Separator className="my-7" />
          <p className="text-muted-foreground">Fecha: {data?.departure}</p>
          <Separator className="my-7" />
          <p className="text-muted-foreground">Pasajeros: {data?.passengers}</p>

          <Separator className="my-7" />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="flightId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Reserva ahora!</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
