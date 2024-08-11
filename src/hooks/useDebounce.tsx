import { useCallback } from 'react'

export type UseDebounceReturn<T> = (args: T) => void

function useDebounce<T = React.ChangeEvent<HTMLInputElement>>(
  callback: (evt: T) => void,
  time = 1000
): UseDebounceReturn<T> {
  const debounce = useCallback((cb: (e: T) => void, delay = 1000) => {
    let timeout: NodeJS.Timeout

    return (args: T) => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        cb(args)
      }, delay)
    }
  }, [])

  return debounce(callback, time)
}

export default useDebounce
