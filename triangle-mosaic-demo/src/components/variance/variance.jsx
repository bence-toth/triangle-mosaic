/* eslint-disable sonarjs/no-identical-functions */
import React from 'react'
import {func, number, object, oneOf} from 'prop-types'

import {actions} from '../app/app.state'

const Variance = ({
  shapeFuzz,
  colorFuzz,
  diagonals,
  dispatch
}) => (
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
        value={shapeFuzz}
        id='form-shape-fuzz'
        type='range'
        min={0}
        max={3}
        step={0.01}
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
        value={colorFuzz.hue}
        id='form-hue-fuzz'
        type='range'
        min={0}
        max={1}
        step={0.01}
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
        value={colorFuzz.saturation}
        id='form-saturation-fuzz'
        type='range'
        min={0}
        max={1}
        step={0.01}
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
        value={colorFuzz.lightness}
        id='form-lightness-fuzz'
        type='range'
        min={0}
        max={1}
        step={0.01}
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
        value={colorFuzz.alpha}
        id='form-alpha-fuzz'
        type='range'
        min={0}
        max={1}
        step={0.01}
      />
    </div>
    <div className='formField'>
      <label htmlFor='form-diagonals'>Diagonals</label>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select
        onChange={({target: {value}}) => dispatch({
          type: actions.updateDiagonals,
          diagonals: value
        })}
        value={diagonals}
        id='form-diagonals'
      >
        <option value='nw-se'>North-West - South-East</option>
        <option value='ne-sw'>North-East - South-West</option>
        <option value='alternating'>Alternating</option>
        <option value='random'>Random</option>
      </select>
    </div>
  </fieldset>
)

Variance.propTypes = {
  shapeFuzz: number,
  diagonals: oneOf(['nw-se', 'ne-sw', 'alternating', 'random']),
  // eslint-disable-next-line react/forbid-prop-types
  colorFuzz: object,
  dispatch: func
}

export default Variance
