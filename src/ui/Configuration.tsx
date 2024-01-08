import { observer } from "mobx-react-lite";
import { trimManager } from "../main";
import Trim from "./Trim";


function Configuration() {
  return (<div>
    <h1 className="text-3xl mt-6 mb-2">Configuration</h1>
    <label>
      <input
        className="mr-2"
        type="checkbox"
        checked={trimManager.state.invertRudderElevator}
        onChange={e => trimManager.setInvertRudderElevator(Boolean(e.target.checked))}
      />
      Invert Rudder Elevator Channels
    </label>
    
    <Trim which="elevator"/>
    <Trim which="rudder"/>


  </div>)
}

export default observer(Configuration)