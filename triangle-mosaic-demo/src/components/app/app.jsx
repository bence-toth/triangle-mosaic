/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-onchange */

// TODO: Add "branding", link to docs etc.
// TODO: Add linear gradient presets
// TODO: Add radial gradient presets
// TODO: Add spot presets
// TODO: Add download SVG option
// TODO: ESLint
// TODO: Add tests (Jest, Cypress)
// TODO: Update favicons, manifest, html

import React, {useState, useReducer, useEffect, useRef} from 'react'

import {initialState, actions, reducer} from './app.state'
import {getConfigFromState} from './app.utility'
import {useDebounce} from './app.hooks'

import TriangleMosaic from './triangleMosaic';

import './app.css'

const Stop = ({
  index,
  id,
  location,
  color,
  isFirst,
  isLast,
  dispatch,
  start,
  end
}) => {
  const isBoundary = isFirst || isLast
  return (
    <>
      <div className="stop">
        <label className="big">
          {
            (isFirst && 'Start')
              || (isLast && 'End')
              || `Stop #${index + 1}`
          }
        </label>
        {isFirst && (
          <div className='columns'>
            <div className='formField'>
              <label htmlFor='form-coloring-gradient-start-x'>Position X</label>
              <input
                value={start.x}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateGradientStartX,
                  x: Number(value)
                })}
                id='form-coloring-gradient-start-x'
                type='number'
              />
            </div>
            <div className='formField'>
              <label htmlFor='form-coloring-gradient-start-y'>Position Y</label>
              <input
                value={start.y}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateGradientStartY,
                  y: Number(value)
                })}
                id='form-coloring-gradient-start-y'
                type='number'
              />
            </div>
          </div>
        )}
        {isLast && (
          <div className='columns'>
            <div className='formField'>
              <label htmlFor='form-coloring-gradient-end-x'>Position X</label>
              <input
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateGradientEndX,
                  x: Number(value)
                })}
                value={end.x}
                id='form-coloring-gradient-end-x'
                type='number'
              />
            </div>
            <div className='formField'>
              <label htmlFor='form-coloring-gradient-end-y'>Position Y</label>
              <input
                value={end.y}
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateGradientEndY,
                  y: Number(value)
                })}
                id='form-coloring-gradient-end-y'
                type='number'
              />
            </div>
          </div>
        )}
        <div className="formField">
          <label htmlFor="form-coloring-gradient-stop-${index}-location">
            Location
          </label>
          <input
            value={location}
            onChange={({target: {value}}) => dispatch({
              type: actions.updateStopLocation,
              location: Number(value),
              id
            })}
            id="form-coloring-gradient-stop-${index}-location"
            type="number"
            min="0"
            max="1"
            step="0.01"
            disabled={isBoundary}
          />
        </div>
        <div className="formField">
          <label htmlFor="form-coloring-gradient-stop-${index}-color">
            Color
          </label>
          <input
            value={color}
            onChange={({target: {value}}) => dispatch({
              type: actions.updateStopColor,
              color: value,
              id
            })}
            id="form-coloring-gradient-stop-${index}-color"
            type="color"
          />
        </div>
        {!isBoundary && (
          <button
            onClick={() => dispatch({
              type: actions.deleteStop,
              id
            })}
            className="form-coloring-gradient-remove-stop"
            data-stop-index="${index}"
          >
            ✕
          </button>
        )}
      </div>
      {!isLast && (
        <button
          onClick={() => dispatch({
            type: actions.addStop,
            index
          })}
          className="form-coloring-gradient-add-stop"
        >
          Add new stop here
        </button>
      )}
    </>
  )
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

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [trianglesHtml, onUpdateTrianglesHtml] = useState('')
  const {current: triangleMosaic} = useRef(new TriangleMosaic(getConfigFromState(state)))
  const debouncedState = useDebounce(state, 100)
  useEffect(() => {
    const config = getConfigFromState(debouncedState)
    onUpdateTrianglesHtml(triangleMosaic.rehydrate(config))
  }, [debouncedState])
  useEffect(() => {
    const config = getConfigFromState({
      ...debouncedState,
      includeResolution: true
    })
    onUpdateTrianglesHtml(triangleMosaic.rehydrate(config))
  }, [debouncedState.xResolution, debouncedState.yResolution])

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
                onChange={({target: {value}}) => dispatch({
                  type: actions.updateHueFuzz,
                  hueFuzz: Number(value)
                })}
                value={state.colorFuzz.hue}
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
                <div id='gradient-stops'>
                  {state.coloringGradient.stops.map((stop, stopIndex, stops) => (
                    <Stop
                      key={stop.id}
                      id={stop.id}
                      index={stopIndex}
                      location={stop.location}
                      color={stop.color}
                      isFirst={stopIndex === 0}
                      isLast={stopIndex === (stops.length - 1)}
                      dispatch={dispatch}
                      start={state.coloringGradient.start}
                      end={state.coloringGradient.end}
                    />
                  ))}
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
                    <button
                      id="form-coloring-add-spot"
                      onClick={() => dispatch({
                        type: actions.addSpot
                      })}
                    >
                      Add new spot
                    </button>
                </div>
              </div>
            )}
          </fieldset>
        </div>
      </aside>
      <div id='svgRoot'>
        <div id='output' dangerouslySetInnerHTML={{__html: trianglesHtml}} />
      </div>
    </>
  )
}

export default App
