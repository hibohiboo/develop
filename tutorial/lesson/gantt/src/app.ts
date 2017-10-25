import Gantt from './gantt';

const config = {
  height: 500,
  width: 900,
  rows: ['car1', 'car2', 'car3', 'car4'],
  col: 22,
};
const datasets = [
  { id: 1, row: 1, colstart: 3,  colend: 6,  label: 'label1' },
  { id: 2, row: 1, colstart: 8,  colend: 11, label: 'label2' },
  { id: 3, row: 2, colstart: 2,  colend: 5,  label: 'label3' },
  { id: 4, row: 2, colstart: 10, colend: 13, label: 'label4' },
  { id: 5, row: 3, colstart: 1,  colend: 4,  label: 'label5' },
  { id: 6, row: 3, colstart: 8,  colend: 10, label: 'label6' },
  { id: 7, row: 3, colstart: 12, colend: 15, label: 'label7' },
  { id: 8, row: 4, colstart: 7,  colend: 10, label: 'label8' },
  { id: 9, row: 4, colstart: 11, colend: 13, label: 'label9' },
];
var gantt = new Gantt(config, datasets);
const target = document.getElementById('gantt');
if(target){
  gantt.draw(target);
}
