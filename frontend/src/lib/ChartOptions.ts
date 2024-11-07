import dayjs from "dayjs";
import { Interaction, TooltipModel } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';

(Interaction.modes as any).myCustomMode = function(chart: any, e: any) {
  const position = getRelativePosition(e, chart);

  const items: any[] = [];
  Interaction.evaluateInteractionItems(chart, 'x', position, (element, datasetIndex, index) => {
    const xDistanceFromPoint = Math.abs(position.x - element.x);
    const yDistanceFromPoint = Math.abs(position.y - element.y);
    if (yDistanceFromPoint < 30 && xDistanceFromPoint < 30) {
      items.push({element, datasetIndex, index});
    }
  });
  return items;
};

export function createChartOptions(chartPoints: any[], pointRadius: number[], onTooltipFn: any) {
  return {
    type: 'line',
    data: {
      datasets: [
        {
          data: chartPoints,
          borderColor: '#63298E',
          borderWidth: 4,
          pointBorderColor: 'white',
          pointBorderWidth: 1,
          pointBackgroundColor: '#63298E',
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#9325E4',
          pointRadius: pointRadius,
          lineTension: 1
        },
      ]
    },
    options: {
      plugins: {
        tooltip: {
          backgroundColor: 'white',
          borderColor: '#979797',
          bodyColor: '#4C4C4C',
          titleColor: 'black',
          displayColors: false,
          borderWidth: 1,
          caretSize: 10,
          enabled: false,
          external: (context: any) => onTooltipFn(context.tooltip as TooltipModel<any>),
        }
      },
      interaction: {
        mode: 'myCustomMode',
        intersect: false,
      },
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 25,
          right: 25,
          top: 0,
          bottom: 0,
        }
      },
      scales: {
        x: {
          display: false,
          type: 'time',
          time: {
            unit: 'day'
          },
          min: dayjs('2010-08-17').valueOf(),
          max: dayjs('2024-12-31').valueOf(),
        },
        y: {
          display: false,
          min: 0,
          max: 100_000,
        }
      },
      clip: false,
    },
  };
}