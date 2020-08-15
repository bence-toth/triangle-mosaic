import {useEffect, useState} from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, onSetDebouncedValue] = useState(value)
  const [lastUpdate, onSetLastUpdate] = useState(Date.now())

  useEffect(
    () => {
      const debounceHandler = setTimeout(() => {
        onSetLastUpdate(Date.now())
        onSetDebouncedValue(value)
      }, delay)

      if (lastUpdate < (Date.now() - delay)) {
        onSetLastUpdate(Date.now())
        onSetDebouncedValue(value)
      }

      return () => {
        clearTimeout(debounceHandler)
      }
    },
    [value]
  )

  return debouncedValue
}

// eslint-disable-next-line import/prefer-default-export
export {useDebounce}
