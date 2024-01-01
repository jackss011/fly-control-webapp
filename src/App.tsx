import { observer } from "mobx-react-lite"
import { deviceManager } from "./main"

function App() {
  const connected = deviceManager.connected
  const deviceName = deviceManager.deviceName
  const reconnecting = deviceManager.reconnecting

  return (
    <>
      <button onClick={() => deviceManager.connectPrompt()}>Connect</button>
      {connected && <h1 className="text-white">{deviceName}</h1>}
      {reconnecting && <h1>Reconnecting...</h1>}
    </>
  )
}

export default observer(App)
