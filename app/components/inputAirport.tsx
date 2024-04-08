import React, { useState } from 'react'
import { airports } from '../lib/airports'
import Autosuggest, {
  ChangeEvent,
  SuggestionSelectedEventData,
} from 'react-autosuggest'

interface Airport {
  name: string
  code: string
}

interface AirportInputProps {
  onAirportSelected: (airport: Airport | null) => void
}

const getSuggestions = (value: string): Airport[] => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : airports.filter(
        (airport) =>
          airport.name.toLowerCase().includes(inputValue) ||
          airport.code.toLowerCase().includes(inputValue)
      )
}

const renderSuggestion = (suggestion: Airport): JSX.Element => (
  <div className="hover:border hover:border-blue-600 cursor-pointer">
    {suggestion.name} ({suggestion.code})
  </div>
)

const AirportInput: React.FC<AirportInputProps> = ({ onAirportSelected }) => {
  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Airport[]>([])

  const inputProps = {
    placeholder: 'Nombre o codigo aeropuerto',
    value,
    onChange: (_event: React.FormEvent, { newValue }: ChangeEvent) => {
      setValue(newValue)
    },
  }

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const onSuggestionSelected = (
    _event: React.FormEvent,
    { suggestion }: SuggestionSelectedEventData<Airport>
  ) => {
    setValue(suggestion.name) // Update input value when suggestion is selected
    onAirportSelected(suggestion) // Pass selected airport to parent component
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  )
}

export default AirportInput
