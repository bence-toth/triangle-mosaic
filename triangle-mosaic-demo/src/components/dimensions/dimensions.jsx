/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

import React from 'react'

import {actions} from '../app/app.state'

const Dimensions = ({
  width,
  height,
  xResolution,
  yResolution,
  dispatch
}) => (
  <fieldset>
    <legend>Dimensions</legend>
    <div className='columns'>
      <div className='formField'>
        <label htmlFor='form-width'>Width</label>
        <input
          value={width}
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
          value={height}
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
          value={xResolution}
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
          value={yResolution}
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
)

export default Dimensions
