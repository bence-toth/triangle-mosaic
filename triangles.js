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
  topTriangleColorDeviation,
  bottomTriangleColorDeviation
}) => ({
  x: x + (distance * Math.cos(direction)),
  y: y + (distance * Math.sin(direction)),
  topTriangleColorDeviation,
  bottomTriangleColorDeviation
})

const getDistance = ({x: x1, y: y1}, {x: x2, y: y2}) => (
  Math.sqrt(
    ((x2 - x1) ** 2) +
    ((y2 - y1) ** 2)
  )
)

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const getAverage = (...numbers) => (
  numbers.reduce((accumulator, current) => accumulator + current)
    / numbers.length
)

const getTriangleColor = ({
  triangle,
  colorSpots,
  colorFuzz,
  colorDeviation,
  colorSpotStrength
}) => {
  const center = {
    x: getAverage(triangle[0].x, triangle[1].x, triangle[2].x),
    y: getAverage(triangle[0].y, triangle[1].y, triangle[2].y)
  }

  const getWeight = colorSpot => (
    1 / (getDistance(colorSpot, center) ** colorSpotStrength)
  )

  const fullWeight = (
    colorSpots
      .map(colorSpot => getWeight(colorSpot))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  )

  const color = (
    colorSpots
      .map(colorSpot => ({
        color: hexToRgb(colorSpot.color),
        factor: getWeight(colorSpot) / fullWeight
      }))
      .map(({
        color: {r, g, b},
        factor
      }) => ({
        r: r * factor,
        g: g * factor,
        b: b * factor
      }))
      .reduce((accumulator, currentValue) => ({
        r: accumulator.r + currentValue.r,
        g: accumulator.g + currentValue.g,
        b: accumulator.b + currentValue.b
      }), {r: 0, g: 0, b: 0})
  )

  const adjustValue = (value, maxDeviation = 0.5) => (
    value * (1 + ((colorDeviation * colorFuzz * maxDeviation * 2) - (colorFuzz * maxDeviation)))
  )

  const adjustedColor = {
    r: Math.max(0, Math.min(255, adjustValue(color.r))),
    g: Math.max(0, Math.min(255, adjustValue(color.g))),
    b: Math.max(0, Math.min(255, adjustValue(color.b)))
  }

  return `rgb(${adjustedColor.r}, ${adjustedColor.g}, ${adjustedColor.b})`
}

// ----------------------------------------------------------------------------
// Engine

