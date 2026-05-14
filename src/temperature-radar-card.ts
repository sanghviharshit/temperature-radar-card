import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  TemperatureRadarCardConfig,
  HomeAssistant,
  ProcessedReading,
  HumidityReading,
} from './types';
import { DEFAULT_CONFIG, CARD_VERSION } from './const';
import { convertTemperature, formatTimeSince, getUnitFromState } from './utils';
import { getTemperatureColor } from './colors';
import { RadarChartManager, loadAmCharts } from './chart';
import './editor';

console.info(
  `%c TEMPERATURE-RADAR-CARD %c v${CARD_VERSION} `,
  'color: white; background: #555; font-weight: bold;',
  'color: white; background: #007acc; font-weight: bold;'
);

@customElement('temperature-radar-card')
export class TemperatureRadarCard extends LitElement {
  @state() private _config!: TemperatureRadarCardConfig;
  @state() private _error: string | null = null;

  private _hass?: HomeAssistant;
  private _chartManager: RadarChartManager | null = null;
  private _previousTemperatures: Map<string, number> = new Map();
  private _previousStates: Map<string, string> = new Map();
  private _lastUpdated: Date | null = null;
  private _timestampInterval: ReturnType<typeof setInterval> | null = null;
  private _chartReady = false;

  static getConfigElement() {
    return document.createElement('temperature-radar-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const temperatureEntities = Object.keys(hass.states).filter(
      (eid) =>
        eid.startsWith('sensor.') &&
        hass.states[eid].attributes.unit_of_measurement &&
        ['°C', '°F'].includes(
          hass.states[eid].attributes.unit_of_measurement as string
        )
    );
    const entities = temperatureEntities.slice(0, 4).map((eid) => ({
      entity: eid,
    }));
    return { entities: entities.length > 0 ? entities : [{ entity: '' }] };
  }

  getCardSize(): number {
    const height = parseInt(this._config?.height || '300', 10);
    return Math.ceil(height / 50) + 1;
  }

  getGridOptions() {
    return {
      rows: this.getCardSize(),
      min_rows: 3,
      columns: 4,
      min_columns: 2,
    };
  }

