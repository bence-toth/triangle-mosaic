// ----------------------------------------------------------------------------
// Render

const renderSvg = ({
  width,
  height,
  children
} = {}) => `
  <svg width="${width}" height="${height}">
    ${children}
  </svg>
`

const renderTriangle = ({
  edges,
  color
}) => `
  <polygon
    points="
      ${edges[0].x},${edges[0].y}
      ${edges[1].x},${edges[1].y}
      ${edges[2].x},${edges[2].y}"
    style="
      fill: ${color};
      stroke: ${color};
      stroke-width: 1;
    "
  />
`

// ----------------------------------------------------------------------------
// Utility

const movePoint = ({
  x,
  y,
  direction,
  distance,
  ...rest
}) => ({
  x: x + (distance * Math.cos(direction)),
  y: y + (distance * Math.sin(direction)),
  ...rest
})

const getDistance = (
  {x: x1, y: y1},
  {x: x2, y: y2}
) => (
  Math.sqrt(
    ((x2 - x1) ** 2) +
    ((y2 - y1) ** 2)
  )
)

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const getRgbColor = ({r, g, b}) => (
  `rgb(${r}, ${g}, ${b})`
)

const add = (a, b) => a + b

const getAverage = (...numbers) => (
  numbers.reduce(add) / numbers.length
)

const getTriangleCenter = (
  [
    {x: x1, y: y1},
    {x: x2, y: y2},
    {x: x3, y: y3}
  ]
) => ({
  x: getAverage(x1, x2, x3),
  y: getAverage(y1, y2, y3)
})

const clamp = ({min, value, max}) => (
  Math.max(min, Math.min(max, value))
)

const getPerpendicularPoint = ({
  start: s,
  end: e,
  external: t
}) => {
  const a = t.x - s.x
  const b = t.y - s.y
  const c = e.x - s.x
  const d = e.y - s.y
  const dot = (a * c) + (b * d)
  const lengthSquared = (c ** 2) + (d ** 2)
  const projectionLength = (
    (lengthSquared != 0)
      ? (dot / lengthSquared)
      : -1
  )
  return {
    x: s.x + (projectionLength * c),
    y: s.y + (projectionLength * d)
  }
}

const getRatio = (start, end, target) => (
  (target - start) / (end - start)
)

const getTriangleColor = ({
  triangle,
  colorFuzz,
  colorDeviation,
  coloring
}) => {
  let color = {r: 0, g: 0, b: 0}
  if (coloring.mode === 'single') {
    color = hexToRgb(coloring.color)
  }
  const center = getTriangleCenter(triangle)
  if (['linearGradient', 'radialGradient'].includes(coloring.mode)) {
    const {start, end, stops} = coloring
    let ratio

    if (coloring.mode === 'linearGradient') {
      const perpendicularPoint = getPerpendicularPoint({
        start,
        end,
        external: center
      })

      ratio = getRatio(start.x, end.x, perpendicularPoint.x)
    }
    if (coloring.mode === 'radialGradient') {
      const gradientLength = getDistance(start, end)
      const triangleDistance = getDistance(start, center)

      ratio = triangleDistance / gradientLength
    }

    const exactMatch = stops.find(([location]) => ratio === location)

    if (ratio < 0) {
      // Went negative overboard
      color = hexToRgb(stops[0][1])
    }
    else if (ratio > 1) {
      // Went positive overboard
      color = hexToRgb(stops[stops.length - 1][1])
    }
    else if (exactMatch) {
      // Hit a stop exactly
      color = hexToRgb(exactMatch[1])
    }
    else {
      // Somewhere between two stops
      const nextStopIndex = stops.findIndex(([location]) => location > ratio)
      const previousStop = stops[nextStopIndex - 1]
      const nextStop = stops[nextStopIndex]
      const endRatio = getRatio(previousStop[0], nextStop[0], ratio)
      const endColor = hexToRgb(nextStop[1])
      const startRatio = 1 - endRatio
      const startColor = hexToRgb(previousStop[1])

      color = {
        r: (startRatio * startColor.r) + (endRatio * endColor.r),
        g: (startRatio * startColor.g) + (endRatio * endColor.g),
        b: (startRatio * startColor.b) + (endRatio * endColor.b)
      }
    }
  }
  if (coloring.mode === 'spots') {
    // Calculate color based on spots
    const {spots, spotIntensity} = coloring

    const getWeight = spot => (
      1 / (getDistance(spot, center) ** (1 / (spot.intensity || spotIntensity || 0.5)))
    )

    const fullWeight = (
      spots
        .map(getWeight)
        .reduce(add, 0)
    )

    color = (
      spots
        .map(spot => ({
          // Get color components of the spot
          color: hexToRgb(spot.color),
          // Calculate how much this spot contributes to the color
          factor: getWeight(spot) / fullWeight
        }))
        .map(({
          color: {r, g, b},
          factor
        }) => ({
          // Calculate the color this spot contributes to the mix with
          r: r * factor,
          g: g * factor,
          b: b * factor
        }))
        .reduce((accumulator, currentValue) => ({
          // Add color values of all spots (by color component)
          r: accumulator.r + currentValue.r,
          g: accumulator.g + currentValue.g,
          b: accumulator.b + currentValue.b
        }), {r: 0, g: 0, b: 0})
    )
  }

  // Add color fuzz
  const getAdjustedValue = (value, maxDeviation = 0.5) => (
    value * (
      1 + (
        (colorDeviation * maxDeviation * colorFuzz * 2)
          - (colorFuzz * maxDeviation)
      )
    )
  )

  const adjustedColor = {
    r: clamp({
      min: 0,
      max: 255,
      value: getAdjustedValue(color.r)
    }),
    g: clamp({
      min: 0,
      max: 255,
      value: getAdjustedValue(color.g)
    }),
    b: clamp({
      min: 0,
      max: 255,
      value: getAdjustedValue(color.b)
    })
  }

  return getRgbColor(adjustedColor)
}

