'use client'

import { useEffect, useRef } from 'react'
import { Ball, Paddle, Pixel } from './propmpting.types'
import { drawGame, initializeGame, updateGame } from './propmpting.libs'

export function Prompting() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      initializeGame({ canvas, scaleRef, pixelsRef, paddlesRef, ballRef })
    }

    const gameLoop = () => {
      updateGame({ ballRef, paddlesRef, pixelsRef, canvas })
      drawGame({ ballRef, canvas, ctx, pixelsRef, paddlesRef })
      requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    gameLoop()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      aria-label="Prompting Is All You Need: Fullscreen Pong game with pixel text"
    />
  )
}
