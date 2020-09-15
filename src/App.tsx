import React, { ReactElement } from 'react'
import ReactNotification from 'react-notifications-component'
import Routes from './routes'

import 'react-notifications-component/dist/theme.css'
import './assets/styles/global.css'

function App(): ReactElement {
  return (
    <>
      <ReactNotification />
      <Routes />
    </>
  )
}

export default App