const getMaxVentureDistance = ({
  width,
  height,
  xResolution,
  yResolution
}) => {
  const horizontalDistance = height / yResolution
  const verticalDistance = width / xResolution
  const smallerDistance = Math.min(horizontalDistance, verticalDistance)
  const maxVentureDistance = smallerDistance / 2
  return maxVentureDistance
}

// ----------------------------------------------------------------------------
// Engine

const getGrid = ({
  xResolution,
  yResolution
}) => {
  const numberOfRows = yResolution + 1
  const numberOfColumns = xResolution + 1

  const gridPoints = []

  for (let rowCounter = 0; rowCounter < numberOfRows; ++rowCounter) {
    const gridPointsInRow = []
    for (let columnCounter = 0; columnCounter < numberOfColumns; ++columnCounter) {
      gridPointsInRow.push({
        x: columnCounter,
        y: rowCounter,
        direction: Math.random() * Math.PI * 2,
        factor: Math.random(),
        topTriangleColorDeviation: Math.random(),
        bottomTriangleColorDeviation: Math.random()
      })
    }
    gridPoints.push(gridPointsInRow)
  }

  return gridPoints
}

const getTriangles = ({
  grid,
  shapeFuzz,
  colorFuzz,
  coloring,
  width,
  height,
}) => {
  const numberOfRows = grid.length
  const numberOfColumns = grid[0].length
  const verticalDistance = height / (numberOfRows - 1)
  const horizontalDistance = width / (numberOfColumns - 1)

  const triangles = []

  // We'll take 4 grid points in one go to form 2 triangles
  for (let rowCounter = 0; rowCounter < numberOfRows - 1; ++rowCounter) {
    for (let columnCounter = 0; columnCounter < numberOfColumns - 1; ++columnCounter) {
      const isFirstRow = (rowCounter === 0)
      const isFirstColumn = (columnCounter === 0)
      const isLastRow = (rowCounter === numberOfRows - 2)
      const isLastColumn = (columnCounter === numberOfColumns - 2)

      const isPointStatic = pointPosition => {
        if (pointPosition === 0) {
          return isFirstRow || isFirstColumn
        }
        if (pointPosition === 1) {
          return isFirstRow || isLastColumn
        }
        if (pointPosition === 2) {
          return isFirstColumn || isLastRow
        }
        if (pointPosition === 3) {
          return isLastRow || isLastColumn
        }
      }

      const points = [
        // 0----1
        // |  / |
        // | /  |
        // 2----3
        grid[rowCounter][columnCounter],
        grid[rowCounter][columnCounter + 1],
        grid[rowCounter + 1][columnCounter],
        grid[rowCounter + 1][columnCounter + 1]
      ].map((point, pointIndex) => ({
        ...point,
        x: point.x * horizontalDistance,
        y: point.y * verticalDistance,
        direction: point.direction,
        distance: (
          !isPointStatic(pointIndex)
            ? (point.factor * shapeFuzz)
            : 0
        )
      })).map(movePoint)

      const topTriangle = {
        // Top triangle
        //
        // 0----1
        // |  /
        // | /
        // 2
        edges: [points[0], points[1], points[2]],
        color: getTriangleColor({
          triangle: [points[0], points[1], points[2]],
          coloring,
          colorFuzz,
          colorDeviation: points[0].topTriangleColorDeviation,
        })
      }

      const bottomTriangle = {
        // Bottom triangle
        //
        //      1
        //    / |
        //   /  |
        // 2----3
        edges: [points[1], points[2], points[3]],
        color: getTriangleColor({
          triangle: [points[1], points[2], points[3]],
          coloring,
          colorFuzz,
          colorDeviation: points[0].bottomTriangleColorDeviation,
        })
      }

      triangles.push(topTriangle, bottomTriangle)
    }
  }

  return triangles
}

