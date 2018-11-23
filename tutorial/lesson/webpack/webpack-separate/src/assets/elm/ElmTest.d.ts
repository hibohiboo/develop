/**
 * Elmの引数
 */
interface ElmInitArgs {
  node: HTMLElement;
  flags?: any;
}

declare namespace ElmTest.Elm {
  /**
   * メイン
   */
  class Main{
    /**
     * 
     * @param args 
     */
    public static init(args:ElmInitArgs): any;
  }
}
export = ElmTest;