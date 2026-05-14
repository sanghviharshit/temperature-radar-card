export function getTemperatureColor(temp: number, units: string): string {
  let celsius = temp;
  if (units === 'fahrenheit') {
    celsius = ((temp - 32) * 5) / 9;
  }

  const t = Math.max(0, Math.min(40, celsius)) / 40;

  let r: number, g: number, b: number;
  if (t < 0.25) {
    const p = t / 0.25;
    r = 0;
    g = Math.round(180 * p);
    b = Math.round(255 * (1 - p * 0.3));
  } else if (t < 0.5) {
    const p = (t - 0.25) / 0.25;
    r = 0;
    g = Math.round(180 + 75 * p);
    b = Math.round(178 * (1 - p));
  } else if (t < 0.75) {
    const p = (t - 0.5) / 0.25;
    r = Math.round(255 * p);
    g = 255;
    b = 0;
  } else {
    const p = (t - 0.75) / 0.25;
    r = 255;
    g = Math.round(255 * (1 - p));
    b = 0;
  }

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
