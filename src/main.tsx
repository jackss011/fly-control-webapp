import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './controls/gamepad.ts'
import DeviceManager from './controls/device.ts'


export const deviceManager: DeviceManager = new DeviceManager()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
