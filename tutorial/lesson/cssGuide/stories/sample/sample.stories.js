import { storiesOf } from '@storybook/html';
import copyCodeBlock from '@pickra/copy-code-block';
import Pug2HtmlBtn from '!html-loader!pug-plain-loader!./button.pug'
import PugSrcBtn from '!html-loader!./button.pug'

storiesOf('sample', module)
  .add('pug2html', () => Pug2HtmlBtn) //htmlタグに変換されたものを表示するだけ
  .add('pug&html', () => Pug2HtmlBtn + copyCodeBlock(PugSrcBtn))