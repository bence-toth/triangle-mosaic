import React, {useEffect, useReducer, useRef, useState} from 'react'
import TriangleMosaic from 'triangle-mosaic'

import Coloring from '../coloring/coloring'
import ColoringPresets from '../coloringPresets/coloringPresets'
import Dimensions from '../dimensions/dimensions'
import Variance from '../variance/variance'
import {useDebounce} from './app.hooks'
import {initialState, reducer} from './app.state'
import {downloadSvg, getConfigFromState} from './app.utility'

import './app.css'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [trianglesHtml, onUpdateTrianglesHtml] = useState('')
  const {current: triangleMosaic} = useRef(new TriangleMosaic(getConfigFromState(state)))
  const debouncedState = useDebounce(state, 100)
  useEffect(() => {
    const config = getConfigFromState(debouncedState)
    onUpdateTrianglesHtml(triangleMosaic.rehydrate(config))
  }, [debouncedState, triangleMosaic])
  useEffect(() => {
    const config = getConfigFromState({
      ...debouncedState,
      includeResolution: true
    })
    onUpdateTrianglesHtml(triangleMosaic.rehydrate(config))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedState.xResolution, debouncedState.yResolution, triangleMosaic])

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
            diagonals={state.diagonals}
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
        <footer>
          <div className='byLine'>
            <a
              href='https://github.com/bence-toth'
              target='_blank'
              rel='noopener noreferrer'
            >
              by Bence A. Tóth
            </a>
          </div>
          <div>
            <a
              href='https://github.com/bence-toth/triangle-mosaic#readme'
              target='_blank'
              rel='noopener noreferrer'
            >
              About
            </a>
            <a
              href='https://github.com/bence-toth/triangle-mosaic#license'
              target='_blank'
              rel='noopener noreferrer'
            >
              License
            </a>
            <a
              href='https://github.com/bence-toth/triangle-mosaic/issues'
              target='_blank'
              rel='noopener noreferrer'
            >
              Report a bug
            </a>
          </div>
        </footer>
      </aside>
      <div id='svgRoot'>
        <div
          id='output'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: trianglesHtml}}
        />
        <button
          type='button'
          id='downloadSvgButton'
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
