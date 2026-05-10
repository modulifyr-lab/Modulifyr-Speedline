'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealProps {
  children:   ReactNode
  className?: string
  delay?:     number  // ms
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity   = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
          obs.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    0,
        transform:  'translateY(18px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
      }}
    >
      {children}
    </div>
  )
}
