const getSvg = ({width, height, children} = {}) => `
  <svg width="${width}" height="${height}">
    ${children}
  </svg>
`

const getRandomColorComponent = () => (
  Math.floor(Math.random() * 255)
)

const getRandomColor = () => {
  const r = getRandomColorComponent()
  const g = getRandomColorComponent()
  const b = getRandomColorComponent()
  return `rgb(${r}, ${g}, ${b})`
}

const getGrid = ({
  width,
  height,
  xResolution,
  yResolution
}) => {
  const numberOfRows = yResolution + 1
  const numberOfColumns = xResolution + 1
  const horizontalDistance = height / yResolution
  const verticalDistance = width / xResolution

  const gridPoints = []

  for (rowCounter = 0; rowCounter < numberOfRows; ++rowCounter) {
    const gridPointsInRow = []
    for (columnCounter = 0; columnCounter < numberOfColumns; ++columnCounter) {
      gridPointsInRow.push({
        x: columnCounter * horizontalDistance,
        y: rowCounter * verticalDistance,
        ventureDirection: Math.random() * Math.PI * 2,
        ventureFactor: Math.random()
      })
    }
    gridPoints.push(gridPointsInRow)
  }

  return gridPoints
}

const getTriangle = ({
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
      stroke-width: 0;
    "
  />
`

const movePoint = ({x, y, ventureDirection, ventureDistance}) => ({
  x: x + (ventureDistance * Math.cos(ventureDirection)),
  y: y + (ventureDistance * Math.sin(ventureDirection))
})

const getTriangles = ({
  grid,
  ventureDistance
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

      const point1 = movePoint({
        ...grid[rowCounter][columnCounter],
        ventureDistance: grid[rowCounter][columnCounter].ventureFactor * ((isFirstRow || isFirstColumn) ? 0 : ventureDistance)
      })
      const point2 = movePoint({
        ...grid[rowCounter][columnCounter + 1],
        ventureDistance: grid[rowCounter][columnCounter + 1].ventureFactor * ((isFirstRow || isLastColumn) ? 0 : ventureDistance)
      })
      const point3 = movePoint({
        ...grid[rowCounter + 1][columnCounter],
        ventureDistance: grid[rowCounter + 1][columnCounter].ventureFactor * ((isFirstColumn || isLastRow) ? 0 : ventureDistance)
      })
      const point4 = movePoint({
        ...grid[rowCounter + 1][columnCounter + 1],
        ventureDistance: grid[rowCounter + 1][columnCounter + 1].ventureFactor * ((isLastRow || isLastColumn) ? 0 : ventureDistance)
      })

      triangles.push(
        getTriangle({
          edges: [point1, point2, point3],
          color: getRandomColor()
        }),
        getTriangle({
          edges: [point2, point3, point4],
          color: getRandomColor()
        })
      )
    }
  }

  return triangles
}

const getTrianglesBackground = ({
  width = 1280,
  height = 720,
  xResolution = 16,
  yResolution = 9,
  fuzz = 0.5
} = {}) => {
  const grid = getGrid({
    width,
    height,
    xResolution,
    yResolution
  })

  const horizontalDistance = height / yResolution
  const verticalDistance = width / xResolution
  const smallerDistance = Math.min(horizontalDistance, verticalDistance)
  const maxVentureDistance = smallerDistance / 2
  const triangles = getTriangles({
    grid,
    ventureDistance: fuzz * maxVentureDistance
  })

  return getSvg({
    width,
    height,
    children: triangles.join('')
  })
}
