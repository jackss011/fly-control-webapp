import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui/App.tsx'
import './index.css'
import './controls/gamepad.ts'
import DeviceManager from './controls/device.ts'
import TrimManager from './controls/config.ts'
import { autorun } from 'mobx'


export const deviceManager = new DeviceManager()
export const trimManager = new TrimManager()

window.addEventListener('load', () => {
  const configString = localStorage.getItem('config')
  if(!configString) return

  const config = JSON.parse(configString)
  console.log("cached config:", config)

  trimManager.myState = config
})

autorun(() => {
  localStorage.setItem('config', JSON.stringify(trimManager.myState))
}, {delay: 100})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
