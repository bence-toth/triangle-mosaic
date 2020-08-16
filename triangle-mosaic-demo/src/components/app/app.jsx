/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-onchange */

// TODO: Update favicons, manifest, html title etc.

// TODO: ESLint
// TODO: Add "branding", link to docs etc.
// TODO: GitHub pages: https://medium.com/mobile-web-dev/how-to-build-and-deploy-a-react-app-to-github-pages-in-less-than-5-minutes-d6c4ffd30f14
// TODO: Add tests (Jest, Cypress)

import React, {useState, useReducer, useEffect, useRef} from 'react'

import Dimensions from '../dimensions/dimensions'
import Variance from '../variance/variance'
import ColoringPresets from '../coloringPresets/coloringPresets'
import Coloring from '../coloring/coloring'

import {initialState, reducer} from './app.state'
import {getConfigFromState, downloadSvg} from './app.utility'
import {useDebounce} from './app.hooks'

import TriangleMosaic from './triangleMosaic';

import './app.css'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [trianglesHtml, onUpdateTrianglesHtml] = useState('')
  const {current: triangleMosaic} = useRef(new TriangleMosaic(getConfigFromState(state)))
  const debouncedState = useDebounce(state, 100)
  useEffect(() => {
    const config = getConfigFromState(debouncedState)
    onUpdateTrianglesHtml(triangleMosaic.rehydrate(config))
  }, [debouncedState])
  useEffect(() => {
    const config = getConfigFromState({
      ...debouncedState,
      includeResolution: true
    })
    onUpdateTrianglesHtml(triangleMosaic.rehydrate(config))
  }, [debouncedState.xResolution, debouncedState.yResolution])

  return (
    <>
      <aside id='sidebar'>
        <h1>Triangle Mosaic</h1>
        <div id='form'>
          <Dimensions
            width={state.width}
            height={state.height}
            xResolution={state.xResolution}
            yResolution={state.yResolution}
            dispatch={dispatch}
          />
          <Variance
            shapeFuzz={state.shapeFuzz}
            colorFuzz={state.colorFuzz}
            dispatch={dispatch}
          />
          <ColoringPresets
            width={state.width}
            height={state.height}
            dispatch={dispatch}
          />
          <Coloring
            coloringMode={state.coloringMode}
            coloringSingle={state.coloringSingle}
            coloringGradient={state.coloringGradient}
            coloringSpots={state.coloringSpots}
            dispatch={dispatch}
          />
        </div>
      </aside>
      <div id='svgRoot'>
        <div id='output' dangerouslySetInnerHTML={{__html: trianglesHtml}} />
        <button
          id="downloadSvgButton"
          onClick={() => {
            downloadSvg({
              svgCode: trianglesHtml
            })
          }}
        >
          ⬇ Download SVG
        </button>
      </div>
    </>
  )
}

export default App
