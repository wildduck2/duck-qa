export interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

export interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

export interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

export interface DrawGameParams {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  pixelsRef: React.RefObject<Pixel[]>
  ballRef: React.RefObject<Ball>
  paddlesRef: React.RefObject<Paddle[]>
}

export interface UpdateGameParams extends Omit<DrawGameParams, 'ctx'> {}

export interface InitializeGameParams extends Omit<DrawGameParams, 'ctx'> {
  scaleRef: React.RefObject<number>
}
