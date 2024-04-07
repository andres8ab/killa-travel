import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type SelectSingleEventHandler = (selected: Date) => void

interface DatePickerProps {
  selectedDate?: Date
  onSelectDate: SelectSingleEventHandler
}

export function DatePicker({ selectedDate, onSelectDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate)

  // Update the date state when the selectedDate prop changes
  React.useEffect(() => {
    setDate(selectedDate)
  }, [selectedDate])

  // Function to handle date selection
  const handleSelectDate: SelectSingleEventHandler = (selected: Date) => {
    setDate(selected)
    onSelectDate(selected) // Pass the selected date to the parent component
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day: Date | undefined) => handleSelectDate(day as Date)} // Ensure that the type matches
          initialFocus
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
