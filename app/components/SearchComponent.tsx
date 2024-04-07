'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CreationSubmit } from './SubmitButtons'
import { Counter } from './Counter'
import AirportInput from './inputAirport'
import { DatePicker } from './DatePicker'
import React from 'react'

interface Airport {
  name: string
  code: string
}

export function SearchModalComponent() {
  const [step, setStep] = useState(1)
  const [selectedOriginAirport, setSelectedOriginAirport] =
    useState<Airport | null>(null)
  const [selectedDestinyAirport, setSelectedDestinyAirport] =
    useState<Airport | null>(null)
  const handleOriginAirportSelected = (airport: Airport | null) => {
    setSelectedOriginAirport(airport)
  }
  const selectedOriginValue = selectedOriginAirport
    ? selectedOriginAirport.name
    : ''

  const handleDestinyAirportSelected = (airport: Airport | null) => {
    setSelectedDestinyAirport(airport)
  }

  const selectedDestinyValue = selectedDestinyAirport
    ? selectedDestinyAirport.name
    : ''

  const [selectedDate, setSelectedDate] = React.useState<Date>()

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
  }
  const isoDateString = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : ''

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Siguiente
        </Button>
      )
    } else if (step === 2) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Siguiente
        </Button>
      )
    } else if (step === 3) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Siguiente
        </Button>
      )
    } else if (step === 4) {
      return <CreationSubmit />
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Origen</p>
            <p className="px-4">Destino</p>
            <p className="px-4">Fecha</p>
            <p className="px-4">Pasajeros</p>
          </div>

          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="origin" value={selectedOriginValue} />
          {step === 1 && (
            <>
              <DialogHeader>
                <DialogTitle>Seleccina Origen</DialogTitle>
                <DialogDescription>
                  Por favor seleccion el aeropuerto de origen
                </DialogDescription>
              </DialogHeader>
              <AirportInput onAirportSelected={handleOriginAirportSelected} />
            </>
          )}
          <input type="hidden" name="destiny" value={selectedDestinyValue} />
          {step === 2 && (
            <>
              <DialogHeader>
                <DialogTitle>Seleccina Destino</DialogTitle>
                <DialogDescription>
                  Por favor seleccion el aeropuerto de destino
                </DialogDescription>
              </DialogHeader>
              <AirportInput onAirportSelected={handleDestinyAirportSelected} />
            </>
          )}
          <input type="hidden" name="departure" value={isoDateString} />

          {step === 3 && (
            <>
              <DialogHeader>
                <DialogTitle>Seleccina la fecha</DialogTitle>
                <DialogDescription>
                  Por favor selecciona la fecha de vuelo
                </DialogDescription>
              </DialogHeader>
              <DatePicker
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
              />
            </>
          )}
          {step === 4 && (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Pasajeros</h3>
                <p className="text-muted-foreground text-sm">
                  Cuantos pasajeros son?
                </p>
              </div>

              <Counter name="passengers" />
            </div>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
