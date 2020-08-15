/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-onchange */

import React from 'react'

import SingleColor from './singleColor/singleColor'
import Gradient from './gradient/gradient'
import Spots from './spots/spots'

import {actions} from '../app/app.state'

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

const Coloring = ({
  coloringMode,
  coloringSingle,
  coloringGradient,
  coloringSpots,
  dispatch
}) => (
  <fieldset>
    <legend>Coloring</legend>
    <div className='formField'>
      <label htmlFor='form-coloring-mode-select'>Coloring mode</label>
      <select
        value={coloringMode}
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
    <div className='coloringOptions'>
      {(coloringMode === 'single') && (
        <SingleColor
          coloringSingle={coloringSingle}
          dispatch={dispatch}
        />
      )}
      {(['linearGradient', 'radialGradient'].includes(coloringMode)) && (
        <Gradient
          coloringGradient={coloringGradient}
          dispatch={dispatch}
        />
      )}
      {(coloringMode === 'spots') && (
        <Spots
          coloringSpots={coloringSpots}
          dispatch={dispatch}
        />
      )}
    </div>
  </fieldset>
)

export default Coloring
