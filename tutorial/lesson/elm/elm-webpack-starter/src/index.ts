import { Chart } from 'chart.js';
import { Elm } from './Main'; //  eslint-disable-line import/no-unresolved
require('./styles.scss'); // tslint:disable-line no-var-requires

const firstValue = 6;
const mountNode: HTMLElement = document.getElementById('main')!;
const app = Elm.Main.init({  node:mountNode, flags: firstValue });

// Use ES2015 syntax and let Babel compile it for you
// eslint-disable-next-line no-unused-vars
const testFn = (inp: number) => {
  const a = inp + 1;
  return a;
};

let chart: Chart | null = null;

app.ports.initialize.subscribe(() => {
  const $canvas: JQuery<HTMLElement> = $('.my-chart');
  const canvas = $canvas[0]! as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        data: [firstValue],
      }],
      labels: ['0'],
    },
  });
});
app.ports.toJs.subscribe((data: number) => {
  if (chart === null) {
    return;
  }
  const chartData = chart.data;
  const dataSets =  chartData.datasets!;
  const labels = chartData.labels!;

  dataSets.forEach((dataset: Chart.ChartDataSets) => {
    const datasetData = dataset.data! as number[];
    labels.push(datasetData.length.toString());
    datasetData.push(data);

  });
  chart.update();
});
