import React from 'react'
import {func, shape, string} from 'prop-types'

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

SingleColor.propTypes = {
  coloringSingle: shape({
    color: string
  }),
  dispatch: func
}

export default SingleColor
