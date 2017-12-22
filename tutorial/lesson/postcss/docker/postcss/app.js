const fs = require('fs');
const postcss = require('postcss');
const comment = require('postcss-comment');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');

const target = 'src/app.pcss'


fs.readFile(target, (err, css) => {
postcss([   cssnext({
    features: {
      customProperties: false
    }
  })])
    .process(css, { from: target, to: 'dest/app.css', parser: comment })
    .then(result => {
        fs.writeFile('dest/app.css', result.css, (err)=>console.log(err));
        if ( result.map ) fs.writeFile('dest/app.css.map', result.map, (err)=>console.log(err));
    });
});