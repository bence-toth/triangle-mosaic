import {getRandomBetween, getRandomColor} from './app.utility'

const rem = (() => {
  const below1024 = window.matchMedia('(max-width: 1024px)').matches
  if (below1024) {
    return 13
  }
  const below1196 = window.matchMedia('(max-width: 1196px)').matches
  if (below1196) {
    return 14
  }
  const below1366 = window.matchMedia('(max-width: 1366px)').matches
  if (below1366) {
    return 15
  }
  return 16
})()
const sidebarWidth = 26 * rem
const canvasWidth = window.innerWidth - sidebarWidth
const canvasHeight = window.innerHeight
const idealGridSize = 128

const initialState = {
  width: canvasWidth,
  height: canvasHeight,
  xResolution: Math.max(Math.round(canvasWidth / idealGridSize), 4),
  yResolution: Math.max(Math.round(canvasHeight / idealGridSize), 4),
  shapeFuzz: 0.65,
  colorFuzz: {
    hue: 0.1,
    saturation: 0.1,
    lightness: 0.1,
    alpha: 0
  },
  diagonals: 'nw-se',
  coloringMode: 'single',
  coloringSingle: {
    color: '#ffc107'
  },
  coloringGradient: {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: canvasWidth,
      y: canvasHeight
    },
    stops: [
      {
        id: 0,
        location: 0,
        color: '#9c27b0'
      },
      {
        id: 1,
        location: 0.25,
        color: '#03a9f4'
      },
      {
        id: 2,
        location: 0.5,
        color: '#8bc34a'
      },
      {
        id: 3,
        location: 0.75,
        color: '#ffc107'
      },
      {
        id: 4,
        location: 1,
        color: '#f44336'
      }
    ]
  },
  coloringSpots: {
    spots: [
      {
        x: 0,
        y: 0,
        color: '#ffc107',
        intensity: 0.65
      },
      {
        x: canvasWidth,
        y: 0,
        color: '#f44336',
        intensity: 0.6
      },
      {
        x: canvasWidth / 2,
        y: canvasHeight,
        color: '#2196f3',
        intensity: 0.6
      }
    ]
  }
}

