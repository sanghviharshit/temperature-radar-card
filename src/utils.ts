export function convertTemperature(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (!fromUnit || !toUnit || fromUnit === toUnit) return value;
  if (fromUnit === '°C' && toUnit === '°F') return (value * 9) / 5 + 32;
  if (fromUnit === '°F' && toUnit === '°C') return ((value - 32) * 5) / 9;
  return value;
}

export function formatTimeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ago`;
}

export function getUnitFromState(attributes: Record<string, unknown>): string {
  return (attributes.unit_of_measurement as string) || '°C';
}