  set hass(hass: HomeAssistant) {
    const oldHass = this._hass;
    this._hass = hass;

    if (!this._chartReady) return;
    if (!this._hasRelevantStateChange(oldHass, hass)) return;

    this._processStates();
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  setConfig(config: TemperatureRadarCardConfig): void {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('Please define at least one entity');
    }
    for (const e of config.entities) {
      if (!e.entity) {
        throw new Error('Each entity must have an "entity" field');
      }
    }
    if (config.humidity_entities) {
      if (!Array.isArray(config.humidity_entities)) {
        throw new Error('"humidity_entities" must be an array');
      }
      for (const e of config.humidity_entities) {
        if (!e.entity) {
          throw new Error('Each humidity entity must have an "entity" field');
        }
      }
    }
    const oldConfig = this._config;
    this._config = structuredClone({ ...DEFAULT_CONFIG, ...config }) as TemperatureRadarCardConfig;

    if (oldConfig && this._chartReady) {
      const needsRebuild =
        oldConfig.units !== this._config.units ||
        oldConfig.chart_color !== this._config.chart_color ||
        oldConfig.humidity_color !== this._config.humidity_color ||
        oldConfig.min_value !== this._config.min_value ||
        oldConfig.max_value !== this._config.max_value ||
        oldConfig.colored_bullets !== this._config.colored_bullets ||
        oldConfig.threshold_low !== this._config.threshold_low ||
        oldConfig.threshold_high !== this._config.threshold_high ||
        oldConfig.rotate_chart !== this._config.rotate_chart ||
        JSON.stringify(oldConfig.entities) !== JSON.stringify(this._config.entities) ||
        JSON.stringify(oldConfig.humidity_entities) !== JSON.stringify(this._config.humidity_entities);

      if (needsRebuild) {
        this._chartReady = false;
        this._previousStates.clear();
        this.requestUpdate();
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._loadPreviousTemperatures();
    this._timestampInterval = setInterval(() => {
      this._updateTimestamp();
    }, 60000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timestampInterval) {
      clearInterval(this._timestampInterval);
      this._timestampInterval = null;
    }
    if (this._chartManager) {
      this._chartManager.dispose();
      this._chartManager = null;
      this._chartReady = false;
    }
  }

  private _storageKey(): string {
    const entityIds = this._config.entities.map((e) => e.entity).join(',');
    return `temperature-radar-card:${entityIds}`;
  }

  private _loadPreviousTemperatures(): void {
    try {
      const stored = localStorage.getItem(this._storageKey());
      if (stored) {
        const data = JSON.parse(stored) as Record<string, number>;
        for (const [key, value] of Object.entries(data)) {
          this._previousTemperatures.set(key, value);
        }
      }
    } catch {
      // ignore parse errors
    }
  }

  private _savePreviousTemperatures(): void {
    try {
      const data: Record<string, number> = {};
      for (const [key, value] of this._previousTemperatures) {
        data[key] = value;
      }
      localStorage.setItem(this._storageKey(), JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config') || changedProps.has('_error')) return true;
    return false;
  }

  protected firstUpdated(_changedProps: PropertyValues): void {
    this._initChart();
  }

  protected updated(changedProps: PropertyValues): void {
    if (changedProps.has('_config') && !this._chartReady) {
      this._initChart();
    }
  }

  private async _initChart(): Promise<void> {
    try {
      await loadAmCharts();
      const container = this.shadowRoot?.getElementById('chart-container');
      if (!container) return;
      this._chartManager = new RadarChartManager(this._config);
      this._chartManager.create(container);
      this._chartReady = true;
      if (this._hass) {
        this._processStates();
      }
    } catch (e: any) {
      this._error = `Failed to load chart library: ${e.message}`;
    }
  }

  private _hasRelevantStateChange(
    oldHass: HomeAssistant | undefined,
    newHass: HomeAssistant
  ): boolean {
    if (!oldHass) return true;
    const allEntities = [
      ...this._config.entities,
      ...(this._config.humidity_entities || []),
    ];
    for (const e of allEntities) {
      const oldState = oldHass.states[e.entity];
      const newState = newHass.states[e.entity];
      if (!oldState && newState) return true;
      if (oldState && newState && oldState.state !== newState.state) return true;
    }
    return false;
  }

  private _processStates(): void {
    if (!this._hass) return;

    const toUnit = this._config.units === 'fahrenheit' ? '°F' : '°C';
    const unitSuffix = this._config.units === 'fahrenheit' ? '°F' : '°C';

    const temps: ProcessedReading[] = [];
    for (const entityCfg of this._config.entities) {
      const stateObj = this._hass.states[entityCfg.entity];
      if (!stateObj || stateObj.state === 'unavailable' || stateObj.state === 'unknown') {
        continue;
      }
      const rawValue = parseFloat(stateObj.state);
      if (isNaN(rawValue)) continue;

      const fromUnit = getUnitFromState(stateObj.attributes);
      const converted = convertTemperature(rawValue, fromUnit, toUnit);
      const roomName =
        entityCfg.name ||
        (stateObj.attributes.friendly_name as string) ||
        entityCfg.entity;

      let label = roomName;
      if (this._config.show_values) {
        let valueStr = `${Math.round(converted * 10) / 10}${unitSuffix}`;
        if (this._config.show_trends) {
          const prev = this._previousTemperatures.get(entityCfg.entity);
          if (prev !== undefined) {
            const diff = converted - prev;
            if (diff > 0.1) valueStr += ' ▲';
            else if (diff < -0.1) valueStr += ' ▼';
          }
        }
        label += '\n' + valueStr;
      }

      temps.push({
        room: label,
        temperature: converted,
        color: getTemperatureColor(converted, this._config.units || 'celsius'),
        unit_of_measurement: toUnit,
      });

      this._previousTemperatures.set(entityCfg.entity, converted);
      this._previousStates.set(entityCfg.entity, stateObj.state);
    }

    let humidity: HumidityReading[] | undefined;
    if (this._config.humidity_entities && this._config.humidity_entities.length > 0) {
      humidity = [];
      for (const entityCfg of this._config.humidity_entities) {
        const stateObj = this._hass.states[entityCfg.entity];
        if (!stateObj || stateObj.state === 'unavailable' || stateObj.state === 'unknown') {
          continue;
        }
        const value = parseFloat(stateObj.state);
        if (isNaN(value)) continue;
        const roomName =
          entityCfg.name ||
          (stateObj.attributes.friendly_name as string) ||
          entityCfg.entity;

        const matchingTemp = temps.find((t) => t.room.startsWith(roomName));
        humidity.push({
          room: matchingTemp ? matchingTemp.room : roomName,
          humidity: value,
        });

        this._previousStates.set(entityCfg.entity, stateObj.state);
      }
    }

    if (temps.length > 0) {
      this._lastUpdated = new Date();
      this._chartManager?.updateData(temps, humidity);
      this._updateTimestamp();
      this._savePreviousTemperatures();
    }
  }

  private _updateTimestamp(): void {
    if (!this._config.show_last_updated || !this._lastUpdated) return;
    const el = this.shadowRoot?.getElementById('updated-label');
    if (!el) return;
    el.textContent = `Updated ${formatTimeSince(this._lastUpdated)}`;
    const ageMinutes = (Date.now() - this._lastUpdated.getTime()) / 60000;
    const staleThreshold = this._config.stale_threshold || 10;
    if (ageMinutes > staleThreshold) {
      el.classList.add('stale');
    } else {
      el.classList.remove('stale');
    }
  }

  protected render() {
    if (this._error) {
      return html`<ha-card>
        <div class="error">${this._error}</div>
      </ha-card>`;
    }

    if (!this._config) {
      return html``;
    }

    const width =
      typeof this._config.width === 'number'
        ? `${this._config.width}px`
        : this._config.width || '300px';
    const height =
      typeof this._config.height === 'number'
        ? `${this._config.height}px`
        : this._config.height || '300px';

    return html`
      <ha-card .header=${this._config.title || ''}>
        <div class="card-content">
          <div
            id="chart-container"
            style="width:${width};height:${height};margin:0 auto;"
          ></div>
          ${this._config.show_last_updated
            ? html`<div id="updated-label" class="updated-label"></div>`
            : ''}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .card-content {
      padding: 16px;
    }
    .updated-label {
      text-align: center;
      font-size: 0.8em;
      color: var(--secondary-text-color, #888);
      margin-top: 8px;
    }
    .updated-label.stale {
      color: var(--warning-color, #ff8800);
    }
    .error {
      padding: 16px;
      color: var(--error-color, #db4437);
    }
  `;
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'temperature-radar-card',
  name: 'Temperature Radar Card',
  description: 'Multi-room temperature radar/spider chart using amCharts 5',
  preview: true,
  documentationURL: 'https://github.com/sanghviharshit/temperature-radar-card',
});