const actions = {
  updateWidth: 'updateWidth',
  updateHeight: 'updateHeight',
  updateXResolution: 'updateXResolution',
  updateYResolution: 'updateYResolution',
  updateShapeFuzz: 'updateShapeFuzz',
  updateHueFuzz: 'updateHueFuzz',
  updateSaturationFuzz: 'updateSaturationFuzz',
  updateLightnessFuzz: 'updateLightnessFuzz',
  updateAlphaFuzz: 'updateAlphaFuzz',
  updateDiagonals: 'updateDiagonals',
  updateColoringMode: 'updateColoringMode',
  updateSingleColor: 'updateSingleColor',
  addSpot: 'addSpot',
  updateSpotX: 'updateSpotX',
  updateSpotY: 'updateSpotY',
  updateSpotColor: 'updateSpotColor',
  updateSpotIntensity: 'updateSpotIntensity',
  deleteSpot: 'deleteSpot',
  updateGradientStartX: 'updateGradientStartX',
  updateGradientStartY: 'updateGradientStartY',
  updateGradientEndX: 'updateGradientEndX',
  updateGradientEndY: 'updateGradientEndY',
  updateStopLocation: 'updateStopLocation',
  updateStopColor: 'updateStopColor',
  addStop: 'addStop',
  loadColorPreset: 'loadColorPreset'
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const reducer = (state, action) => {
  switch (action.type) {
    case actions.updateWidth:
      return {
        ...state,
        width: action.width
      }
    case actions.updateHeight:
      return {
        ...state,
        height: action.height
      }
    case actions.updateXResolution:
      return {
        ...state,
        xResolution: action.xResolution
      }
    case actions.updateYResolution:
      return {
        ...state,
        yResolution: action.yResolution
      }
    case actions.updateShapeFuzz:
      return {
        ...state,
        shapeFuzz: action.shapeFuzz
      }
    case actions.updateHueFuzz:
      return {
        ...state,
        colorFuzz: {
          ...state.colorFuzz,
          hue: action.hueFuzz
        }
      }
    case actions.updateSaturationFuzz:
      return {
        ...state,
        colorFuzz: {
          ...state.colorFuzz,
          saturation: action.saturationFuzz
        }
      }
    case actions.updateLightnessFuzz:
      return {
        ...state,
        colorFuzz: {
          ...state.colorFuzz,
          lightness: action.lightnessFuzz
        }
      }
    case actions.updateAlphaFuzz:
      return {
        ...state,
        colorFuzz: {
          ...state.colorFuzz,
          alpha: action.alphaFuzz
        }
      }
    case actions.updateDiagonals:
      return {
        ...state,
        diagonals: action.diagonals
      }
    case actions.updateColoringMode:
      return {
        ...state,
        coloringMode: action.coloringMode
      }
    case actions.updateSingleColor:
      return {
        ...state,
        coloringSingle: {
          ...state.coloringSingle,
          color: action.color
        }
      }
    case actions.addSpot:
      return {
        ...state,
        coloringSpots: {
          ...state.coloringSpots,
          spots: [
            ...state.coloringSpots.spots, {
              x: Math.round(getRandomBetween(0, state.width)),
              y: Math.round(getRandomBetween(0, state.height)),
              color: getRandomColor(),
              intensity: getRandomBetween(0.4, 0.6)
            }
          ]
        }
      }
    case actions.updateSpotX:
      return {
        ...state,
        coloringSpots: {
          ...state.coloringSpots,
          spots: state.coloringSpots.spots.map((spot, spotIndex) => {
            if (spotIndex === action.index) {
              return {
                ...state.coloringSpots.spots[action.index],
                x: action.x
              }
            }
            return spot
          })
        }
      }
    case actions.updateSpotY:
      return {
        ...state,
        coloringSpots: {
          ...state.coloringSpots,
          spots: state.coloringSpots.spots.map((spot, spotIndex) => {
            if (spotIndex === action.index) {
              return {
                ...state.coloringSpots.spots[action.index],
                y: action.y
              }
            }
            return spot
          })
        }
      }
    case actions.updateSpotColor:
      return {
        ...state,
        coloringSpots: {
          ...state.coloringSpots,
          spots: state.coloringSpots.spots.map((spot, spotIndex) => {
            if (spotIndex === action.index) {
              return {
                ...state.coloringSpots.spots[action.index],
                color: action.color
              }
            }
            return spot
          })
        }
      }
    case actions.updateSpotIntensity:
      return {
        ...state,
        coloringSpots: {
          ...state.coloringSpots,
          spots: state.coloringSpots.spots.map((spot, spotIndex) => {
            if (spotIndex === action.index) {
              return {
                ...state.coloringSpots.spots[action.index],
                intensity: action.intensity
              }
            }
            return spot
          })
        }
      }
    case actions.deleteSpot:
      return {
        ...state,
        coloringSpots: {
          ...state.coloringSpots,
          // eslint-disable-next-line @getify/proper-arrows/params
          spots: state.coloringSpots.spots.filter((_, spotIndex) => spotIndex !== action.index)
        }
      }
    case actions.addStop:
      // eslint-disable-next-line no-case-declarations
      const previousStop = state.coloringGradient.stops[action.index]
      // eslint-disable-next-line no-case-declarations
      const nextStop = state.coloringGradient.stops[action.index + 1]
      // eslint-disable-next-line no-case-declarations
      const newStop = {
        id: Math.max(...state.coloringGradient.stops.map(({id}) => id)) + 1,
        location: (previousStop.location + nextStop.location) / 2,
        color: getRandomColor()
      }
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          stops: [
            ...state.coloringGradient.stops.slice(0, action.index + 1),
            newStop,
            ...state.coloringGradient.stops.slice(action.index + 1)
          ]
        }
      }
    case actions.updateGradientStartX:
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          start: {
            ...state.coloringGradient.start,
            x: action.x
          }
        }
      }
    case actions.updateGradientStartY:
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          start: {
            ...state.coloringGradient.start,
            y: action.y
          }
        }
      }
    case actions.updateGradientEndX:
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          end: {
            ...state.coloringGradient.end,
            x: action.x
          }
        }
      }
    case actions.updateGradientEndY:
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          end: {
            ...state.coloringGradient.end,
            y: action.y
          }
        }
      }
    case actions.updateStopLocation:
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          // eslint-disable-next-line fp/no-mutating-methods
          stops: state.coloringGradient.stops.map(stop => {
            if (stop.id === action.id) {
              return {
                ...stop,
                location: action.location
              }
            }
            return stop
          }).sort((
            {location: leftLocation},
            {location: rightLocation}
          ) => {
            if (leftLocation < rightLocation) {
              return -1
            }
            if (rightLocation > leftLocation) {
              return 1
            }
            return 0
          })
        }
      }
    case actions.updateStopColor:
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          stops: state.coloringGradient.stops.map(stop => {
            if (stop.id === action.id) {
              return {
                ...stop,
                color: action.color
              }
            }
            return stop
          })
        }
      }
    case actions.deleteStop:
      return {
        ...state,
        coloringGradient: {
          ...state.coloringGradient,
          stops: state.coloringGradient.stops.filter(({id}) => (id !== action.id))
        }
      }
    case actions.loadColorPreset:
      return {
        ...state,
        ...action.colorConfiguration
      }
    default:
      return state
  }
}

export {initialState, actions, reducer}
