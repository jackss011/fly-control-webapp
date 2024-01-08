import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui/App.tsx'
import './index.css'
import './controls/gamepad.ts'
import DeviceManager from './controls/device.ts'
import TrimManager from './controls/config.ts'


export const deviceManager = new DeviceManager()
export const trimManager = new TrimManager()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
