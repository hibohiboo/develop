import { storiesOf } from '@storybook/html';
import copyCodeBlock from '@pickra/copy-code-block';
import Pug2Html from '!html-loader!pug-plain-loader!./header.pug'
import PugSrc from '!html-loader!./header.pug'
import Css from '!style-loader!css-loader!./header.css'
import CssSrc from '!raw-loader!./header.css'


storiesOf('header', module)
  .add('pug2html', () => Css + Pug2Html) //htmlタグに変換されたものを表示するだけ
  .add('pug&html', () => Css + Pug2Html + copyCodeBlock(PugSrc) + copyCodeBlock(CssSrc))
