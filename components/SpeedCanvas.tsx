'use client'

import { useEffect, useRef } from 'react'

interface Line {
  x:     number
  y:     number
  speed: number
  len:   number
  op:    number
}

export default function SpeedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const lines: Line[] = Array.from({ length: 55 }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      speed: 2.5 + Math.random() * 5,
      len:   50 + Math.random() * 220,
      op:    0.25 + Math.random() * 0.75,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      lines.forEach(l => {
        const g = ctx.createLinearGradient(l.x, l.y, l.x + l.len, l.y)
        g.addColorStop(0,   'transparent')
        g.addColorStop(0.55, `rgba(232,69,48,${l.op})`)
        g.addColorStop(1,   'transparent')
        ctx.strokeStyle = g
        ctx.lineWidth   = 0.4
        ctx.beginPath()
        ctx.moveTo(l.x,         l.y)
        ctx.lineTo(l.x + l.len, l.y)
        ctx.stroke()
        l.x += l.speed
        if (l.x > canvas.width + l.len) {
          l.x = -l.len
          l.y = Math.random() * canvas.height
        }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
      aria-hidden="true"
    />
  )
}
