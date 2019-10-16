import React from 'react'
import { render } from 'react-dom'
import Provider from './components/OnusElementsProvider'
import SetElement from './components/SetElement'
import GetElement from './components/GetElement'

render((
  <Provider>
    <header>
      <GetElement name='header' />
    </header>
    <footer>
      <SetElement name='header' priority={0}>
        <h1>Home</h1>
      </SetElement>
    </footer>
  </Provider>
), document.getElementById('root'))
