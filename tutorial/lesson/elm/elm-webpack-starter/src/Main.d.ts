/**
 * Elmの引数
 */
interface IElmInitArgs {
  // node: HTMLElement;
  flags?: any;
}

// tslint:disable-next-line no-namespace
declare namespace Main.Elm {
  /**
   * メイン
   */
  class Main {
    /**
     *
     * @param args
     */
    public static init(args: IElmInitArgs): any;
  }
}
export = Main;
