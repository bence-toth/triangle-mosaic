/* eslint-disable jsx-a11y/label-has-associated-control */

import React, {useReducer} from 'react'

import './app.css'

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
        color: '#2196f3'
      }
    ]
  }
}

// const getFullConfigFromState = ({
//   width,
//   height,
//   xResolution,
//   yResolution,
//   shapeFuzz,
//   colorFuzz,
//   coloringMode,
//   coloringSingle,
//   coloringGradient,
//   coloringSpots
// }) => ({
//   width,
//   height,
//   xResolution,
//   yResolution,
//   shapeFuzz,
//   colorFuzz,
//   coloring: {
//     mode: coloringMode,
//     ...((coloringMode === 'single') && coloringSingle),
//     ...((coloringMode === 'linearGradient') && coloringGradient),
//     ...((coloringMode === 'radialGradient') && coloringGradient),
//     ...((coloringMode === 'spots') && coloringSpots)
//   }
// })

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
  updateColoringMode: 'updateColoringMode'
}

const reducer = (state, action) => {
  console.log({action, state})
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
                    width: value
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
                    height: value
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
                    xResolution: value
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
                    yResolution: value
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
              <input id='form-shape-fuzz' type='range' min='0' max='3' value='0.65' step='0.01' />
            </div>
            <div className='formField'>
              <label htmlFor='form-hue-fuzz'>Hue variance</label>
              <input id='form-hue-fuzz' type='range' min='0' max='1' value='0.1' step='0.01' />
            </div>
            <div className='formField'>
              <label htmlFor='form-saturation-fuzz'>Saturation variance</label>
              <input id='form-saturation-fuzz' type='range' min='0' max='1' value='0.1' step='0.01' />
            </div>
            <div className='formField'>
              <label htmlFor='form-lightness-fuzz'>Lightness variance</label>
              <input id='form-lightness-fuzz' type='range' min='0' max='1' value='0.1' step='0.01' />
            </div>
            <div className='formField'>
              <label htmlFor='form-alpha-fuzz'>Alpha variance</label>
              <input id='form-alpha-fuzz' type='range' min='0' max='1' value='0' step='0.01' />
            </div>
          </fieldset>
          <fieldset>
            <legend>Coloring</legend>
            <div className='formField'>
              <label htmlFor='form-coloring-mode-select'>Coloring mode</label>
              <select id='form-coloring-mode-select'>
                <option value='single' selected>Single color</option>
                <option value='linearGradient'>Linear gradient</option>
                <option value='radialGradient'>Radial gradient</option>
                <option value='spots'>Color spots</option>
              </select>
            </div>
            <div className='coloringOptions' data-mode='single'>
              <div className='formField'>
                <label htmlFor='form-coloring-single-color'>Color</label>
                <input id='form-coloring-single-color' type='color' value='#ffc107' />
              </div>
            </div>
            <div className='coloringOptions' data-mode='gradient' style={{display: 'none'}}>
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
            <div className='coloringOptions' data-mode='spots' style={{display: 'none'}}>
              <div id='spots' />
            </div>
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
