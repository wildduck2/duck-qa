import {
  BACKGROUND_COLOR,
  BALL_COLOR,
  COLOR,
  HIT_COLOR,
  LETTER_SPACING,
  PADDLE_COLOR,
  PIXEL_MAP,
  WORD_SPACING,
} from './propmpting.constants'
import {
  DrawGameParams,
  InitializeGameParams,
  UpdateGameParams,
} from './propmpting.types'

export const initializeGame = ({
  canvas,
  pixelsRef,
  ballRef,
  paddlesRef,
  scaleRef,
}: InitializeGameParams) => {
  const scale = scaleRef.current
  const LARGE_PIXEL_SIZE = 8 * scale
  const SMALL_PIXEL_SIZE = 4 * scale
  const BALL_SPEED = 6 * scale

  pixelsRef.current = []
  const words = ['AI TEST GENERATOR', 'UPLOAD YOUR FILES']

  const calculateWordWidth = (word: string, pixelSize: number) => {
    return (
      word.split('').reduce((width, letter) => {
        const letterWidth =
          PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
        return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
      }, 0) -
      LETTER_SPACING * pixelSize
    )
  }

  const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE)
  const totalWidthSmall = words[1].split(' ').reduce((width, word, index) => {
    return (
      width +
      calculateWordWidth(word, SMALL_PIXEL_SIZE) +
      (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
    )
  }, 0)
  const totalWidth = Math.max(totalWidthLarge, totalWidthSmall)
  const scaleFactor = (canvas.width * 0.8) / totalWidth

  const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor
  const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor

  const largeTextHeight = 5 * adjustedLargePixelSize
  const smallTextHeight = 5 * adjustedSmallPixelSize
  const spaceBetweenLines = 5 * adjustedLargePixelSize
  const totalTextHeight = largeTextHeight + spaceBetweenLines + smallTextHeight

  let startY = (canvas.height - totalTextHeight) / 2

  words.forEach((word, wordIndex) => {
    const pixelSize =
      wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize
    const totalWidth =
      wordIndex === 0
        ? calculateWordWidth(word, adjustedLargePixelSize)
        : words[1].split(' ').reduce((width, w, index) => {
            return (
              width +
              calculateWordWidth(w, adjustedSmallPixelSize) +
              (index > 0 ? WORD_SPACING * adjustedSmallPixelSize : 0)
            )
          }, 0)

    let startX = (canvas.width - totalWidth) / 2

    if (wordIndex === 1) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      word.split(' ').forEach((subWord) => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        subWord.split('').forEach((letter) => {
          const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
          if (!pixelMap) return

          for (let i = 0; i < pixelMap.length; i++) {
            for (let j = 0; j < pixelMap[i].length; j++) {
              if (pixelMap[i][j]) {
                const x = startX + j * pixelSize
                const y = startY + i * pixelSize
                pixelsRef.current.push({
                  x,
                  y,
                  size: pixelSize,
                  hit: false,
                })
              }
            }
          }
          startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
        })
        startX += WORD_SPACING * adjustedSmallPixelSize
      })
    } else {
      // biome-ignore lint/complexity/noForEach: <explanation>
      word.split('').forEach((letter) => {
        const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
        if (!pixelMap) return

        for (let i = 0; i < pixelMap.length; i++) {
          for (let j = 0; j < pixelMap[i].length; j++) {
            if (pixelMap[i][j]) {
              const x = startX + j * pixelSize
              const y = startY + i * pixelSize
              pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
            }
          }
        }
        startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
      })
    }
    startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0
  })

  // Initialize ball position near the top right corner
  const ballStartX = canvas.width * 0.9
  const ballStartY = canvas.height * 0.1

  ballRef.current = {
    x: ballStartX,
    y: ballStartY,
    dx: -BALL_SPEED,
    dy: BALL_SPEED,
    radius: adjustedLargePixelSize / 2,
  }

  const paddleWidth = adjustedLargePixelSize
  const paddleLength = 10 * adjustedLargePixelSize

  paddlesRef.current = [
    {
      x: 0,
      y: canvas.height / 2 - paddleLength / 2,
      width: paddleWidth,
      height: paddleLength,
      targetY: canvas.height / 2 - paddleLength / 2,
      isVertical: true,
    },
    {
      x: canvas.width - paddleWidth,
      y: canvas.height / 2 - paddleLength / 2,
      width: paddleWidth,
      height: paddleLength,
      targetY: canvas.height / 2 - paddleLength / 2,
      isVertical: true,
    },
    {
      x: canvas.width / 2 - paddleLength / 2,
      y: 0,
      width: paddleLength,
      height: paddleWidth,
      targetY: canvas.width / 2 - paddleLength / 2,
      isVertical: false,
    },
    {
      x: canvas.width / 2 - paddleLength / 2,
      y: canvas.height - paddleWidth,
      width: paddleLength,
      height: paddleWidth,
      targetY: canvas.width / 2 - paddleLength / 2,
      isVertical: false,
    },
  ]
}

