import { storiesOf } from '@storybook/html';
import copyCodeBlock from '@pickra/copy-code-block';
import Pug2Html from '!html-loader!pug-plain-loader!./header.pug'
import PugSrc from '!html-loader!./header.pug'
import CssSrc from '!raw-loader!./header.css'
import '!style-loader!css-loader!./header.css'
import hljs from 'highlight.js/lib/highlight';
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
// pugは対応していなかった。
hljs.registerLanguage('pug', require('highlight.js/lib/languages/haml'));

storiesOf('header', module)
  .add('pug2html', () => Pug2Html) //htmlタグに変換されたものを表示するだけ
  .add('pug&html', () => Pug2Html + copyCodeBlock(PugSrc, { lang: 'pug' }) + copyCodeBlock(CssSrc, { lang: 'css' }))
