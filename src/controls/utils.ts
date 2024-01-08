
export function floatToUint16InRange(floatValue: number, minValue: number, maxValue: number): number {
  if (minValue >= maxValue) {
    throw new Error('Invalid range: minValue should be less than maxValue');
  }

  const scaledValue: number = ((floatValue - minValue) / (maxValue - minValue)) * 65535;
  const clampedValue: number = Math.max(0, Math.min(Math.round(scaledValue), 65535));

  return clampedValue;
}


export function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(max, x))
}

