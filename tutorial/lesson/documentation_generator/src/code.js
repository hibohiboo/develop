/**
 * 要素内のリンクのインラインテキスト長と要素全体のインラインテキスト長の比を返します
 *
 * @param {Node} node - 要素
 * @throws {PartyError|FartyError} 複数のタイプとラップする行のあるものは例外を投げる
 * @returns {Number} What a thing
 */
function linkDensity(node) {
    const length = node.flavors.get('paragraphish').inlineLength;
    const lengthWithoutLinks = inlineTextLength(node.element,
                                                element => element.tagName !== 'A');
    return (length - lengthWithoutLinks) / length;
}

/**
 * クラスドキュメント
 */
class ContainingClass {
    /**
     * コンストラクタ doc.
     *
     * @arg ho 特に意味のない引数
     */
    constructor(ho) {
        /**
         * A クラスのプロパティ
         */
        this.someVar = 4;
    }

    /**
     * protectedのメソッド。
     * @protected
     */
    someMethod(hi) {
    }

    /**
     * ゲッターとセッター
     */
    get bar() {
      return this._bar;
    }
    set bar(baz) {
      this._bar = _bar;
    }

    /**
     * Privateな関数
     * @private
     */
    secret() {}
}

// このクラスに新しいメンバーを追加することはありません。なぜなら、いくつかのテストを壊すからです。
/** Closed class. */
class ClosedClass {
    /**
     * Public thingなメソッド.
     */
    publical() {}

    /**
     * Public thing なメソッド2.
     */
    publical2() {}

    /**
     * Public thing なメソッド3.
     */
    publical3() {}
}

/**関数がアルファベット順でない class. */
class NonAlphabetical {
    /** Fun z. */
    z() {}

    /** Fun a. */
    a() {}
}