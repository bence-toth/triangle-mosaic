/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-onchange */

import React from 'react'

import {actions} from '../../app/app.state'

const SingleColor = ({
  coloringSingle,
  dispatch
}) => (
  <div className='formField'>
    <label htmlFor='form-coloring-single-color'>Color</label>
    <input
      value={coloringSingle.color}
      onChange={({target: {value}}) => dispatch({
        type: actions.updateSingleColor,
        color: value
      })}
      id='form-coloring-single-color'
      type='color'
    />
  </div>
)

export default SingleColor
