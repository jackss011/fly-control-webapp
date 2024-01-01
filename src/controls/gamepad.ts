import { deviceManager } from "../main";

const INTERVAL_HZ = 20

let connected: string | false = false
let gamepadIndex: number = -1
let interval: number | undefined = undefined


window.addEventListener("gamepadconnected", (e) => {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length,
  );
        
  if(!connected) {
    connected = e.gamepad.id
    gamepadIndex = e.gamepad.index
    interval = setInterval(() => controlLoop(), 1000/INTERVAL_HZ)
  }

});


window.addEventListener("gamepaddisconnected", (e) => {
  console.log(
    "Gamepad disconnected from index %d: %s",
    e.gamepad.index,
    e.gamepad.id,
  );

  if(connected && e.gamepad.id === connected) {
    gamepadIndex = -1
    connected = false

    clearInterval(interval)
    interval = undefined
  }
});


function getGamepad() {
  return navigator.getGamepads()[gamepadIndex]
}


function controlLoop() {
  const gamepad = getGamepad()
  if(!gamepad) return
  
  // const testValue = gamepad.axes[0]
  const motor = gamepad.buttons[7].value
  const elevator = 1 * gamepad.axes[0] / 2 + 0.5
  const rudder = -1 * gamepad.axes[1] / 2 + 0.5

  const channels = [motor, elevator, rudder, 0]
  console.log(channels)

  deviceManager.sendChannels(channels)
}