const fs = require('fs');
const postcss = require('postcss');
const comment = require('postcss-comment');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');

fs.readFileSync('src/app.css', (err, css) => {
    postcss([ autoprefixer])
        .process(css, { from: 'src/app.css', to: 'dest/app.css' })
        .then(result => {
            fs.writeFile('dest/app.css', result.css);
            if ( result.map ) fs.writeFile('dest/app.css.map', result.map);
        });
});