import { observer } from "mobx-react-lite"
import { deviceManager } from "../main"
import Configuration from "./Configuration"

function App() {
  const connected = deviceManager.connected
  const deviceName = deviceManager.deviceName
  const reconnecting = deviceManager.reconnecting

  return (
    <div className="py-3 px-4">
      <h1 className="text-3xl tracking-wide font-bold">Fly Control</h1>

      <div className="flex flex-row align-center gap-x-4 mt-6">
        <button
          className="bg-blue-600 px-4 py-2 rounded-lg font-bold text-lg tracking-wider uppercase hover:bg-opacity-80"
          onClick={() => deviceManager.connectPrompt()}
        >
          Connect
        </button>

        {connected && <h1 className="text-white text-lg">{deviceName}</h1>}
        {reconnecting && <h1>Reconnecting...</h1>}
      </div>
      
      <Configuration />
    </div>
  )
}

export default observer(App)
