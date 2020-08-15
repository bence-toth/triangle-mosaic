/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'

import './app.css'

const App = () => (
  <>
    <aside id='sidebar'>
      <h1>Triangle Mosaic</h1>
      <div id='form'>
        <fieldset>
          <legend>Dimensions</legend>
          <div className='columns'>
            <div className='formField'>
              <label htmlFor='form-width'>Width</label>
              <input id='form-width' type='number' min='120' value='960' />
            </div>
            <div className='formField'>
              <label htmlFor='form-height'>Height</label>
              <input id='form-height' type='number' min='120' value='720' />
            </div>
          </div>
          <div className='columns'>
            <div className='formField'>
              <label htmlFor='form-x-resolution'>x-resolution</label>
              <input id='form-x-resolution' type='number' min='4' max='128' value='16' />
            </div>
            <div className='formField'>
              <label htmlFor='form-y-resolution'>y-resolution</label>
              <input id='form-y-resolution' type='number' min='4' max='128' value='16' />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Variance</legend>
          <div className='formField'>
            <label htmlFor='form-shape-fuzz'>Shape variance</label>
            <input id='form-shape-fuzz' type='range' min='0' max='3' value='0.65' step='0.01' />
          </div>
          <div className='formField'>
            <label htmlFor='form-hue-fuzz'>Hue variance</label>
            <input id='form-hue-fuzz' type='range' min='0' max='1' value='0.1' step='0.01' />
          </div>
          <div className='formField'>
            <label htmlFor='form-saturation-fuzz'>Saturation variance</label>
            <input id='form-saturation-fuzz' type='range' min='0' max='1' value='0.1' step='0.01' />
          </div>
          <div className='formField'>
            <label htmlFor='form-lightness-fuzz'>Lightness variance</label>
            <input id='form-lightness-fuzz' type='range' min='0' max='1' value='0.1' step='0.01' />
          </div>
          <div className='formField'>
            <label htmlFor='form-alpha-fuzz'>Alpha variance</label>
            <input id='form-alpha-fuzz' type='range' min='0' max='1' value='0' step='0.01' />
          </div>
        </fieldset>
        <fieldset>
          <legend>Coloring</legend>
          <div className='formField'>
            <label htmlFor='form-coloring-mode-select'>Coloring mode</label>
            <select id='form-coloring-mode-select'>
              <option value='single' selected>Single color</option>
              <option value='linearGradient'>Linear gradient</option>
              <option value='radialGradient'>Radial gradient</option>
              <option value='spots'>Color spots</option>
            </select>
          </div>
          <div className='coloringOptions' data-mode='single'>
            <div className='formField'>
              <label htmlFor='form-coloring-single-color'>Color</label>
              <input id='form-coloring-single-color' type='color' value='#ffc107' />
            </div>
          </div>
          <div className='coloringOptions' data-mode='gradient' style={{display: 'none'}}>
            <div className='columns'>
              <div className='formField'>
                <label htmlFor='form-coloring-gradient-start-x'>Start X</label>
                <input id='form-coloring-gradient-start-x' type='number' value='0' />
              </div>
              <div className='formField'>
                <label htmlFor='form-coloring-gradient-start-y'>Start Y</label>
                <input id='form-coloring-gradient-start-y' type='number' value='0' />
              </div>
            </div>
            <div className='columns'>
              <div className='formField'>
                <label htmlFor='form-coloring-gradient-end-x'>End X</label>
                <input id='form-coloring-gradient-end-x' type='number' value='0' />
              </div>
              <div className='formField'>
                <label htmlFor='form-coloring-gradient-end-y'>End Y</label>
                <input id='form-coloring-gradient-end-y' type='number' value='0' />
              </div>
            </div>
            <div>
              <div id='gradient-stops' />
            </div>
          </div>
          <div className='coloringOptions' data-mode='spots' style={{display: 'none'}}>
            <div id='spots' />
          </div>
        </fieldset>
      </div>
    </aside>
    <div id='svgRoot'>
      <div id='output' />
    </div>
  </>
)

export default App
