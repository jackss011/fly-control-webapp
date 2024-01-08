import { observer } from "mobx-react-lite";
import { trimManager } from "../main";


function Trim(props: {
  which: 'elevator' | 'rudder'
}) {
  const min = trimManager.state[props.which].min
  const zero = trimManager.state[props.which].zero
  const max = trimManager.state[props.which].max

  const onMin = (e: any) => trimManager.setMin(props.which, Number(e.target.value))
  const onZero = (e: any) => trimManager.setZero(props.which, Number(e.target.value))
  const onMax = (e: any) => trimManager.setMax(props.which, Number(e.target.value))

  const invert = trimManager.state[props.which].invert
  const onInvert = (e: any) => {
    trimManager.setInverted(props.which, Boolean(e.target.checked))
    // console.log(trimManager.myState)
  }
  

  return (
    <div className="flex flex-col gap-y-2 mt-4 px-4 max-w-96">
      <h2 className="text-xl -ml-4 capitalize text-gray-400 font-bold">{props.which}</h2>

      <label>
        ⬅️ Min [{min.toFixed(2)}]
        <br/>
        <input
          className="w-full"
          type="range"
          min={-1}
          max={1}
          step={0.1}
          value={min}
          onChange={onMin}
        />
      </label>

      <label>
        0️⃣ Zero [{zero.toFixed(2)}]
        <br/>
        <input
          className="w-full"
          min={-1}
          max={1}
          step={0.1}
          type="range"
          value={zero}
          onChange={onZero}
        />
      </label>

      <label>
        ➡️ Max [{max.toFixed(2)}]
        <br/>
        <input
          className="w-full"
          min={-1}
          max={1}
          step={0.1}
          type="range"
          value={max}
          onChange={onMax}
        />
      </label>

      <label className="flex flex-row justify-between">
        <span>🔀 Invert [{String(invert)}]</span>
        <input
          className="ml-2"
          type="checkbox"
          checked={invert}
          onChange={onInvert}
        />
      </label>

  </div>)
}

export default observer(Trim)