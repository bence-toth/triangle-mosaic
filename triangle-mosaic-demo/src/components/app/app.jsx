/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-onchange */

import React, {useReducer} from 'react'

import './app.css'

const getRandomBetween = (min, max) => min + (Math.random() * (max - min))

const getRandomColor = () => {
  const colors = [
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
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const Spot = ({
  index,
  x,
  y,
  color,
  intensity,
  isOnly,
  dispatch
}) => (
  <div className="spot">
    <label className="big">Spot #{index + 1}</label>
    <div className="columns">
      <div className="formField">
        <label htmlFor={`form-coloring-gradient-spot-${index}-x`}>
          Location X
        </label>
        <input
          value={x}
          onChange={({target: {value}}) => dispatch({
            type: actions.updateSpotX,
            x: Number(value),
            index
          })}
          id={`form-coloring-gradient-spot-${index}-x`}
          type="number"
          min="-1000"
          max="3000"
        />
      </div>
      <div className="formField">
        <label htmlFor={`form-coloring-gradient-spot-${index}-y`}>
          Location Y
        </label>
        <input
          value={y}
          onChange={({target: {value}}) => dispatch({
            type: actions.updateSpotY,
            y: Number(value),
            index
          })}
          id={`form-coloring-gradient-spot-${index}-y`}
          type="number"
          min="-1000"
          max="3000"
        />
      </div>
    </div>
    <div className="formField">
      <label htmlFor={`form-coloring-gradient-spot-${index}-color`}>
        Color
      </label>
      <input
        value={color}
        onChange={({target: {value}}) => dispatch({
          type: actions.updateSpotColor,
          color: value,
          index
        })}
        id={`form-coloring-gradient-spot-${index}-color`}
        type="color"
      />
    </div>
    <div className="formField">
      <label htmlFor={`form-coloring-gradient-spot-${index}-intensity`}>
        Intensity
      </label>
      <input
        value={intensity}
        onChange={({target: {value}}) => dispatch({
          type: actions.updateSpotIntensity,
          intensity: Number(value),
          index
        })}
        id={`form-coloring-gradient-spot-${index}-intensity`}
        type="range"
        min="0"
        max="1.5"
        step="0.001"
      />
    </div>
    {!isOnly && (
      <button
        onClick={() => dispatch({
          type: actions.deleteSpot,
          index
        })}
        className="form-coloring-gradient-remove-spot"
        data-spot-index={index}
        title="Delete spot"
      >
        ✕
      </button>
    )}
  </div>
)

const AddSpotButton = ({dispatch}) => (
  <button
    id="form-coloring-add-spot"
    onClick={() => dispatch({
      type: actions.addSpot
    })}
  >
    Add new spot
  </button>
)

const initialState = {
  width: 1000,
  height: 1000,
  xResolution: 16,
  yResolution: 16,
  shapeFuzz: 0.65,
  colorFuzz: {
    hue: 0.1,
    saturation: 0.1,
    lightness: 0.1,
    alpha: 0
  },
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
      x: 1000,
      y: 1000
    },
    stops: [
      [0, '#9c27b0'],
      [0.25, '#03a9f4'],
      [0.5, '#8bc34a'],
      [0.75, '#ffc107'],
      [1, '#f44336']
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
        x: 1280,
        y: 0,
        color: '#f44336',
        intensity: 0.6
      },
      {
        x: 640,
        y: 720,
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
  updateColoringMode: 'updateColoringMode',
  updateSingleColor: 'updateSingleColor',
  addSpot: 'addSpot',
  updateSpotX: 'updateSpotX',
  updateSpotY: 'updateSpotY',
  updateSpotColor: 'updateSpotColor',
  updateSpotIntensity: 'updateSpotIntensity',
  deleteSpot: 'deleteSpot'
}

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
          spots: [
            ...state.coloringSpots.spots.slice(0, action.index),
            ...state.coloringSpots.spots.slice(action.index + 1)
          ]
        }
      }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <aside id='sidebar'>
        <h1>Triangle Mosaic</h1>
        <div id='form'>
          <fieldset>
            <legend>Dimensions</legend>
            <div className='columns'>
              <div className='formField'>
                <label htmlFor='form-width'>Width</label>
                <input
                  value={state.width}
                  onChange={({target: {value}}) => dispatch({
                    type: actions.updateWidth,
                    width: Number(value)
                  })}
                  id='form-width'
                  type='number'
                  min='120'
                />
              </div>
              <div className='formField'>
                <label htmlFor='form-height'>Height</label>
                <input
                  value={state.height}
                  onChange={({target: {value}}) => dispatch({
                    type: actions.updateHeight,
                    height: Number(value)
                  })}
                  id='form-height'
                  type='number'
                  min='120'
                />
              </div>
            </div>
            <div className='columns'>
              <div className='formField'>
                <label htmlFor='form-x-resolution'>x-resolution</label>
                <input
                  value={state.xResolution}
                  onChange={({target: {value}}) => dispatch({
                    type: actions.updateXResolution,
                    xResolution: Number(value)
                  })}
                  id='form-x-resolution'
                  type='number'
                  min='4'
                  max='128'
                />
              </div>
              <div className='formField'>
                <label htmlFor='form-y-resolution'>y-resolution</label>
                <input
                  value={state.yResolution}
                  onChange={({target: {value}}) => dispatch({
                    type: actions.updateYResolution,
                    yResolution: Number(value)
                  })}
                  id='form-y-resolution'
                  type='number'
                  min='4'
                  max='128'
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Variance</legend>
            <div className='formField'>
              <label htmlFor='form-shape-fuzz'>Shape variance</label>
              <input
                onInput={({target: {value}}) => dispatch({
                  type: actions.updateShapeFuzz,
                  shapeFuzz: Number(value)
                })}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateShapeFuzz,
                  shapeFuzz: Number(value)
                })}
                value={state.shapeFuzz}
                id='form-shape-fuzz'
                type='range'
                min='0'
                max='3'
                step='0.01'
              />
            </div>
            <div className='formField'>
              <label htmlFor='form-hue-fuzz'>Hue variance</label>
              <input
                onInput={({target: {value}}) => dispatch({
                  type: actions.updateHueFuzz,
                  hueFuzz: Number(value)
                })}
                value={state.colorFuzz.hueFuzz}
                id='form-hue-fuzz'
                type='range'
                min='0'
                max='1'
                step='0.01'
              />
            </div>
            <div className='formField'>
              <label htmlFor='form-saturation-fuzz'>Saturation variance</label>
              <input
                onInput={({target: {value}}) => dispatch({
                  type: actions.updateSaturationFuzz,
                  saturationFuzz: Number(value)
                })}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateSaturationFuzz,
                  saturationFuzz: Number(value)
                })}
                value={state.colorFuzz.saturation}
                id='form-saturation-fuzz'
                type='range'
                min='0'
                max='1'
                step='0.01'
              />
            </div>
            <div className='formField'>
              <label htmlFor='form-lightness-fuzz'>Lightness variance</label>
              <input
                onInput={({target: {value}}) => dispatch({
                  type: actions.updateLightnessFuzz,
                  lightnessFuzz: Number(value)
                })}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateLightnessFuzz,
                  lightnessFuzz: Number(value)
                })}
                value={state.colorFuzz.lightness}
                id='form-lightness-fuzz'
                type='range'
                min='0'
                max='1'
                step='0.01'
              />
            </div>
            <div className='formField'>
              <label htmlFor='form-alpha-fuzz'>Alpha variance</label>
              <input
                onInput={({target: {value}}) => dispatch({
                  type: actions.updateAlphaFuzz,
                  alphaFuzz: Number(value)
                })}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateAlphaFuzz,
                  alphaFuzz: Number(value)
                })}
                value={state.colorFuzz.alpha}
                id='form-alpha-fuzz'
                type='range'
                min='0'
                max='1'
                step='0.01'
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Coloring</legend>
            <div className='formField'>
              <label htmlFor='form-coloring-mode-select'>Coloring mode</label>
              <select
                value={state.coloringMode}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateColoringMode,
                  coloringMode: value
                })}
                id='form-coloring-mode-select'
              >
                <option value='single'>Single color</option>
                <option value='linearGradient'>Linear gradient</option>
                <option value='radialGradient'>Radial gradient</option>
                <option value='spots'>Color spots</option>
              </select>
            </div>
            {(state.coloringMode === 'single') && (
              <div className='coloringOptions'>
                <div className='formField'>
                  <label htmlFor='form-coloring-single-color'>Color</label>
                  <input
                    value={state.coloringSingle.color}
                    onChange={({target: {value}}) => dispatch({
                      type: actions.updateSingleColor,
                      color: value
                    })}
                    id='form-coloring-single-color'
                    type='color'
                  />
                </div>
              </div>
            )}
            {(['linearGradient', 'radialGradient'].includes(state.coloringMode)) && (
              <div className='coloringOptions'>
                <div className='columns'>
                  <div className='formField'>
                    <label htmlFor='form-coloring-gradient-start-x'>Start X</label>
                    <input id='form-coloring-gradient-start-x' type='number' value='0' />
                  </div>
                  <div className='formField'>
                    <label htmlFor='form-coloring-gradient-start-y'>Start Y</label>
                    <input id='form-coloring-gradient-start-y' type='number' value='0' />
                  </div>
                </div>
                <div className='columns'>
                  <div className='formField'>
                    <label htmlFor='form-coloring-gradient-end-x'>End X</label>
                    <input id='form-coloring-gradient-end-x' type='number' value='0' />
                  </div>
                  <div className='formField'>
                    <label htmlFor='form-coloring-gradient-end-y'>End Y</label>
                    <input id='form-coloring-gradient-end-y' type='number' value='0' />
                  </div>
                </div>
                <div>
                  <div id='gradient-stops' />
                </div>
              </div>
            )}
            {(state.coloringMode === 'spots') && (
              <div className='coloringOptions'>
                <div id='spots'>
                  {state.coloringSpots.spots.map((spot, spotIndex, spots) => (
                    <Spot
                      key={spotIndex}
                      index={spotIndex}
                      x={spot.x}
                      y={spot.y}
                      color={spot.color}
                      intensity={spot.intensity}
                      isOnly={spots.length === 1}
                      dispatch={dispatch}
                    />
                  ))}
                  <AddSpotButton
                    dispatch={dispatch}
                  />
                </div>
              </div>
            )}
          </fieldset>
        </div>
      </aside>
      <div id='svgRoot'>
        <div id='output' />
      </div>
    </>
  )
}

export default App