// ----------------------------------------------------------------------------
// State and API

class TrianglesBackground {
  constructor({
    width = 1280,
    height = 720,
    xResolution = 16,
    yResolution = 9,
    shapeFuzz = 0.65,
    colorFuzz = {
      hue: 0.1,
      saturation: 0.1,
      lightness: 0.1
    },
    coloring = {
      mode: 'spots',
      spots: [
        {
          x: 0,
          y: 0,
          color: '#ffc107'
        },
        {
          x: 1280,
          y: 0,
          color: '#f44336'
        },
        {
          x: 640,
          y: 720,
          color: '#2196f3'
        }
      ]
    }
  } = {}) {
    this.height = height
    this.width = width
    this.xResolution = xResolution
    this.yResolution = yResolution
    this.shapeFuzz = shapeFuzz
    this.colorFuzz = colorFuzz
    this.coloring = coloring
    this.grid = getGrid({
      width,
      height,
      xResolution,
      yResolution
    })
  }

  render() {
    const maxVentureDistance = getMaxVentureDistance({
      width: this.width,
      height: this.height,
      xResolution: this.xResolution,
      yResolution: this.yResolution
    })
    const triangles = getTriangles({
      grid: this.grid,
      shapeFuzz: this.shapeFuzz * maxVentureDistance,
      colorFuzz: this.colorFuzz,
      coloring: this.coloring,
      width: this.width,
      height: this.height
    })
    return renderSvg({
      width: this.width,
      height: this.height,
      children: triangles.map(renderTriangle).join('')
    })
  }

  rehydrate({
    shapeFuzz,
    colorFuzz,
    coloring,
    width,
    height,
    xResolution,
    yResolution
  } = {}) {
    if (shapeFuzz !== undefined) {
      this.shapeFuzz = shapeFuzz
    }
    if (colorFuzz?.hue !== undefined) {
      this.colorFuzz.hue = colorFuzz.hue
    }
    if (colorFuzz?.saturation !== undefined) {
      this.colorFuzz.saturation = colorFuzz.saturation
    }
    if (colorFuzz?.lightness !== undefined) {
      this.colorFuzz.lightness = colorFuzz.lightness
    }
    if (coloring !== undefined) {
      this.coloring = coloring
    }
    if (width !== undefined) {
      this.width = width
    }
    if (height !== undefined) {
      this.height = height
    }
    if (xResolution !== undefined) {
      this.xResolution = xResolution
    }
    if (yResolution !== undefined) {
      this.yResolution = yResolution
    }
    if (xResolution !== undefined || yResolution !== undefined) {
      this.grid = getGrid({
        width: this.width,
        height: this.height,
        xResolution: this.xResolution,
        yResolution: this.yResolution
      })
    }
    return this.render()
  }
}

export default TrianglesBackground
