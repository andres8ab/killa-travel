'use server'

import { redirect } from 'next/navigation'
import prisma from './lib/db'
import { revalidatePath } from 'next/cache'

export async function addToFavorite(formData: FormData) {
  const flightId = formData.get('flightId') as string
  const userId = formData.get('userId') as string
  const pathName = formData.get('pathName') as string

  const data = await prisma.favorite.create({
    data: {
      flightId: flightId,
      userId: userId,
    },
  })

  revalidatePath(pathName)
}

export async function DeleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get('favoriteId') as string
  const pathName = formData.get('pathName') as string
  const userId = formData.get('userId') as string

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  })

  revalidatePath(pathName)
}

export async function createReservation(formData: FormData) {
  const userId = formData.get('userId') as string
  const flightId = formData.get('flightId') as string

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      flightId: flightId,
    },
  })

  return redirect('/reservations')
}

export async function DeleteReservation(formData: FormData) {
  const userId = formData.get('userId') as string
  const reservationId = formData.get('reservationId') as string
  const flightId = formData.get('flightId') as string

  const data = await prisma.reservation.delete({
    where: {
      id: reservationId,
      userId: userId,
      flightId: flightId,
    },
  })

  return redirect('/')
}
