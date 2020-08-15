import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app/app'
import {unregister} from './serviceWorker'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below, then remove the line that reads
// `"!src/serviceWorker.js",` in the `package.json` file
// at `jest.collectCoverageFrom`.
//
// Note this comes with some pitfalls.
//
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister()
