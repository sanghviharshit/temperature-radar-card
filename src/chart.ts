import { TemperatureRadarCardConfig, ProcessedReading, HumidityReading } from './types';
import { AMCHARTS_SCRIPTS } from './const';

declare const am5: any;
declare const am5xy: any;
declare const am5radar: any;
declare const am5themes_Animated: any;

let amchartsLoadPromise: Promise<void> | null = null;

export function loadAmCharts(): Promise<void> {
  if ((window as any).am5) return Promise.resolve();
  if (amchartsLoadPromise) return amchartsLoadPromise;

  amchartsLoadPromise = AMCHARTS_SCRIPTS.reduce(
    (chain, src) =>
      chain.then(
        () =>
          new Promise<void>((resolve, reject) => {
            const existing = document.querySelector(
              `script[src="${src}"]`
            ) as HTMLScriptElement | null;
            if (existing) {
              if (existing.dataset.loaded === 'true') {
                resolve();
              } else {
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', () =>
                  reject(new Error(`Failed to load ${src}`))
                );
              }
              return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
              script.dataset.loaded = 'true';
              resolve();
            };
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(script);
          })
      ),
    Promise.resolve()
  );

  return amchartsLoadPromise;
}

export class RadarChartManager {
  private root: any = null;
  private chart: any = null;
  private xAxis: any = null;
  private series: any = null;
  private humiditySeries: any = null;
  private config: TemperatureRadarCardConfig;

  constructor(config: TemperatureRadarCardConfig) {
    this.config = config;
  }

  create(container: HTMLElement): void {
    if (this.root) {
      this.dispose();
    }

    this.root = am5.Root.new(container);
    this.root._logo.dispose();
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    this.chart = this.root.container.children.push(
      am5radar.RadarChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
      })
    );

    const xRenderer = am5radar.AxisRendererCircular.new(this.root, {
      minGridDistance: 0,
    });
    xRenderer.grid.template.setAll({
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.5,
      strokeWidth: 1,
    });
    xRenderer.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: '0.8em',
      radius: 10,
    });

    this.xAxis = this.chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        maxDeviation: 0,
        categoryField: 'room',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(this.root, {}),
      })
    );

    const yRenderer = am5radar.AxisRendererRadial.new(this.root, {
      minGridDistance: 20,
    });
    yRenderer.grid.template.setAll({
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.5,
      strokeWidth: 1,
    });
    yRenderer.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: '0.6em',
    });

    const yAxisConfig: any = {
      renderer: yRenderer,
      numberFormat:
        this.config.units === 'fahrenheit' ? "#'°F'" : "#'°C'",
    };
    if (this.config.min_value != null) yAxisConfig.min = this.config.min_value;
    if (this.config.max_value != null) yAxisConfig.max = this.config.max_value;
    if (this.config.min_value != null || this.config.max_value != null) {
      yAxisConfig.strictMinMax = true;
    }

    this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, yAxisConfig));

    const chartColor = this.config.chart_color || '#808080';

    this.series = this.chart.series.push(
      am5radar.RadarLineSeries.new(this.root, {
        name: 'Temperature',
        xAxis: this.xAxis,
        yAxis: this.chart.yAxes.getIndex(0),
        valueYField: 'temperature',
        categoryXField: 'room',
        stroke: am5.color(chartColor),
        tooltip: am5.Tooltip.new(this.root, {
          labelText:
            '{valueY}' + (this.config.units === 'fahrenheit' ? '°F' : '°C'),
        }),
      })
    );

    this.series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(chartColor),
      strokeOpacity: 0.8,
    });

    this.series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
      fill: am5.color(chartColor),
    });

    const hasThresholds =
      this.config.threshold_low != null || this.config.threshold_high != null;
    if (hasThresholds || this.config.colored_bullets) {
      const self = this;
      this.series.bullets.push(function (root: any, _series: any, dataItem: any) {
        const temp = dataItem.dataContext.temperature;
        let outOfRange = false;
        if (self.config.threshold_low != null && temp < self.config.threshold_low)
          outOfRange = true;
        if (self.config.threshold_high != null && temp > self.config.threshold_high)
          outOfRange = true;
        const color = outOfRange
          ? self.config.threshold_color || '#ff4444'
          : self.config.colored_bullets && dataItem.dataContext.color
            ? dataItem.dataContext.color
            : chartColor;
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: outOfRange ? 7 : 4,
            fill: am5.color(color),
          }),
        });
      });
    }

    if (
      (this.config.humidity_entities && this.config.humidity_entities.length > 0)
    ) {
      const humidityColor = this.config.humidity_color || '#4488cc';

      const humidityYRenderer = am5radar.AxisRendererRadial.new(this.root, {
        minGridDistance: 20,
      });
      humidityYRenderer.grid.template.setAll({ visible: false });
      humidityYRenderer.labels.template.setAll({ visible: false });

      this.chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          renderer: humidityYRenderer,
          min: 0,
          max: 100,
          strictMinMax: true,
        })
      );

      this.humiditySeries = this.chart.series.push(
        am5radar.RadarLineSeries.new(this.root, {
          name: 'Humidity',
          xAxis: this.xAxis,
          yAxis: this.chart.yAxes.getIndex(1),
          valueYField: 'humidity',
          categoryXField: 'room',
          stroke: am5.color(humidityColor),
          tooltip: am5.Tooltip.new(this.root, {
            labelText: '{valueY}%',
          }),
        })
      );

      this.humiditySeries.strokes.template.setAll({
        strokeWidth: 2,
        stroke: am5.color(humidityColor),
        strokeOpacity: 0.8,
        strokeDasharray: [4, 4],
      });

      this.humiditySeries.fills.template.setAll({
        visible: false,
      });
    }

    if (this.config.rotate_chart) {
      const chart = this.chart;
      const speed = this.config.rotate_speed || 60;
      const startTime = Date.now();
      this.root.events.on('frameended', function () {
        const elapsed = (Date.now() - startTime) / 1000;
        const angle = ((elapsed / speed) * 360) % 360;
        chart.set('startAngle', 270 + angle);
        chart.set('endAngle', 270 + angle + 360);
      });
    }

    this.series.appear(1000);
    if (this.humiditySeries) this.humiditySeries.appear(1000);
    this.chart.appear(1000, 100);
  }

  updateData(temps: ProcessedReading[], humidity?: HumidityReading[]): void {
    if (!this.xAxis || !this.series) return;
    this.xAxis.data.setAll(temps);
    this.series.data.setAll(temps);
    if (this.humiditySeries && humidity && humidity.length > 0) {
      this.humiditySeries.data.setAll(humidity);
    }
  }

  dispose(): void {
    if (this.root) {
      this.root.dispose();
      this.root = null;
      this.chart = null;
      this.xAxis = null;
      this.series = null;
      this.humiditySeries = null;
    }
  }
}
