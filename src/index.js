import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import redditApp from './reducers'
import App from './containers/App'

import './css/app.scss'

const loggerMiddleware = createLogger()

const store = createStore(
  redditApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
