import React from 'react'
import {bool, func, number, object, string} from 'prop-types'

import {actions} from '../../app/app.state'

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
      <div className='stop'>
        <label className='big'>
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
        <div className='formField'>
          <label htmlFor={`form-coloring-gradient-stop-${index}-location`}>
            Location
          </label>
          <input
            value={location}
            onChange={({target: {value}}) => dispatch({
              type: actions.updateStopLocation,
              location: Number(value),
              id
            })}
            id={`form-coloring-gradient-stop-${index}-location`}
            type='number'
            min={0}
            max={1}
            step={0.01}
            disabled={isBoundary}
          />
        </div>
        <div className='formField'>
          <label htmlFor={`form-coloring-gradient-stop-${index}-color`}>
            Color
          </label>
          <input
            value={color}
            onChange={({target: {value}}) => dispatch({
              type: actions.updateStopColor,
              color: value,
              id
            })}
            id={`form-coloring-gradient-stop-${index}-color`}
            type='color'
          />
        </div>
        {!isBoundary && (
          <button
            type='button'
            onClick={() => dispatch({
              type: actions.deleteStop,
              id
            })}
            className='form-coloring-gradient-remove-stop'
          >
            ✕
          </button>
        )}
      </div>
      {!isLast && (
        <button
          type='button'
          onClick={() => dispatch({
            type: actions.addStop,
            index
          })}
          className='form-coloring-gradient-add-stop'
        >
          + Add new stop here
        </button>
      )}
    </>
  )
}

Stop.propTypes = {
  index: number,
  id: number,
  location: number,
  color: string,
  isFirst: bool,
  isLast: bool,
  dispatch: func,
  // eslint-disable-next-line react/forbid-prop-types
  start: object,
  // eslint-disable-next-line react/forbid-prop-types
  end: object
}

const Gradient = ({
  coloringGradient,
  dispatch
}) => (
  <div id='gradient-stops'>
    {coloringGradient.stops.map((stop, stopIndex, stops) => (
      <Stop
        key={stop.id}
        id={stop.id}
        index={stopIndex}
        location={stop.location}
        color={stop.color}
        isFirst={stopIndex === 0}
        isLast={stopIndex === (stops.length - 1)}
        dispatch={dispatch}
        start={coloringGradient.start}
        end={coloringGradient.end}
      />
    ))}
  </div>
)

Gradient.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  coloringGradient: object,
  dispatch: func
}

export default Gradient
