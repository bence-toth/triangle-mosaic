/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-onchange */

import React from 'react'

import SingleColor from './singleColor/singleColor'
import Gradient from './gradient/gradient'
import Spots from './spots/spots'

import {actions} from '../app/app.state'

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
