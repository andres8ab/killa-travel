import Link from 'next/link'
import { AddToFavoriteButton, DeleteFromFavoriteButton } from './SubmitButtons'
import { DeleteFromFavorite, addToFavorite } from '../actions'

interface iAppProps {
  flightNumber: string
  origin: string
  airline: string
  destiny: string
  departure: string
  passengers: string
  price: number
  userId: string | undefined
  isInFavoriteList: boolean
  favoriteId: string
  reservationId: string
  flightId: string
  pathName: string
}

export function ListingCard({
  origin,
  airline,
  flightNumber,
  destiny,
  price,
  departure,
  passengers,
  userId,
  favoriteId,
  flightId,
  isInFavoriteList,
  pathName,
}: iAppProps) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <p>Aerolinea: {airline}</p>
        <p>No de vuelo: {flightNumber}</p>

        {userId && (
          <div className="z-10 absolute -top-2 left-64">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="flightId" value={flightId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/flight/${flightId}`} className="mt-2">
        <p className="text-muted-foreground text-sm line-clamp-2">
          Aeropuerto de salida:{' '}
          <span className="font-medium text-black">{origin}</span>
        </p>
        <p className="text-muted-foreground text-sm line-clamp-2">
          Aeropuerto de llegada:{' '}
          <span className="font-medium text-black">{destiny}</span>
        </p>
        <p className="pt-2 text-muted-foreground">
          Fecha: <span className="font-medium text-black">{departure}</span>
        </p>
        <p className="pt-2 text-muted-foreground">
          Pasajeros:{' '}
          <span className="font-medium text-black">{passengers}</span>
        </p>
        <p className="pt-2 text-muted-foreground">
          Precio:
          <span className="font-medium text-black"> ${price}</span>
        </p>
      </Link>
    </div>
  )
}
