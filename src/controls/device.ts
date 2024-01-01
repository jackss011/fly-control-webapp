import { makeAutoObservable, runInAction, action } from 'mobx'
import { floatToUint16InRange } from './utils'
// import { throttle } from 'throttle-debounce'

const RECONNECT_DELAY_SECONDS = 2
const SERVICE = 'a02fc000-4805-4130-9d84-75940381bed6'
const CHAR_CHANNELS = 'a02fc001-4805-4130-9d84-75940381bed6'




export default class DeviceManager {
  connected: boolean = false

  get deviceName() {
    return this.device?.name
  }

  reconnecting: boolean = false
  reconnectTimeoutId: number | undefined = undefined

  device: BluetoothDevice | null = null
  server: BluetoothRemoteGATTServer | null = null
  service: BluetoothRemoteGATTService | null = null

  channelsChar: BluetoothRemoteGATTCharacteristic | null = null


  constructor() {
    makeAutoObservable(this)
  }


  async connectPrompt() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE] }],
      })

      await this.connect(device)
    } catch {
      console.warn('closed connect prompt')
    }
  }

  async _attemptReconnect() {
    if (!this.connected && this.device) {
      console.log('Reconnect attempt...')

      try {
        runInAction(() => (this.reconnecting = true))
        // try to connect
        await this.connect(this.device)
        this._clearReconnect()
      } catch {
        // retry in 2 seconds
        this._clearReconnect()

        this.reconnectTimeoutId = setTimeout(
          () => this._attemptReconnect(),
          1000 * RECONNECT_DELAY_SECONDS,
        )
      }
    }
  }

  _clearReconnect() {
    runInAction(() => (this.reconnecting = false))
    clearTimeout(this.reconnectTimeoutId)
    this.reconnectTimeoutId = undefined
  }

  async connect(device: BluetoothDevice) {
    if (!device) return

    this.device = device
    this.server = await device.gatt!.connect()

    runInAction(() => {
      this.connected = true
      console.log('device connected:', device.name)
    })

    this.service = await this.server.getPrimaryService(SERVICE)
    this.channelsChar = await this.service.getCharacteristic(CHAR_CHANNELS)
    console.log('service + char obtained')
  

    device.addEventListener(
      'gattserverdisconnected',
      action(() => {
        console.log('device disconneted')

        this.connected = false
        this.channelsChar = null

        this._attemptReconnect()
      })
    )
  }

  sendChannels(floatValues: number[]) {
    if(!floatValues || !this.channelsChar) return

    const int16Values = floatValues.map(v => floatToUint16InRange(v, 0, 1))

    const data = (new Uint16Array(int16Values));
    this.channelsChar.writeValueWithoutResponse(data)
  }
}