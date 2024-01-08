import { makeAutoObservable } from "mobx"
import { clamp } from "./utils"


export type Trims = 'elevator' | 'rudder'
const MARGIN = 0.25

export default class TrimManager {
  constructor() {
    makeAutoObservable(this)
  }

  state = {
    elevator: {
      min: -1,
      zero: 0,
      max: 1,
      invert: false
    },
    rudder: {
      min: -1,
      zero: 0,
      max: 1,
      invert: false
    },
    invertRudderElevator: false,
  }

  get myState() {return this.state}

  set myState(value) {this.state = value}

  setMin(which: Trims, min: number) {
    min = clamp(min, -1, this.state[which].zero - MARGIN)

    this.state[which].min = min
  }

  setMax(which: Trims, max: number) {
    max = clamp(max, this.state[which].zero + MARGIN, 1)

    this.state[which].max = max
  }

  setZero(which: Trims, zero=0) {
    const min = this.state[which].min
    const max = this.state[which].max
    zero = clamp(zero, min + MARGIN, max - MARGIN)

    this.state[which].zero = zero
  }

  setInverted(which: Trims, invert: boolean) {
    this.state[which].invert = Boolean(invert)
  }

  setInvertRudderElevator(invert: boolean) {
    this.state.invertRudderElevator = invert
  }

  computeMap(which: Trims, x: number) {
    x = clamp(x, -1, 1)
    const trim = this.state[which]
    if(trim.invert) x *= -1
    return x > 0 ? trim.zero + x * (trim.max - trim.zero) : trim.zero + x * (trim.zero - trim.min)
  }
}