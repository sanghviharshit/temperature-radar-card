export interface EntityConfig {
  entity: string;
  name?: string;
}

export interface TemperatureRadarCardConfig {
  type: string;
  entities: EntityConfig[];
  humidity_entities?: EntityConfig[];
  title?: string;
  units?: 'celsius' | 'fahrenheit';
  width?: string;
  height?: string;
  chart_color?: string;
  humidity_color?: string;
  colored_bullets?: boolean;
  show_values?: boolean;
  show_trends?: boolean;
  show_last_updated?: boolean;
  stale_threshold?: number;
  threshold_low?: number | null;
  threshold_high?: number | null;
  threshold_color?: string;
  min_value?: number | null;
  max_value?: number | null;
  rotate_chart?: boolean;
  rotate_speed?: number;
}

export interface ProcessedReading {
  room: string;
  temperature: number;
  color: string;
  unit_of_measurement: string;
}

export interface HumidityReading {
  room: string;
  humidity: number;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}