export const updateGame = ({
  ballRef,
  paddlesRef,
  pixelsRef,
  canvas,
}: UpdateGameParams) => {
  const ball = ballRef.current
  const paddles = paddlesRef.current

  ball.x += ball.dx
  ball.y += ball.dy

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy
  }
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dx = -ball.dx
  }

  // biome-ignore lint/complexity/noForEach: <explanation>
  paddles.forEach((paddle) => {
    if (paddle.isVertical) {
      if (
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height
      ) {
        ball.dx = -ball.dx
      }
    } else {
      if (
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
      ) {
        ball.dy = -ball.dy
      }
    }
  })

  // biome-ignore lint/complexity/noForEach: <explanation>
  paddles.forEach((paddle) => {
    if (paddle.isVertical) {
      paddle.targetY = ball.y - paddle.height / 2
      paddle.targetY = Math.max(
        0,
        Math.min(canvas.height - paddle.height, paddle.targetY),
      )
      paddle.y += (paddle.targetY - paddle.y) * 0.1
    } else {
      paddle.targetY = ball.x - paddle.width / 2
      paddle.targetY = Math.max(
        0,
        Math.min(canvas.width - paddle.width, paddle.targetY),
      )
      paddle.x += (paddle.targetY - paddle.x) * 0.1
    }
  })

  // biome-ignore lint/complexity/noForEach: <explanation>
  pixelsRef.current.forEach((pixel) => {
    if (
      !pixel.hit &&
      ball.x + ball.radius > pixel.x &&
      ball.x - ball.radius < pixel.x + pixel.size &&
      ball.y + ball.radius > pixel.y &&
      ball.y - ball.radius < pixel.y + pixel.size
    ) {
      pixel.hit = true
      const centerX = pixel.x + pixel.size / 2
      const centerY = pixel.y + pixel.size / 2
      if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
        ball.dx = -ball.dx
      } else {
        ball.dy = -ball.dy
      }
    }
  })
}

export const drawGame = ({
  ctx,
  canvas,
  pixelsRef,
  ballRef,
  paddlesRef,
}: DrawGameParams) => {
  if (!ctx) return

  ctx.fillStyle = BACKGROUND_COLOR
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // biome-ignore lint/complexity/noForEach: <explanation>
  pixelsRef.current.forEach((pixel) => {
    ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
    ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
  })

  ctx.fillStyle = BALL_COLOR
  ctx.beginPath()
  ctx.arc(
    ballRef.current.x,
    ballRef.current.y,
    ballRef.current.radius,
    0,
    Math.PI * 2,
  )
  ctx.fill()

  ctx.fillStyle = PADDLE_COLOR
  // biome-ignore lint/complexity/noForEach: <explanation>
  paddlesRef.current.forEach((paddle) => {
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
  })
}
