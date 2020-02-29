---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
logoImg: "img/logo/eye.png"
slideNumber: false
title: "2020/03/3 LT"
---

# .mdのススメ

### ZeroScope

#### 加藤 久和

---

### やること
* Reveal.jsのご紹介
* VS Codeのお役立ち拡張紹介

---

## Reveal.js

* markdown形式でスライドが作れる
* VS Codeの拡張で簡単

---

## 導入
* vscodeの拡張から入手
* evilz.vscode-reveal
![](img/lt/2020-02-28-21-14-43.png)
* サンプル見ればだいたい分かる {.fragment .fade-left}

---

## 知ってました？
* 脱線
* 「Win」+ 「Shift」+ 「s」
* 画面の一部のスクリーンショット {.fragment .fade-left}
* 私は最近知りました

---

## Paste Image
* 脱線
* vscodeの拡張から入手
* mushan.vscode-paste-image
* 「ctrl」 + 「alt」 + 「v」 で画像貼付
![](img/lt/2020-02-28-21-31-40.png)

---

## mermaid.js
* markdownの中にUMLとかどうすか
* <a href="#" onclick="document.getElementById('theme').setAttribute('href','libs/reveal.js/3.8.0/css/theme/white.css'); return false;">ちょっと見にくいですね</a> {.fragment .fade-left}

<div class="mermaid">
sequenceDiagram
    participant Alice
    participant Bob 
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
</div> 

---

## さっきのソース
* markdown中にタグとか書いてます
```html
* markdownの中にUMLとかどうすか
* <a href="#" onclick="document.getElementById('theme').setAttribute('href','libs/reveal.js/3.8.0/css/theme/white.css'); return false;">ちょっと見にくいですね</a> {.fragment .fade-left}

<div class="mermaid">
sequenceDiagram
    participant Alice
    participant Bob 
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
</div> 

```
## グラフとか
* 
<canvas data-chart="bar">
<!-- 
{
 "data": {
  "labels": ["January"," February"," March"," April"," May"," June"," July"],
  "datasets": [
   {
    "data":[65,59,80,81,56,55,40],
    "label":"My first dataset","backgroundColor":"rgba(20,220,220,.8)"
   },
   {
    "data":[28,48,40,19,86,27,90],
    "label":"My second dataset","backgroundColor":"rgba(220,120,120,.8)"
   }
  ]
 }, 
 "options": { "responsive": "true" }
}
-->
</canvas>

---

## 参考
[これからのプレゼン資料は reveal.js を使おう](https://qiita.com/Targityen/items/40ae4795e2cb77c1adc6)
[reveal.js](https://github.com/hakimel/reveal.js/)
[お手軽reveal.js入門](https://jyun76.github.io/revealjs-vscode/)
[reveal.jsでスライド作り。](https://qiita.com/t-kusakabe/items/725e7438892bba395062)
[【翻訳】reveal.js - README.md](https://qiita.com/takayu90/items/0af9bd125e6704803c0d)
[VS Codeを極める！ MarkdownやGitにもオススメの拡張機能9選](https://ics.media/entry/18756/)

[mermaid](https://mermaid-js.github.io/mermaid/#/)
[chart](https://github.com/rajgoel/reveal.js-plugins/tree/master/chart)
---

## 使用画像


[Icons made by Kiranshastry](https://www.flaticon.com/authors/kiranshastry) from [www.flaticon.com](https://www.flaticon.com/)