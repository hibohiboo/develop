export type PlotType = 'M' | 'S'; // M:ルールY, S:ルールX

export class Plot {
  id: number;
  name: string;
  type: PlotType; 
  roles:Array<string>;
  rules:any;
}

export class SelectedPlot extends Plot {
  num: number;
}

