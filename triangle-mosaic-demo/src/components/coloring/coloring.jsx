/* eslint-disable react/forbid-prop-types */
import React from 'react'
import {func, object, string} from 'prop-types'

import {actions} from '../app/app.state'
import Gradient from './gradient/gradient'
import SingleColor from './singleColor/singleColor'
import Spots from './spots/spots'

const Coloring = ({
  coloringMode,
  coloringSingle,
  coloringGradient,
  coloringSpots,
  dispatch
}) => (
  <fieldset>
    <legend>Coloring details</legend>
    <div className='formField'>
      <label htmlFor='form-coloring-mode-select'>Coloring mode</label>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
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

Coloring.propTypes = {
  coloringMode: string,
  coloringSingle: object,
  coloringGradient: object,
  coloringSpots: object,
  dispatch: func
}

export default Coloring