const getGrid = ({
  width,
  height,
  xResolution,
  yResolution
}) => {
  const numberOfRows = yResolution + 1
  const numberOfColumns = xResolution + 1
  const verticalDistance = height / yResolution
  const horizontalDistance = width / xResolution

  const gridPoints = []

  for (rowCounter = 0; rowCounter < numberOfRows; ++rowCounter) {
    const gridPointsInRow = []
    for (columnCounter = 0; columnCounter < numberOfColumns; ++columnCounter) {
      gridPointsInRow.push({
        x: columnCounter * horizontalDistance,
        y: rowCounter * verticalDistance,
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
  colorSpots,
  colorSpotStrength
}) => {
  const numberOfRows = grid.length
  const numberOfColumns = grid[0].length

  const triangles = []

  for (rowCounter = 0; rowCounter < numberOfRows - 1; ++rowCounter) {
    for (columnCounter = 0; columnCounter < numberOfColumns - 1; ++columnCounter) {
      const isFirstRow = (rowCounter === 0)
      const isFirstColumn = (columnCounter === 0)
      const isLastRow = (rowCounter === numberOfRows - 2)
      const isLastColumn = (columnCounter === numberOfColumns - 2)

      // TODO: Clean this up
      const point1 = movePoint({
        ...grid[rowCounter][columnCounter],
        distance: grid[rowCounter][columnCounter].factor * ((isFirstRow || isFirstColumn) ? 0 : shapeFuzz)
      })
      const point2 = movePoint({
        ...grid[rowCounter][columnCounter + 1],
        distance: grid[rowCounter][columnCounter + 1].factor * ((isFirstRow || isLastColumn) ? 0 : shapeFuzz)
      })
      const point3 = movePoint({
        ...grid[rowCounter + 1][columnCounter],
        distance: grid[rowCounter + 1][columnCounter].factor * ((isFirstColumn || isLastRow) ? 0 : shapeFuzz)
      })
      const point4 = movePoint({
        ...grid[rowCounter + 1][columnCounter + 1],
        distance: grid[rowCounter + 1][columnCounter + 1].factor * ((isLastRow || isLastColumn) ? 0 : shapeFuzz)
      })

      triangles.push(
        {
          edges: [point1, point2, point3],
          color: getTriangleColor({
            triangle: [point1, point2, point3],
            colorSpots,
            colorFuzz,
            colorDeviation: point1.topTriangleColorDeviation,
            colorSpotStrength
          })
        },
        {
          edges: [point2, point3, point4],
          color: getTriangleColor({
            triangle: [point2, point3, point4],
            colorSpots,
            colorFuzz,
            colorDeviation: point1.bottomTriangleColorDeviation,
            colorSpotStrength
          })
        }
      )
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
    colorFuzz = 0.15,
    colorSpots = [
      {
        x: 0,
        y: 0,
        color: '#ffc107'
      },
      {
        x: 1280,
        y: 720,
        color: '#f44336'
      }
    ],
    colorSpotStrength = 3
  } = {}) {
    this.height = height
    this.width = width
    this.xResolution = xResolution
    this.yResolution = yResolution
    this.shapeFuzz = shapeFuzz
    this.colorFuzz = colorFuzz
    this.colorSpots = colorSpots
    this.colorSpotStrength = colorSpotStrength
    this.grid = getGrid({
      width,
      height,
      xResolution,
      yResolution
    })
  }

  render() {
    const horizontalDistance = this.height / this.yResolution
    const verticalDistance = this.width / this.xResolution
    const smallerDistance = Math.min(horizontalDistance, verticalDistance)
    const maxVentureDistance = smallerDistance / 2
    const triangles = getTriangles({
      grid: this.grid,
      shapeFuzz: this.shapeFuzz * maxVentureDistance,
      colorFuzz: this.colorFuzz,
      colorSpots: this.colorSpots,
      colorSpotStrength: this.colorSpotStrength
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
    colorSpots,
    colorSpotStrength
  } = {}) {
    if (shapeFuzz !== undefined) {
      this.shapeFuzz = shapeFuzz
    }
    if (colorFuzz !== undefined) {
      this.colorFuzz = colorFuzz
    }
    if (colorSpots !== undefined) {
      this.colorSpots = colorSpots
    }
    if (colorSpotStrength !== undefined) {
      this.colorSpotStrength = colorSpotStrength
    }
    return this.render()
  }
}

// ----------------------------------------------------------------------------
// Experiments

const getPerpendicularPoint = ({
  start: s,
  end: e,
  external: t
}) => {
  const a = t.x - s.x
  const b = t.y - s.y
  const c = e.x - s.x
  const d = e.y - s.y
  const dot = a * c + b * d
  const lengthSquared = c * c + d * d
  const projectionLength = (lengthSquared != 0) ? (dot / lengthSquared) : -1

  return {
    x: s.x + projectionLength * c,
    y: s.y + projectionLength * d
  }
}

const getRatio = (start, end, target) => (
  (target - start) / (end - start)
)

const start = {
  x: 1,
  y: 1
}

const end = {
  x: 11,
  y: 2
}

const external = {
  x: 6,
  y: 10
}

const perpendicularPoint = getPerpendicularPoint({
  start,
  end,
  external
})

console.log(
  getRatio(start.x, end.x, perpendicularPoint.x),
  getRatio(start.y, end.y, perpendicularPoint.y)
)
