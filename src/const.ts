import { TemperatureRadarCardConfig } from './types';

export const CARD_VERSION = '1.0.0';

export const AMCHARTS_CDN = 'https://cdn.amcharts.com/lib/5';

export const AMCHARTS_SCRIPTS = [
  `${AMCHARTS_CDN}/index.js`,
  `${AMCHARTS_CDN}/xy.js`,
  `${AMCHARTS_CDN}/radar.js`,
  `${AMCHARTS_CDN}/themes/Animated.js`,
];

export const DEFAULT_CONFIG: Partial<TemperatureRadarCardConfig> = {
  units: 'celsius',
  width: '300px',
  height: '300px',
  chart_color: '#808080',
  humidity_color: '#4488cc',
  colored_bullets: false,
  show_values: true,
  show_trends: true,
  show_last_updated: true,
  stale_threshold: 10,
  threshold_low: null,
  threshold_high: null,
  threshold_color: '#ff4444',
  min_value: null,
  max_value: null,
  rotate_chart: false,
  rotate_speed: 60,
};
