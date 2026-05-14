# Temperature Radar Card

A custom Home Assistant Lovelace card that displays temperature data from multiple rooms as a radar (spider) chart using amCharts 5.

![Temperature Radar Card](https://raw.githubusercontent.com/sanghviharshit/temperature-radar-card/main/screenshots/preview.png)

## Features

- Radar/spider chart showing temperatures from multiple sensors
- Optional humidity overlay with separate Y axis (0-100%)
- Temperature unit conversion (Celsius/Fahrenheit)
- Color-coded data points based on temperature (blue to red gradient)
- Threshold highlighting for out-of-range temperatures
- Trend indicators (up/down arrows) when temperature changes
- "Last updated" timestamp with stale data warning
- Optional chart rotation animation
- Visual card editor with entity pickers
- HACS compatible

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to Frontend > Custom repositories
3. Add `https://github.com/sanghviharshit/temperature-radar-card` as a Lovelace category
4. Click Install
5. Restart Home Assistant

### Manual

1. Download `temperature-radar-card.js` from the [latest release](https://github.com/sanghviharshit/temperature-radar-card/releases)
2. Copy it to `config/www/temperature-radar-card.js`
3. Add the resource in Home Assistant:
   - Go to Settings > Dashboards > Resources
   - Add `/local/temperature-radar-card.js` as JavaScript Module
4. Refresh your browser

## Configuration

### Minimal

```yaml
type: custom:temperature-radar-card
entities:
  - entity: sensor.living_room_temperature
  - entity: sensor.bedroom_temperature
  - entity: sensor.kitchen_temperature
```

### Full Example

```yaml
type: custom:temperature-radar-card
title: Home Temperatures
entities:
  - entity: sensor.living_room_temperature
    name: Living Room
  - entity: sensor.bedroom_temperature
    name: Bedroom
  - entity: sensor.kitchen_temperature
    name: Kitchen
  - entity: sensor.bathroom_temperature
    name: Bathroom
  - entity: sensor.office_temperature
    name: Office
  - entity: sensor.outdoor_temperature
    name: Outdoor
humidity_entities:
  - entity: sensor.living_room_humidity
    name: Living Room
  - entity: sensor.bedroom_humidity
    name: Bedroom
units: celsius
width: "350px"
height: "350px"
chart_color: "#808080"
humidity_color: "#4488cc"
colored_bullets: true
show_values: true
show_trends: true
show_last_updated: true
stale_threshold: 10
threshold_low: 18
threshold_high: 26
threshold_color: "#ff4444"
rotate_chart: false
rotate_speed: 60
min_value: null
max_value: null
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entities` | array | **required** | Temperature sensor entities |
| `humidity_entities` | array | `[]` | Humidity sensor entities |
| `title` | string | none | Card title |
| `units` | string | `celsius` | `celsius` or `fahrenheit` |
| `width` | string | `300px` | Chart width |
| `height` | string | `300px` | Chart height |
| `chart_color` | string | `#808080` | Series line and fill color |
| `humidity_color` | string | `#4488cc` | Humidity series color |
| `colored_bullets` | boolean | `false` | Color data points by temperature |
| `show_values` | boolean | `true` | Show temperature values on labels |
| `show_trends` | boolean | `true` | Show trend arrows when temperature changes |
| `show_last_updated` | boolean | `true` | Show "Updated X min ago" below chart |
| `stale_threshold` | number | `10` | Minutes before data is considered stale |
| `threshold_low` | number | `null` | Temperatures below this are highlighted |
| `threshold_high` | number | `null` | Temperatures above this are highlighted |
| `threshold_color` | string | `#ff4444` | Color for out-of-range data points |
| `min_value` | number | `null` | Fixed Y axis minimum (auto if null) |
| `max_value` | number | `null` | Fixed Y axis maximum (auto if null) |
| `rotate_chart` | boolean | `false` | Slowly rotate the radar chart |
| `rotate_speed` | number | `60` | Seconds per full rotation |

### Entity Configuration

Each entity in `entities` and `humidity_entities` accepts:

| Field | Type | Description |
|-------|------|-------------|
| `entity` | string | **Required.** Home Assistant entity ID |
| `name` | string | Display name override (defaults to friendly_name) |

## Development

```bash
git clone https://github.com/sanghviharshit/temperature-radar-card.git
cd temperature-radar-card
npm install
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

## License

MIT
