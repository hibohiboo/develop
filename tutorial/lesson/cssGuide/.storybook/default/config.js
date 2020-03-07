import { configure } from '@storybook/html';
import copyCodeBlock from '@pickra/copy-code-block';

// 指定したパスのhtml表示とpugソースのコピーボタンを表示する
global.code = (path, title = false) => {
  const pug = require(`!html-loader!../../stories/${path}.pug`);
  const html = require(`!html-loader!pug-plain-loader!../../stories/${path}.pug`);
  return `
  <div class="container mt-4">
    ${title ? '<h1 class="mb-5">' + title + '</h1>' : ''}
    ${html}
    <div class="mt-5">
    ${copyCodeBlock(pug)}
    </div>
  </div>`
}

// automatically import all files ending in *.stories.js
configure(require.context('../../stories', true, /\.stories\.js$/), module);