import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TemperatureRadarCardConfig, HomeAssistant } from './types';

@customElement('temperature-radar-card-editor')
export class TemperatureRadarCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: TemperatureRadarCardConfig;
  private _helpers: any;

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this._loadHelpers();
  }

  private async _loadHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers?.();
  }

  setConfig(config: TemperatureRadarCardConfig): void {
    this._config = structuredClone(config);
  }

  private _fireChanged(): void {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _valueChanged(field: string, value: any): void {
    if (this._config[field as keyof TemperatureRadarCardConfig] === value) return;
    this._config = { ...this._config, [field]: value };
    this._fireChanged();
  }

  private _entityChanged(index: number, value: string): void {
    const entities = [...this._config.entities];
    entities[index] = { ...entities[index], entity: value };
    this._config = { ...this._config, entities };
    this._fireChanged();
  }

  private _entityNameChanged(index: number, value: string): void {
    const entities = [...this._config.entities];
    entities[index] = { ...entities[index], name: value };
    this._config = { ...this._config, entities };
    this._fireChanged();
  }

  private _humidityEntityChanged(index: number, value: string): void {
    const entities = [...(this._config.humidity_entities || [])];
    entities[index] = { ...entities[index], entity: value };
    this._config = { ...this._config, humidity_entities: entities };
    this._fireChanged();
  }

  private _addEntity(): void {
    const entities = [...this._config.entities, { entity: '' }];
    this._config = { ...this._config, entities };
    this._fireChanged();
  }

  private _removeEntity(index: number): void {
    const entities = this._config.entities.filter((_, i) => i !== index);
    this._config = { ...this._config, entities };
    this._fireChanged();
  }

  private _addHumidityEntity(): void {
    const entities = [...(this._config.humidity_entities || []), { entity: '' }];
    this._config = { ...this._config, humidity_entities: entities };
    this._fireChanged();
  }

  private _removeHumidityEntity(index: number): void {
    const entities = (this._config.humidity_entities || []).filter(
      (_, i) => i !== index
    );
    this._config = { ...this._config, humidity_entities: entities };
    this._fireChanged();
  }

  protected render() {
    if (!this._config || !this.hass) return html``;

    return html`
      <div class="editor">
        <div class="section">
          <h3>Temperature Entities</h3>
          ${this._config.entities.map(
            (entity, index) => html`
              <div class="entity-row">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${entity.entity}
                  .includeDomains=${['sensor']}
                  allow-custom-entity
                  @value-changed=${(e: CustomEvent) =>
                    this._entityChanged(index, e.detail.value)}
                ></ha-entity-picker>
                <ha-textfield
                  .value=${entity.name || ''}
                  placeholder="Display name"
                  @input=${(e: Event) =>
                    this._entityNameChanged(
                      index,
                      (e.target as HTMLInputElement).value
                    )}
                ></ha-textfield>
                <ha-icon-button
                  .path=${'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'}
                  @click=${() => this._removeEntity(index)}
                ></ha-icon-button>
              </div>
            `
          )}
          <mwc-button @click=${this._addEntity}>Add Temperature Entity</mwc-button>
        </div>

        <div class="section">
          <h3>Humidity Entities (optional)</h3>
          ${(this._config.humidity_entities || []).map(
            (entity, index) => html`
              <div class="entity-row">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${entity.entity}
                  .includeDomains=${['sensor']}
                  allow-custom-entity
                  @value-changed=${(e: CustomEvent) =>
                    this._humidityEntityChanged(index, e.detail.value)}
                ></ha-entity-picker>
                <ha-icon-button
                  .path=${'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'}
                  @click=${() => this._removeHumidityEntity(index)}
                ></ha-icon-button>
              </div>
            `
          )}
          <mwc-button @click=${this._addHumidityEntity}>Add Humidity Entity</mwc-button>
        </div>

        <div class="section">
          <h3>Display</h3>
          <ha-textfield
            label="Title"
            .value=${this._config.title || ''}
            @input=${(e: Event) =>
              this._valueChanged('title', (e.target as HTMLInputElement).value)}
          ></ha-textfield>

          <ha-select
            label="Units"
            .value=${this._config.units || 'celsius'}
            @selected=${(e: CustomEvent) => {
              const target = e.target as any;
              if (target.value) this._valueChanged('units', target.value);
            }}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="celsius">Celsius</mwc-list-item>
            <mwc-list-item value="fahrenheit">Fahrenheit</mwc-list-item>
          </ha-select>

          <div class="side-by-side">
            <ha-textfield
              label="Width"
              .value=${this._config.width || '300px'}
              @input=${(e: Event) =>
                this._valueChanged('width', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
            <ha-textfield
              label="Height"
              .value=${this._config.height || '300px'}
              @input=${(e: Event) =>
                this._valueChanged('height', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
          </div>

          <div class="side-by-side">
            <div>
              <label>Chart Color</label>
              <input
                type="color"
                .value=${this._config.chart_color || '#808080'}
                @input=${(e: Event) =>
                  this._valueChanged(
                    'chart_color',
                    (e.target as HTMLInputElement).value
                  )}
              />
            </div>
            <div>
              <label>Humidity Color</label>
              <input
                type="color"
                .value=${this._config.humidity_color || '#4488cc'}
                @input=${(e: Event) =>
                  this._valueChanged(
                    'humidity_color',
                    (e.target as HTMLInputElement).value
                  )}
              />
            </div>
          </div>

          <ha-formfield label="Colored bullets">
            <ha-switch
              .checked=${this._config.colored_bullets || false}
              @change=${(e: Event) =>
                this._valueChanged(
                  'colored_bullets',
                  (e.target as HTMLInputElement).checked
                )}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="Show values on labels">
            <ha-switch
              .checked=${this._config.show_values !== false}
              @change=${(e: Event) =>
                this._valueChanged(
                  'show_values',
                  (e.target as HTMLInputElement).checked
                )}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="Show last updated">
            <ha-switch
              .checked=${this._config.show_last_updated !== false}
              @change=${(e: Event) =>
                this._valueChanged(
                  'show_last_updated',
                  (e.target as HTMLInputElement).checked
                )}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="Rotate chart">
            <ha-switch
              .checked=${this._config.rotate_chart || false}
              @change=${(e: Event) =>
                this._valueChanged(
                  'rotate_chart',
                  (e.target as HTMLInputElement).checked
                )}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="section">
          <h3>Thresholds</h3>
          <div class="side-by-side">
            <ha-textfield
              label="Low threshold"
              type="number"
              .value=${String(this._config.threshold_low ?? '')}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                this._valueChanged('threshold_low', v === '' ? null : parseFloat(v));
              }}
            ></ha-textfield>
            <ha-textfield
              label="High threshold"
              type="number"
              .value=${String(this._config.threshold_high ?? '')}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                this._valueChanged(
                  'threshold_high',
                  v === '' ? null : parseFloat(v)
                );
              }}
            ></ha-textfield>
          </div>
          <div>
            <label>Threshold Color</label>
            <input
              type="color"
              .value=${this._config.threshold_color || '#ff4444'}
              @input=${(e: Event) =>
                this._valueChanged(
                  'threshold_color',
                  (e.target as HTMLInputElement).value
                )}
            />
          </div>
          <ha-textfield
            label="Stale threshold (minutes)"
            type="number"
            .value=${String(this._config.stale_threshold ?? 10)}
            @input=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._valueChanged(
                'stale_threshold',
                v === '' ? 10 : parseFloat(v)
              );
            }}
          ></ha-textfield>
        </div>

        <div class="section">
          <h3>Axis Range</h3>
          <p class="helper-text">Set fixed min/max for the Y axis. Leave empty for auto-scaling.</p>
          <div class="side-by-side">
            <ha-textfield
              label="Min value"
              type="number"
              .value=${String(this._config.min_value ?? '')}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                this._valueChanged('min_value', v === '' ? null : parseFloat(v));
              }}
            ></ha-textfield>
            <ha-textfield
              label="Max value"
              type="number"
              .value=${String(this._config.max_value ?? '')}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                this._valueChanged('max_value', v === '' ? null : parseFloat(v));
              }}
            ></ha-textfield>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor {
      padding: 16px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section h3 {
      margin: 0 0 12px;
      font-size: 1em;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .entity-row ha-entity-picker {
      flex: 2;
    }
    .entity-row ha-textfield {
      flex: 1;
    }
    .side-by-side {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
    }
    .side-by-side > * {
      flex: 1;
    }
    ha-textfield,
    ha-select {
      display: block;
      margin-bottom: 8px;
    }
    ha-formfield {
      display: block;
      margin-bottom: 4px;
    }
    mwc-button {
      margin-top: 8px;
    }
    .helper-text {
      margin: 0 0 8px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    input[type='color'] {
      width: 48px;
      height: 32px;
      border: none;
      cursor: pointer;
    }
  `;
}
