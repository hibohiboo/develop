interface IConfig {
  height: number;
  width: number;
  rows: string[];
  col: number;
}

interface IGraphData {
  id: number;
  row: number;
  colstart: number;
  colend: number;
  label: string;
}

export default class Gantt {
  public table: GanttTable;

  constructor(private config: IConfig, private datasets: IGraphData[] = []) {
    this.table = this.makeTable(this.config);
  }

  public set(datasets: IGraphData[]) {
    this.datasets = datasets;
  }

  public draw(target: HTMLElement) {
    this.datasets.forEach((data) => {
      const graph = new Graph(data, this.table);
      const td = this.table.getTd(data.row - 1, data.colstart - 1);
      graph.box.appendTo(td);
    });
    this.table.appendTo(target);
  }
  private makeTable({ height, width, rows, col }: IConfig) {
    const table = new GanttTable(width, height);
    const tbody = new CacheElement('tbody');

    rows.forEach((val, i) => {
      const tr = new CacheElement('tr');

      for (let j = 0; j < col; j++) { // tslint:disable-line no-increment-decrement
        const td = new TableData(i,j);
        tr.appendChild(td);
        table.setTd(i, j, td);
      }
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }
}

type HTMLElementTagName = keyof HTMLElementTagNameMap;

/**
 * HTMLのキャッシュを行う
 *
 * @class CacheElement
 */
class CacheElement {
  protected _parent: CacheElement;
  protected cache: {element?: HTMLElement} = {};
  protected children: CacheElement[] = [];
  private tagname: string;

  constructor(private arg: HTMLElementTagName | HTMLElement) {

    if (arg instanceof HTMLElement) {
      this.cache.element = arg;
      this.tagname = arg.nodeName.toLowerCase();
      return;
    }

    this.tagname = arg;
  }

  get element() {
    if (this.cache.element) {
      return this.cache.element;
    }
    const elm = document.createElement(this.tagname);
    this.cache.element = elm;
    return elm;
  }

  get parent() {
    return this._parent;
  }

  public appendChild = (node: HTMLElement | CacheElement) => {
    if (node instanceof HTMLElement) {
      node = new CacheElement(node); // tslint:disable-line no-param-reassign
    }

    if (node._parent) {
      node._parent.children = node._parent.children.filter(c => c !== node);
    }

    this.children.push(node);
    this.children.forEach((child) => {
      child._parent = this;
      this.element.appendChild(child.element);
    });
    return this;
  }

  public appendTo = (node: HTMLElement | CacheElement) => {
    if (node instanceof HTMLElement) {
      node = new CacheElement(node); // tslint:disable-line no-param-reassign
    }

    node.appendChild(this);
    return this;
  }
}

class GanttTable extends CacheElement {
  public static CELL_WIDTH = 40;
  public static CELL_WIDTH_CONTAINS_BORDER = 42;
  public static CELL_OFFSET = -6;
  public static ROW_HEIGHT: number;
  public rowHeight: number;
  public columnWidth: number;
  private dataMap: TableData[][] = [];
  private rowsLength: number = 0;
  private colsLength: number = 0;

  constructor(private width: number, private height: number) {
    super('table');
  }

  get numberOfRows() {
    return this.rowsLength;
  }

  get numberOfCols() {
    return this.colsLength;
  }

  get element() {
    if (this.cache.element) {
      return this.cache.element;
    }
    const elm = super.element;
    elm.className = 'field';
    elm.setAttribute('cellspacing', `0`);
    elm.setAttribute('cellpadding', `0`);
    elm.style.width = `${this.width}px`;
    elm.style.height = `${this.height}px`;
    return elm;
  }
  public setTd(row: number, col: number, td: TableData) {
    if (row > this.rowsLength - 1) {
      // マップに行追加
      this.dataMap[row] = [];

      // 行数更新
      this.rowsLength = row + 1;

      // 行の高さ更新
      GanttTable.ROW_HEIGHT = Math.round(this.height / this.rowsLength);
    }

    // 列数更新
    if (col > this.colsLength - 1) {
      this.colsLength = col + 1;
    }

    this.dataMap[row][col] = td;
  }

  public getTd(row: number, col: number) {
    const rc = this.checkRangeRow(row);
    const cc = this.checkRangeCol(col);
    if (rc < 0) { row = 0;}                  // tslint:disable-line no-param-reassign
    if (cc < 0) { col = 0;}                  // tslint:disable-line no-param-reassign
    if (rc > 0) {row = this.rowsLength - 1;} // tslint:disable-line no-param-reassign
    if (cc > 0) {col = this.colsLength - 1;} // tslint:disable-line no-param-reassign
    return this.dataMap[row][col];
  }

  public inner(opt: {row: number, col: number, squares: number}) {
    const { row, col, squares } = opt;
    const colend = col + squares - 1;
    if (this.checkRangeRow(row)    !== 0 ||
        this.checkRangeCol(col)    !== 0 ||
        this.checkRangeCol(colend) !== 0) {
      return false;
    }
    return true;
  }

  private checkRangeRow(row: number) {
    if (row < 0) { return -1;}
    if (row > this.rowsLength - 1) { return 1;}
    return 0;
  }

  private checkRangeCol(col: number) {
    if (col < 0) { return -1;}
    if (col > this.colsLength - 1) {return 1;}
    return 0;
  }

}

class TableHeader extends CacheElement {
  constructor(private label: string) {
    super('th');
  }
  get element() {
    if (this.cache.element) {
      return this.cache.element;
    }
    const elm = super.element;
    elm.innerText = this.label;
    return elm;
  }
}

class TableData extends CacheElement {
  constructor(private _row: number, private _column: number) {
    super('td');
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }

  get element() {
    const elm = super.element;
    elm.setAttribute('data-row', `${this.row}`);
    elm.setAttribute('data-column', `${this.column}`);
    return elm;
  }

  get box(): GraphBox | null {
    if (this.children.length === 0) {
      return null;
    }
    if (this.children[0] instanceof GraphBox) {
      return this.children[0] as GraphBox;
    }
    return null;
  }
}

class Graph {
  public box: GraphBox;
  private left: GraphBoxResizeHandle;
  private middle: GraphBoxMoveHandle;
  private right: GraphBoxResizeHandle;

  private movingLister: (e: MouseEvent) => void;
  private moveEndLister: (e: MouseEvent) => void;
  private resizingLister: (e: MouseEvent) => void;
  private resizeEndLister: (e: MouseEvent) => void;

  constructor(private data: IGraphData, private field: GanttTable) {
    const { colend, colstart, label, id } = data;

    // マス数を計算
    const squares = colend - colstart;

    this.box = new GraphBox(id, squares);

    this.middle = new GraphBoxMoveHandle(this.box.width, label, this.moveStart, this.moveEnd);
    this.left = new GraphBoxResizeHandle('left', this.resizeStart, this.resizeEnd);
    this.right = new GraphBoxResizeHandle('right', this.resizeStart, this.resizeEnd);

    this.box.appendChild(this.left);
    this.box.appendChild(this.middle);
    this.box.appendChild(this.right);
  }
  public moveStart = (target: GraphBoxMoveHandle, event: MouseEvent) => {
    const element = target.element;
    element.classList.add('move-ing');
    target.pointX = event.pageX;
    target.pointY = event.pageY;
    target.basisX = element.offsetLeft;
    target.basisY = element.offsetTop;
    this.box.element.style.zIndex = `1`;

    this.movingLister =  e => this.moving(target, e);
    this.moveEndLister = e => this.moveEnd(target, e);

    this.field.element.addEventListener('mousemove',  this.movingLister);
    this.field.element.addEventListener('mouseleave', this.moveEndLister);
    this.field.element.addEventListener('mouseup',    this.moveEndLister);
  }

  private moving = (target: GraphBoxMoveHandle, event: MouseEvent) => {
    // 相対座標取得
    const x = event.pageX - target.pointX;
    const y = event.pageY - target.pointY;

    // フィードバック
    this.box.element.style.left = `${x}px`;
    this.box.element.style.top  = `${y}px`;
  }

  private moveEnd = (target: GraphBoxMoveHandle, event: MouseEvent) => {
    console.log('move-end');
    target.element.classList.remove('move-ing');
    this.box.element.style.zIndex = '0';

    this.field.element.removeEventListener('mousemove',  this.movingLister);
    this.field.element.removeEventListener('mouseleave', this.moveEndLister);
    this.field.element.removeEventListener('mouseup',    this.moveEndLister);
    this.fixit();
  }

  private resizeStart = (target: GraphBoxResizeHandle, event: MouseEvent) => {
    target.element.classList.add('resize-ing');
    this.box.element.style.zIndex = `1`;
    target.pointX = event.pageX;
    target.basisX = this.box.element.offsetLeft;

    this.resizingLister  = e => this.resizing(target, e);
    this.resizeEndLister = e => this.resizeEnd(target, e);

    this.field.element.addEventListener('mousemove',  this.resizingLister);
    this.field.element.addEventListener('mouseleave', this.resizeEndLister);
    this.field.element.addEventListener('mouseup',    this.resizeEndLister);
  }

  private resizing = (target: GraphBoxResizeHandle, event: MouseEvent) => {
    const pointdiff = event.pageX - target.pointX;

    if (target.tag === 'left') {
      console.log('resize-ing left');
      this.box.element.style.left = `${pointdiff}px`;
      this.box.element.style.width = `${(this.box.width - pointdiff)}px`;
      return;
    }

    console.log('resize-ing right');
    this.box.element.style.width = `${(this.box.width + pointdiff)}px`;
  }

  private resizeEnd = (target: GraphBoxResizeHandle, event: MouseEvent) => {
    console.log('resize-end');
    target.element.classList.remove('resize-ing');
    this.box.element.style.zIndex = '0';
    this.field.element.removeEventListener('mousemove',  this.resizingLister);
    this.field.element.removeEventListener('mouseleave', this.resizeEndLister);
    this.field.element.removeEventListener('mouseup',    this.resizeEndLister);
    this.fixit();
  }

  private fixit  () {
    const xDistance = Util.getStyleStrToNumber(this.box.element, 'left');
    const yDistance = Util.getStyleStrToNumber(this.box.element, 'top');
    const width     = Util.getStyleStrToNumber(this.box.element, 'width');

    const leftSlide      = Math.round(xDistance / GanttTable.CELL_WIDTH);
    const topSlide       = Math.round(yDistance / GanttTable.ROW_HEIGHT);
    const numberOfSquare = Math.round(width / GanttTable.CELL_WIDTH) || 1; // FIXME: 暫定的なcolendの近似値

    const baseTd = this.box.parent;
    const baseRow    = baseTd.row;
    const baseColumn = baseTd.column;

    const currentRow    = baseRow + topSlide;
    const currentColumn = baseColumn + leftSlide;
    const currentTd = this.field.getTd(currentRow, currentColumn);

    const opt = { row:currentRow, col:currentColumn, squares:numberOfSquare };
    const isInnerField = this.field.inner(opt);
    const isOverlap = this.check(opt);

    if (!isInnerField || isOverlap) {
      this.box.reset();
      this.middle.width = this.box.width;
      this.middle.reset();
      return;
    }

    this.box.numberOfSquare = numberOfSquare;
    this.box.reset();

    this.middle.width = this.box.width;
    this.middle.reset();

    currentTd.appendChild(this.box);
  }
  private check(opt: {row: number, col: number, squares: number}) {
    const { row, col, squares } = opt;
    const baseColumn = this.box.parent.column;
    const isBaseRow = this.box.parent.row === row;
    // return boolean
    // delete move or resize object before call me <_check()>
    console.log('arg in _check()');
    console.log(opt);
    console.log(`isBaseRow${isBaseRow}`);
    console.log(``);
    // check overlap move or resize object
    for (let i = 0; i < this.field.numberOfCols; i++) { // tslint:disable-line no-increment-decrement max-line-length
      if (isBaseRow && i === baseColumn) {continue;}
      const td = this.field.getTd(row, i);

      if (td.box && td.box.isOverlap(col, squares)) {
        console.log(`base:${baseColumn} row:${this.box.parent.row} i:${i} `);
        return true;
      }
    }

    return false;
  }
}

/**
 * グラフ
 *
 * @class GraphBox
 */
class GraphBox extends CacheElement {
  public parent: TableData;
  private _width: number;
  private _numberOfSquare: number;

  constructor(public id: number, numberOfSquare: number) {
    super('div');
    this.numberOfSquare = numberOfSquare;
  }

  public set numberOfSquare(value: number) {
    this._numberOfSquare = value;
    this._width = this._numberOfSquare * GanttTable.CELL_WIDTH_CONTAINS_BORDER + GanttTable.CELL_OFFSET; // tslint:disable-line max-line-length
  }
  public get numberOfSquare() {
    return this._numberOfSquare;
  }
  public get width() {
    return this._width;
  }

  get element() {
    if (this.cache.element) {
      return this.cache.element;
    }
    const box = super.element;
    box.className = 'box';
    box.id = `box${this.id}`;
    this.reset();
    return box;
  }

  public reset() {
    this.element.style.width  = `${this.width}px`;
    this.element.style.zIndex = `0`;
    this.element.style.left = `0`;
    this.element.style.top  = `0`;
  }

  public isOverlap(colstart: number, squares: number) {
    const colend = colstart + squares;
    const boxstart = this.parent.column;
    const boxend = boxstart + this.numberOfSquare - 1;
    console.log(`colstart: ${colstart} squares:${squares} colend:${colend} boxstart:${boxstart} boxsquare:${this.numberOfSquare} boxend:${boxend}`);  // tslint:disable-line max-line-length
    if (colend < boxend) {return false;}
    if (colstart > boxend) {return false;}
    return true;
  }
}

class GraphBoxHandle extends CacheElement {
  public pointX: number;
  public basisX: number;

  constructor() {
    super('div');
  }

}

type EventHandler = (element: CacheElement, e: Event) => void;

type ResizeHandleTagType = 'left' | 'right';
class GraphBoxResizeHandle extends GraphBoxHandle {
  constructor(public tag: ResizeHandleTagType,
              private resizeStart: EventHandler,
              private resizeEnd: EventHandler) {
    super();
  }

  get element() {
    if (this.cache.element) {
      return this.cache.element;
    }
    const elm = super.element;
    elm.classList.add(`resize`);
    elm.classList.add(`resize-${this.tag}`);
    elm.addEventListener('mousedown', e => this.resizeStart(this, e));
    elm.addEventListener('mouseup',   e => this.resizeEnd(this, e));
    return elm;
  }
}

class GraphBoxMoveHandle extends GraphBoxHandle {
  public pointY: number;
  public basisY: number;

  constructor(
    public width: number,
    public text: string,
    private moveStart: EventHandler,
    private moveEnd: EventHandler) {
    super();
  }

  get element() {
    if (this.cache.element) {
      return this.cache.element;
    }
    const elm = super.element;
    elm.classList.add(`box-label`);
    this.reset();

    elm.addEventListener('mousedown', e => this.moveStart(this, e));
    elm.addEventListener('mouseup',   e => this.moveEnd(this, e));
    return elm;
  }

  public reset() {
    this.element.style.width = `${this.width}px`;
    this.element.innerText = this.text;
  }
}

class Util {
  public static getStyleStrToNumber(elm: HTMLElement, item: string) {
    if (!elm.style) { return 0;}
    if (!elm.style[item]) { return 0;}
    const w = elm.style[item].replace('px', '');
    return parseInt(w, 10);
  }
}
