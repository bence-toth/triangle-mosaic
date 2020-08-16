const getRandomBetween = (min, max) => min + (Math.random() * (max - min))

const randomColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722'
]

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * randomColors.length)
  return randomColors[randomIndex]
}

const getConfigFromState = ({
  width,
  height,
  xResolution,
  yResolution,
  shapeFuzz,
  colorFuzz,
  coloringMode,
  coloringSingle,
  coloringGradient,
  coloringSpots,
  includeResolution = false
}) => ({
  width,
  height,
  ...(includeResolution && {
    xResolution,
    yResolution
  }),
  shapeFuzz,
  colorFuzz,
  coloring: {
    mode: coloringMode,
    ...((coloringMode === 'single') && coloringSingle),
    ...((['linearGradient', 'radialGradient'].includes(coloringMode)) && ({
      ...coloringGradient,
      stops: coloringGradient.stops.map(({location, color}) => [location, color])
    })),
    ...((coloringMode === 'spots') && coloringSpots)
  }
})


const displayTwoDigits = string => `0${string}`.slice(-2)

const getTimestamp = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = displayTwoDigits(date.getMonth() + 1)
  const day = displayTwoDigits(date.getDate())
  const hours = displayTwoDigits(date.getHours())
  const minutes = displayTwoDigits(date.getMinutes())
  const seconds = displayTwoDigits(date.getSeconds())
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`
}

const downloadSvg = ({svgCode}) => {
  const dataUrl = `data:image/svg+xml;utf8,${svgCode}`
  const fileName = `triangle-mosaic-${getTimestamp()}.svg`
  const downloadLink = document.createElement('a')
  document.body.append(downloadLink) // This line makes it work in Firefox
  downloadLink.setAttribute('href', dataUrl)
  downloadLink.setAttribute('download', fileName)
  downloadLink.click()
  window.requestAnimationFrame(() => {
    downloadLink.remove()
  })
}

export {getRandomBetween, getRandomColor, getConfigFromState, downloadSvg}
