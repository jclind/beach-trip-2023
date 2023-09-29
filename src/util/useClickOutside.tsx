import { useEffect, useRef } from 'react'

const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
  return domNode
}

export default useClickOutside
