import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({ children, className = '', animation = 'up' }) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(domRef.current)
        }
      })
    }, { threshold: 0.1 })
    
    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const animations = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    fade: '',
  }

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out-expo ${className} ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${animations[animation]}`
      }`}
    >
      {children}
    </div>
  )
}
