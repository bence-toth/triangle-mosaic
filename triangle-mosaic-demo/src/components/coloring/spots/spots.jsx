import React from 'react'
import {bool, func, number, object, string} from 'prop-types'

import {actions} from '../../app/app.state'

const Spot = ({
  index,
  x,
  y,
  color,
  intensity,
  isOnly,
  dispatch
}) => (
  <div className='spot'>
    <label className='big'>
      {`Spot #${index + 1}`}
    </label>
    <div className='columns'>
      <div className='formField'>
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
          type='number'
          min={-1000}
          max={3000}
        />
      </div>
      <div className='formField'>
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
          type='number'
          min={-1000}
          max={3000}
        />
      </div>
    </div>
    <div className='formField'>
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
        type='color'
      />
    </div>
    <div className='formField'>
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
        type='range'
        min={0}
        max={1.5}
        step={0.001}
      />
    </div>
    {!isOnly && (
      <button
        onClick={() => dispatch({
          type: actions.deleteSpot,
          index
        })}
        className='form-coloring-gradient-remove-spot'
        title='Delete spot'
        type='button'
      >
        ✕
      </button>
    )}
  </div>
)

Spot.propTypes = {
  index: number,
  x: number,
  y: number,
  color: string,
  intensity: number,
  isOnly: bool,
  dispatch: func
}

const Spots = ({
  coloringSpots,
  dispatch
}) => (
  <div id='spots'>
    {coloringSpots.spots.map((spot, spotIndex, spots) => (
      <Spot
        // eslint-disable-next-line react/no-array-index-key
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
      type='button'
      id='form-coloring-add-spot'
      onClick={() => dispatch({
        type: actions.addSpot
      })}
    >
      + Add new spot
    </button>
  </div>
)

Spots.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  coloringSpots: object,
  dispatch: func
}

export default Spots
